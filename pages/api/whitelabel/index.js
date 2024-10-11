import dbConnect from "../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
import {
  fetchRecords,
  updateRecord,
  getRecordsCount,
} from "../../../lib/genericController";
import WhiteLabel from "../../../models/WhiteLabel";
import initMiddleware from "../../../lib/initMiddleware";
import validateMiddleware from "../../../lib/validateMiddleware";
import { check, validationResult } from "express-validator";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req, secret });
  const user_id = token.sub;

  if (token) {
    const validateBody = initMiddleware(
      validateMiddleware(
        [
          check("whitelabelurl")
            .escape()
            .trim()
            .isLength({ min: 5, max: 100 })
            .withMessage("Invalid Whitelabel"),
        ],
        validationResult
      )
    );

    const { method } = req;

    let url = req.url;

    switch (method) {
      case "GET":
        try {

          const uObj = {
            modal: "UserInfo",
            url: url,
            type: "findOne",
            selectFields: ["plan_id"],
            condition: { user_id: user_id, is_del: false },
          };

          let userInfo = await fetchRecords(uObj);

          console.log("userInfo>>>>", userInfo);

          if (userInfo.plan_id != "free") {
            const wObj = {
              modal: "WhiteLabel",
              url: url,
              type: "findOne",
              selectFields: [
                "user_id",
                "whitelabelurl",
                "cloudflare_id",
                "txt_name",
                "txt_value",
                "txt_status",
                "ver_name",
                "ver_value",
                "ver_status",
              ],
              //    populate: [
              //       // Incase you want to populate inner objects
              //       {
              //         path: "user_id",
              //         select: { first_name: 1, last_name: 2, email: 3 },
              //       },
              //     ],
              condition: { user_id: user_id, is_del: false },
            };

            let cnameInfo = await fetchRecords(wObj);

            console.log("cnameInfo>>>>>>", cnameInfo);

            // Get Smartsites List
            const sObj = {
              modal: "Smartsite",
              url: url,
              type: "find",
              selectFields: ["key", "title"],
              condition: { user_id: user_id, is_del: false },
            };

            let sInfo = await fetchRecords(sObj);

            if (!Array.isArray(cnameInfo)) {
              res.status(200).send({
                success: true,
                data: cnameInfo,
                list: sInfo,
                is_empty: false,
                is_paid: true,
              });
            } else {
              res.status(200).send({
                success: true,
                data: {},
                list: sInfo,
                is_empty: true,
                is_paid: true,
              });
            }
          } else {
            res.status(200).send({
              success: true,
              data: {},
              is_empty: true,
              is_paid: false,
            });
          }
        } catch (error) {
          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }
        break;


      case "POST":
        try {
        
          // console.log("POST", req.body);

          await validateBody(req, res);

          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }

          let whitelabelurl = req.body.whitelabelurl;
          let smartsite_id = req.body.smartsite_id;

          let countObj = {
            modal: "WhiteLabel",
            url: url,
            condition: { user_id: user_id },
          };

          let count = await getRecordsCount(countObj);

          if (count == 1) {
            // Record Exists
            res.status(200).send({ exists: true });
          } else {
            // Make CloudFlare API Request
            let hitUrl =
              "https://api.cloudflare.com/client/v4/zones/4615a79415e0ac5ec3f5434f28a751ab/custom_hostnames";

            const res1 = await fetch(hitUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": process.env.CLOUDFLARE_EMAIL,
                "X-Auth-Key": process.env.CLOUDFLARE_KEY,
              },
              body: JSON.stringify({
                hostname: whitelabelurl,
                ssl: {
                  method: "txt",
                  type: "dv",
                  settings: {
                    http2: "on",
                    min_tls_version: "1.2",
                    tls_1_3: "on",
                    ciphers: ["ECDHE-RSA-AES128-GCM-SHA256", "AES128-SHA"],
                    early_hints: "on",
                  },
                  bundle_method: "ubiquitous",
                },
              }),
            });

            const postResponse = await res1.json();

            if (postResponse.errors.length > 0) {
              res.status(500).send({ message: "API Request Failed" });
            } else {
              const resultObj = postResponse.result;

              // Make Another Request to CloudFlare API

              setTimeout(async () => {
                let hitUrl2 =
                  "https://api.cloudflare.com/client/v4/zones/4615a79415e0ac5ec3f5434f28a751ab/custom_hostnames/" +
                  resultObj.id;

                const res2 = await fetch(hitUrl2, {
                  headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Email": process.env.CLOUDFLARE_EMAIL,
                    "X-Auth-Key": process.env.CLOUDFLARE_KEY,
                  },
                });
                const getResponse = await res2.json();

                if (getResponse.errors.length > 0) {
                  res.status(500).send({ message: "API Request Failed" });
                } else {
                  try {
                    const resultObj2 = getResponse.result;
                    console.log("resultObj2>>>>", resultObj2);

                    let txtName = "";
                    let txtValue = "";
                    let txtStatus = "pending";
                    let verName = "";
                    let verValue = "";
                    let verStatus = "pending";

                    if (resultObj2.ssl.hasOwnProperty("txt_name")) {
                      txtName = resultObj2.ssl.txt_name;
                      txtValue = resultObj2.ssl.txt_value;
                    } else {
                      txtStatus = "verified";
                    }
                    if (resultObj2.hasOwnProperty("ownership_verification")) {
                      verName = resultObj2.ownership_verification.name;
                      verValue = resultObj2.ownership_verification.value;
                    } else {
                      verStatus = "verified";
                    }

                    const insertObj = new WhiteLabel({
                      user_id: user_id,
                      whitelabelurl: whitelabelurl,
                      smartsite_id: smartsite_id, 
                      cloudflare_id: resultObj.id,
                      txt_name: txtName,
                      txt_value: txtValue,
                      txt_status: txtStatus,
                      ver_name: verName,
                      ver_value: verValue,
                      ver_status: verStatus,

                      created_at: new Date(),
                      updated_at: new Date(),
                    });

                    insertObj.save(async function (err2) {
                      if (err2) {
                        res.status(500).send({
                          message:
                            "All our servers are busy. Please try after sometime.",
                        });
                      } else {
                        res.status(200).send({
                          exists: false,
                          success: true,
                        });
                      }
                    });
                  } catch (error) {
                    console.log("error>>>", error);
                    res.status(500).send({ message: "API Request Failed" });
                  }
                }
              }, 1000);
            }
          }
        } catch (error) {
          res.status(500).send({ message: "Unexpected error Occurred" });
        }
        break;

      case "DELETE":

        let id = req.body.id;

        console.log("DELETE ID>>>>", req.body);

        try {
          var wObj = {
            modal: "WhiteLabel",
            url: url,
            type: "findById",
            id: id,
            selectFields: ["user_id", "cloudflare_id"],
          };

          let checkUser = await fetchRecords(wObj);

          console.log("checkUser>>>>", checkUser);

          if (checkUser.user_id == user_id) {

            console.log("matched>>>>");
            // Make CloudFlare API Request
            let hitUrl =
              "https://api.cloudflare.com/client/v4/zones/4615a79415e0ac5ec3f5434f28a751ab/custom_hostnames/" +
              checkUser.cloudflare_id;

            const res2 = await fetch(hitUrl, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": process.env.CLOUDFLARE_EMAIL,
                "X-Auth-Key": process.env.CLOUDFLARE_KEY,
              },
            });
            const getResponse = await res2.json();

            console.log("getResponse>>>>", getResponse);

            if (getResponse.errors.length > 0) {
              console.log("In Here>>>>");
              res.status(500).send({ message: "API Request Failed" });
            } else {
              WhiteLabel.deleteOne({ _id: id })
                .then(function () {
                  console.log("Data deleted"); // Success
                  res.status(200).send({ success: true });
                })
                .catch(function (error3) {
                  res
                    .status(500)
                    .send({ message: "Unexpected Error Occurred" });
                });
            }
            
          } else {
            res.status(401).send({ message: "Unauthorized access" });
          }
        } catch (error) {
          res.status(500).send({ message: "All our servers are busy. Please try after sometime." });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false, message: "Not Authorized" });
  }
}
