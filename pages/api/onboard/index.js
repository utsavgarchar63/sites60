import dbConnect from "../../../lib/dbConnect";
import { updateRecord, uploadMedia } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";
import initMiddleware from "../../../lib/initMiddleware";
import validateMiddleware from "../../../lib/validateMiddleware";
import { check, validationResult } from "express-validator";
import formidable from "formidable";
import momentTZ from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import he from "he";

export const config = {
  api: { bodyParser: false },
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token?.sub;

  if (token) {
    const validateBody = initMiddleware(
      validateMiddleware(
        [
          check("brand_name")
            .isLength({ min: 3, max: 100 })
            .withMessage("Brand Name must be between 3 and 100 characters.")
            .escape()
            .trim()
            .customSanitizer((value) => he.decode(value)),
          check("brand_category")
            .isLength({ min: 3, max: 100 })
            .withMessage("Category must be between 3 and 100 characters.")
            .escape()
            .trim()
            .customSanitizer((value) => he.decode(value)),
        ],
        validationResult
      )
    );

    await dbConnect();

    const { method } = req;

    switch (method) {
      case "POST":
        try {
          let url = req.url;
          let picUrl = "https://app.sites60.com/main-logo.png";

          const data = await new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.uploadDir = "/tmp";
            form.keepExtensions = true;

            form.parse(req, (err, fields, files) => {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          });

          console.log(data, "<<data");

          if (data.files.brand_pic) {
            let imageBuffer = fs.readFileSync(data.files.brand_pic.filepath);
            let sizeinb = data.files.brand_pic.size;
            let size = (sizeinb / 1024 ** 2).toFixed(2);
            let type = data.files.brand_pic.mimetype.split("/")[1];

            if (type === "svg+xml") type = "svg";

            if (size < 2) {
              const uuid = uuidv4();
              const fileName = `${momentTZ(new Date())
                .tz("Asia/Calcutta")
                .format("HH-mm-ss")}-${uuid}.${type}`;
              const bucketName = "gs://" + process.env.GOOGLE_BUCKET;

              await uploadMedia(imageBuffer, bucketName, fileName);
              picUrl = `https://storage.googleapis.com/${process.env.GOOGLE_BUCKET}/${fileName}`;
            } else {
              return res.status(422).json({
                errors: [
                  { type: "File Size", message: "File size exceeded 2 MB." },
                ],
              });
            }
          }

          req.body = data.fields;
          await validateBody(req, res);
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }

          let updateFields = [
            { key: "brand_name", value: req.body.brand_name },
            { key: "brand_category", value: req.body.brand_category },
            { key: "brand_other", value: req.body.brand_other },
            { key: "belief", value: req.body.belief },
            // { key: "html", value: req.body.html },
            { key: "updated_at", value: new Date() },
          ];

          if (picUrl.length > 0) {
            updateFields.push({ key: "brand_pic", value: picUrl });
          }

          let updateObj = {
            modal: "User",
            url: url,
            type: "findById",
            updateFields: updateFields,
            id: user_id,
            selectFields: [
              "brand_name",
              "brand_category",
              "brand_pic",
              "brand_believe",
              "brand_other",
              // "html",
            ],
          };

          let userInfo = await updateRecord(updateObj);

          let updateFieldsInfo = [
            { key: "onboarded", value: true },
            { key: "updated_at", value: new Date() },
          ];

          let updateInfoObj = {
            modal: "UserInfo",
            url: url,
            type: "findOne",
            updateFields: updateFieldsInfo,
            condition: { user_id: user_id },
            selectFields: ["brand_name", "brand_category", "brand_pic"],
          };

          let updateUserInfo = await updateRecord(updateInfoObj);

          res.status(200).json({ success: true, data: updateUserInfo });
        } catch (error) {
          console.error("Error during POST request:", error);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        break;

      default:
        res.status(405).json({ success: false, message: "Method Not Allowed" });
        break;
    }
  } else {
    res.status(401).json({ success: false, message: "Not Authorized" });
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
