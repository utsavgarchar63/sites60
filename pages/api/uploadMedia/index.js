import dbConnect from "../../../lib/dbConnect";
import {
  fetchRecords,
  updateRecord,
  uploadMedia,
  generateV4ReadSignedUrl,
} from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
const momentTZ = require("moment-timezone");
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
const path = require("path");
import Media from "../../../models/Media";

export const config = {
  api: { bodyParser: false },
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;

  if (token) {
    await dbConnect();

    const { method } = req;

    switch (method) {
      case "POST":
        try {
          let url = req.url;
          let mediaUrl = "";
          let type = "";

          const data = await new Promise(function (resolve, reject) {
            const form = new formidable.IncomingForm();

            form.uploadDir = "/tmp";
            form.keepExtensions = true;

            form.parse(req, async function (err, fields, files) {
              if (err) {
                console.log(err, "error>>");
                return reject(err);
              } else {
                console.log(fields, "  fields ");
                console.log(files, "  files ");

                resolve({ fields, files });
              }
            });
          });

          if (!isEmpty(data.files)) {
            let imageBuffer = fs.readFileSync(data.files.media.filepath);

            let sizeinb = data.files.media.size;

            const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;
            let size = bytesToMegaBytes(sizeinb).toFixed(2);
            type = data.files.media.mimetype.split("/")[1];

            if (type == "svg+xml") {
              type = "svg";
            }
            if (size < 5) {
              const uuid = uuidv4();
              const fileName =
                momentTZ(new Date()).tz("Asia/Calcutta").format("HH-mm-ss") +
                "-" +
                uuid +
                "." +
                type;

              let bucketName = "gs://" + process.env.GOOGLE_BUCKET;

              await uploadMedia(imageBuffer, bucketName, fileName);

              let urlBucketName = process.env.GOOGLE_BUCKET;

              mediaUrl = `https://storage.googleapis.com/${urlBucketName}/${fileName}`;

              console.log("Uploaded Pic to Bucket>>>>", mediaUrl);
            } else {
              res.status(422).json({
                errors: [
                  {
                    type: "File Size",
                    message:
                      "File size exceeds 5 MB. Please reduce the size and try again.",
                  },
                ],
              });
            }
          }

          if (mediaUrl.length > 0) {
            // Save in Database

            let mediaObj = new Media({
              user_id: user_id,
              url: mediaUrl,
              type: type,
            });

            mediaObj.save(async function (err, result) {
              if (err) {
                console.log("Error>>>", err);
                res.status(422).json({
                  errors: [
                    {
                      type: "Upload Failed",
                      message: "Failed to Upload Image",
                    },
                  ],
                });
              } else {
                console.log("Image Saved in DB>>>>>>");
                // let first = result.url.substring(
                //   0,
                //   result.url.lastIndexOf("/") + 1
                // );
                // let last = result.url.substring(
                //   result.url.lastIndexOf("/") + 1,
                //   result.url.length
                // );

                // let finalUrl = await generateV4ReadSignedUrl(first, last);

                res.status(200).json({ success: true, media: mediaUrl });
              }
            });
          } else {
            res.status(422).json({
              errors: [
                { type: "Upload Failed", message: "Failed to Upload Image" },
              ],
            });
          }
        } catch (error) {
          console.log("Error>>>>2", error);
          res
            .status(400)
            .json({ success: false, message: "Image upload failed!!" });
        }

        break;

      case "DELETE":
        try {
          let url = req.url;
          let mediaUrl = "";

          const data = await new Promise(function (resolve, reject) {
            const form = new formidable.IncomingForm();
            form.uploadDir = "/tmp";
            form.keepExtensions = true;

            form.parse(req, async function (err, fields, files) {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          });

          console.log("Files>>>>>", data.files);

          req.body = data.files;

          let getObj = {
            modal: "Media",
            url: url,
            selectFields: ["url"],
            type: "findById",
            id: req.body.id,
          };

          let count = await getRecordsCount(getObj);

          // Check if user owns this and delete

          if (count == 1) {
            let updateFields = [
              { key: "is_del", value: true },
              { key: "updated_at", value: new Date() },
            ];

            let updateObj = {
              modal: "Media",
              url: url,
              id: req.body.id,
              type: "findById",
              updateFields: updateFields,
              selectFields: ["url"],
            };

            await updateRecord(updateObj);
          }

          res.status(200).json({ success: true });
        } catch (error) {
          console.log("Error>>>>1", error);
          res.status(400).json({ success: false });
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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
