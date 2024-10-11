import dbConnect from "../../../lib/dbConnect";
import {
  fetchRecords,
  updateRecord
} from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {

  const token = await getToken({ req, secret });
  const user_id = token.sub;

  if (token) {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case "GET":
        try {

          let url = req.url 
        
          const wObj = {
            modal: "WhiteLabel",
            url: url,
            type: "findOne",
            selectFields: ["user_id", "whitelabelurl", "cloudflare_id"],
            condition: { user_id: user_id, is_del: false },
          };
         

          let cnameInfo = await fetchRecords(wObj);


          // Make CloudFlare API Request
          let hitUrl =
            "https://api.cloudflare.com/client/v4/zones/4615a79415e0ac5ec3f5434f28a751ab/custom_hostnames/" +
            cnameInfo.cloudflare_id;

          const res2 = await fetch(hitUrl, {
            method: "GET",
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

              const resultObj = getResponse.result;

              console.log("resultObj>>>", resultObj);

              let txtStatus = "pending";
              let verStatus = "pending";
              let txt_name = ""
              let txt_value = ""
               let ver_name = "";
               let ver_value = "";

              if (resultObj.ssl.hasOwnProperty("txt_name")) {
                txt_name = resultObj.ssl.txt_name;
                txt_value = resultObj.ssl.txt_value;
              }
              else
              {
                txtStatus = "verified";
              }

              if (resultObj.hasOwnProperty("ownership_verification")) {
                 ver_name = resultObj.ownership_verification.name;
                 ver_value = resultObj.ownership_verification.value;
              }
              else
              {
                verStatus = "verified";
              }

              let updateFields = [
                { key: "txt_status", value: txtStatus },
                { key: "ver_status", value: verStatus },
                { key: "updated_at", value: new Date() },
              ];

              if (txt_name.length > 0)
              {
                updateFields.push({ key: "txt_name", value: txt_name })
              }
              if (txt_value.length > 0)
              {
                updateFields.push({ key: "txt_value", value: txt_value })
              }

              if (ver_name.length > 0) {
                updateFields.push({ key: "ver_name", value: ver_name });
              }
              if (ver_value.length > 0) {
                updateFields.push({ key: "ver_value", value: ver_value });
              }

              // console.log("WhiteLabel Details>>>>", whiteLabelObj)

              let updateWObj = {
                modal: "WhiteLabel",
                type: "findById",
                updateFields: updateFields,
                url: url,
                selectFields: ["cloudflare_id"], 
                id: cnameInfo._id,
              };

              let result = await updateRecord(updateWObj);

              console.log("Result>>>>", result);

              res.status(200).send({ data: result });
            } catch (error) {
              console.log("error>>>>", error);
              res.status(500).send({ message: "API Request Failed" });
            }
          }

         
        } catch (error) {
          // add error handling
          res.status(500).json({ success: false });
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
