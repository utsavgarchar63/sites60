import dbConnect from "../../../lib/dbConnect";
import {
  fetchRecords,
  updateRecord,
  getRecordsCount,
  deleteRecord,
  uploadMedia,
  generateV4ReadSignedUrl,
} from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";
import randomstring from "randomstring";
import Smartsite from "../../../models/Smartsite";
import initMiddleware from "../../../lib/initMiddleware";
import validateMiddleware from "../../../lib/validateMiddleware";
import { MixpanelEvent } from "../../../lib/trackEventBackend";
import he from "he";

import { check, validationResult } from "express-validator";
import formidable from "formidable";
const momentTZ = require("moment-timezone");

import { v4 as uuidv4 } from "uuid";
import { log } from "console";
const fs = require("fs");
const path = require("path");

export const config = {
  api: { bodyParser: false },
};

const secret = process.env.NEXTAUTH_SECRET;

const webshot = require("node-webshot");

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;

  if (token) {
    const validateBody = initMiddleware(
      validateMiddleware(
        [
          check("key").custom((value) => {
            return Smartsite.findOne({ key: value }).then((user) => {
              if (user) {
                return Promise.reject("Unique Key already in use");
              }
            });
          }),
        ],
        validationResult
      )
    );

    const validateBody2 = initMiddleware(
      validateMiddleware(
        [
          check("title")
            .escape()
            .trim()
            .isLength({ min: 2, max: 150 })
            .withMessage("changes saved ")
            .customSanitizer((value) => he.decode(value)),
          check("description")
            .escape()
            .trim()
            .isLength({ min: 2, max: 150 })
            .optional({ checkFalsy: true })
            .withMessage("Invalid Description")
            .customSanitizer((value) => he.decode(value)),
          check("favicon")
            .isURL()
            .optional({ checkFalsy: true })
            .withMessage("Invalid Icon"),
        ],
        validationResult
      )
    );

    const validateContact = initMiddleware(
      validateMiddleware(
        [
          check("heading")
            .escape()
            .trim()
            .isLength({ min: 3, max: 300 })
            .withMessage("Invalid Contact Heading")
            .customSanitizer((value) => he.decode(value)),
          check("subHeading")
            .escape()
            .trim()
            .isLength({ min: 3, max: 1000 })
            .withMessage("Invalid Contact Sub Heading")
            .customSanitizer((value) => he.decode(value)),
          check("buttonText")
            .escape()
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage("Invalid Contact Button Text")
            .customSanitizer((value) => he.decode(value)),
        ],
        validationResult
      )
    );

    const validateHeader = initMiddleware(
      validateMiddleware(
        [
          check("logo").isURL().withMessage("Upload Logo"),
          check("btn1_text")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .optional({ checkFalsy: true })
            .withMessage("Invalid Header Button 1 Text")
            .customSanitizer((value) => he.decode(value)),
          check("btn1_link")
            .isURL()
            .optional({ checkFalsy: true })
            .withMessage("Invalid Header Button 1 Link"),
          check("btn2_text")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .optional({ checkFalsy: true })
            .withMessage("Invalid Header Button 2 Text")
            .customSanitizer((value) => he.decode(value)),
          check("btn2_link")
            .isURL()
            .optional({ checkFalsy: true })
            .withMessage("Invalid Header Button 2 Link"),
          check("navigation.*.name")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .withMessage("Header Navigation Name Validation Failed")
            .customSanitizer((value) => he.decode(value)),
          check("navigation.*.href")
            .isLength({ min: 2, max: 40 })
            .withMessage("Header Navigation Link Validation Failed"),
        ],
        validationResult
      )
    );

    const validateFooter = initMiddleware(
      validateMiddleware(
        [
          check("logo").isURL().withMessage("Invalid Logo"),
          check("company")
            .escape()
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage("Invalid Footer Company Name")
            .customSanitizer((value) => he.decode(value)),
          check("tagline")
            .escape()
            .trim()
            .isLength({ max: 300 })
            .optional({ checkFalsy: true })
            .withMessage("Invalid Footer Tagline")
            .customSanitizer((value) => he.decode(value)),
          check("social.*.name")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .withMessage("Footer Name Validation Failed")
            .customSanitizer((value) => he.decode(value)),
          check("social.*.href")
            .isURL()
            .withMessage("Footer URL Validation Failed"),
        ],
        validationResult
      )
    );

    const validateFeature = initMiddleware(
      validateMiddleware(
        [
          check("title")
            .escape()
            .trim()
            .isLength({ min: 3, max: 300 })
            .withMessage("Invalid Feature Title")
            .customSanitizer((value) => he.decode(value)),
          check("subtitle")
            .escape()
            .trim()
            .isLength({ min: 3, max: 1000 })
            .withMessage("Invalid Feature Subtitle")
            .customSanitizer((value) => he.decode(value)),
          check("features.*.title")
            .escape()
            .trim()
            .isLength({ min: 3, max: 300 })
            .withMessage("Feature Title Validation Failed")
            .customSanitizer((value) => he.decode(value)),
          check("features.*.description")
            .escape()
            .trim()
            .isLength({ min: 10, max: 1000 })
            .withMessage("Feature Description Validation Failed")
            .customSanitizer((value) => he.decode(value)),
        ],
        validationResult
      )
    );

    const validateTestimonial = initMiddleware(
      validateMiddleware(
        [
          check("title")
            .escape()
            .trim()
            .isLength({ min: 0, max: 300 })
            .withMessage("Invalid Testimonial Title")
            .customSanitizer((value) => he.decode(value)),
          check("subtitle")
            .escape()
            .trim()
            .isLength({ min: 0, max: 1000 })
            .withMessage("Invalid Testimonial Subtitle")
            .customSanitizer((value) => he.decode(value)),
          check("testimonials.*.name")
            .escape()
            .trim()
            .isLength({ min: 0, max: 100 })
            .withMessage("Testimonial Name Validation Failed")
            .customSanitizer((value) => he.decode(value)),
          check("testimonials.*.designation")
            .escape()
            .trim()
            .isLength({ min: 0, max: 100 })
            .withMessage("Testimonial Designation Validation Failed")
            .customSanitizer((value) => he.decode(value)),
          check("testimonials.*.content")
            .escape()
            .trim()
            .isLength({ min: 0, max: 2000 })
            .withMessage("Testimonial Content Validation Failed")
            .customSanitizer((value) => he.decode(value)),
          check("testimonials.*.image")
            .isURL()
            .withMessage("Testimonial Image Validation Failed"),
        ],
        validationResult
      )
    );

    const validateGallery = initMiddleware(
      validateMiddleware(
        [
          check("heading")
            .escape()
            .trim()
            .isLength({ min: 0, max: 300 })
            .withMessage("Invalid Gallery Heading")
            .customSanitizer((value) => he.decode(value)),
          check("subHeading")
            .escape()
            .trim()
            .isLength({ min: 0, max: 1000 })
            .withMessage("Invalid Gallery Sub Heading")
            .customSanitizer((value) => he.decode(value))
            .optional({ checkFalsy: true }),
          check("gallery.*.heading")
            .escape()
            .trim()
            .isLength({ min: 0, max: 100 })
            .withMessage("Gallery Heading Validation Failed")
            .customSanitizer((value) => he.decode(value))
            .optional({ checkFalsy: true }),
          check("gallery.*.subHeading")
            .escape()
            .trim()
            .isLength({ min: 0, max: 2000 })
            .withMessage("Gallery Sub Heading Validation Failed")
            .customSanitizer((value) => he.decode(value))
            .optional({ checkFalsy: true }),
          check("gallery.*.image")
            .isURL()
            .withMessage("Gallery Image Validation Failed"),
        ],
        validationResult
      )
    );

    const validateHero = initMiddleware(
      validateMiddleware(
        [
          check("title")
            .escape()
            .trim()
            .isLength({ min: 0, max: 300 })
            .withMessage("Invalid Hero Title")
            .customSanitizer((value) => he.decode(value)),
          check("subtitle")
            .escape()
            .trim()
            .isLength({ min: 0, max: 2000 })
            .withMessage("Invalid Hero Subtitle")
            .customSanitizer((value) => he.decode(value)),
          check("image").isURL().withMessage("Invalid Hero Image"),
        ],
        validationResult
      )
    );

    await dbConnect();

    const { method } = req;

    switch (method) {
      case "GET":
        try {
          let url = req.url;

          let getObj = {
            modal: "Smartsite",
            url: url,
            condition: { user_id: user_id, is_del: false },
            selectFields: [
              "key",
              "title",
              "siteKey",
              "description",
              "color",
              "primaryColor",
              "secondaryColor",
              "tertiaryColor",
              "templateThumbnail",
              "font",
              "status",
              "thumbnail",
              "created_at",
              "trial_expires",
              "is_paid",
              "subscription_start",
              "subscription_end",
              "template_html",
            ],
            type: "find",
          };

          let smartsitesInfo = await fetchRecords(getObj);

          // console.log("smartsitesInfo>>>>>>", smartsitesInfo);

          res.status(200).json({ success: true, list: smartsitesInfo });
        } catch (error) {
          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }
        break;

      case "POST":
        try {
          let url = req.url;
          // let picUrl = "";
          const data = await new Promise(function (resolve, reject) {
            const form = new formidable.IncomingForm();
            form.uploadDir = "/tmp";
            form.keepExtensions = true;

            form.parse(req, async function (err, fields, files) {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          });

          req.body = data.fields;

          let uniqueKey = randomstring.generate({
            length: 12,
            charset: "alphanumeric",
          });
          req.body.key = uniqueKey;

          // console.log("Body>>>>>", req.body);

          await validateBody(req, res);

          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }

          // Check user plan

          let getUserInfo = {
            modal: "UserInfo",
            url: url,
            type: "findOne",
            condition: { user_id: user_id },
            selectFields: ["plan_id"],
          };

          let userInfo = await fetchRecords(getUserInfo);

          // Get User Current Active Smartsites Count

          let siteInfo = {
            modal: "Smartsite",
            url: url,
            type: "findOne",
            condition: { user_id: user_id, is_del: false },
            selectFields: ["key"],
          };

          let sitesCount = await getRecordsCount(siteInfo);

          let allowFurther = true;

          if (userInfo.plan_id == "free") {
            if (sitesCount >= 2) {
              allowFurther = false;

              res.status(403).json({
                success: false,
                message: "Upgrade your plan",
              });
            }
          } else if (userInfo.plan_id == "price_1M7CEMSBvfNCKIA7iHEXptJP") {
            // freelancer

            if (sitesCount >= 3) {
              allowFurther = false;
              res.status(403).json({
                success: false,
                message: "Upgrade your plan",
              });
            }
          } else if (userInfo.plan_id == "price_1M7CEkSBvfNCKIA7UfKiuF02") {
            // agency

            if (sitesCount >= 10) {
              allowFurther = false;
              res
                .status(403)
                .json({ success: false, message: "Upgrade your plan" });
            }
          }

          if (allowFurther == true) {
            let smartsiteObj = new Smartsite({
              user_id: user_id,
              title: "New Website",
              color: JSON.stringify(
                "{name: 'indigo', bgColor: 'bg-indigo-500', selectedColor: 'ring-indigo-500'}"
              ),
              key: uniqueKey,
              created_at: new Date(),
              updated_at: new Date(),
            });

            let created_type = "new";

            if (req.body.type == "duplicate") {
              created_type = "duplicate";
              let getObj = {
                modal: "Smartsite",
                url: url,
                type: "findById",
                id: req.body.id,
                selectFields: ["title", "description", "sections", "status"],
              };

              let siteInfo = await fetchRecords(getObj);

              smartsiteObj.title = "Copy " + siteInfo.title;
              smartsiteObj.description = siteInfo.description;
              smartsiteObj.sections = siteInfo.sections;
              smartsiteObj.status = siteInfo.status;
            }

            smartsiteObj.save(async function (err, result) {
              if (err) {
                res.status(500).json({ success: false });
              } else {
                res.status(200).json({ success: true, data: result });

                // Track Event
                let properties = {
                  type: created_type,
                  site_id: result.key,
                  user_id: user_id,
                  created_time: new Date(),
                };

                MixpanelEvent.track("Site Created", properties);
              }
            });
          }
        } catch (error) {
          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }

        break;

      case "PUT":
        try {
          let url = req.url;

          const data = await new Promise(function (resolve, reject) {
            const form = new formidable.IncomingForm();
            form.uploadDir = "/tmp";
            form.keepExtensions = true;

            form.parse(req, async function (err, fields, files) {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          });

          let changeObj = data.fields;

          let sectionsArray = JSON.parse(changeObj.sections);

          for (const iterator of sectionsArray) {
            req.body = iterator.data;

            if (iterator.section_id.includes("hero")) {
              await validateHero(req, res);
            } else if (iterator.section_id.includes("header")) {
              await validateHeader(req, res);
            } else if (iterator.section_id.includes("footer")) {
              await validateFooter(req, res);
            } else if (iterator.section_id.includes("testimonial")) {
              await validateTestimonial(req, res);
            } else if (iterator.section_id.includes("feature")) {
              await validateFeature(req, res);
            } else if (iterator.section_id.includes("gallery")) {
              await validateGallery(req, res);
            } else if (iterator.section_id.includes("contact")) {
              await validateContact(req, res);
            }
          }
          changeObj.sections = sectionsArray;

          req.body = changeObj;

          // console.log("Body>>>>>", req.body);

          await validateBody2(req, res);

          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }

          const filePath = req.body.key + ".png";

          let updateFields = [
            { key: "sections", value: JSON.stringify(req.body.sections) },
            { key: "color", value: req.body.color },
            { key: "primaryColor", value: req.body.primaryColor },
            { key: "secondaryColor", value: req.body.secondaryColor },
            { key: "tertiaryColor", value: req.body.tertiaryColor },
            { key: "font", value: req.body.font },
            { key: "favicon", value: req.body.favicon },
            { key: "title", value: req.body.title },
            { key: "description", value: req.body.description },
            { key: "status", value: req.body.status },
            { key: "updated_at", value: new Date() },
          ];

          console.log(updateFields, "updateFields>>>>");

          let updateObj = {
            modal: "Smartsite",
            url: url,
            condition: { siteKey: req.body.key },
            type: "findOne",
            updateFields: updateFields,
            selectFields: ["siteKey"],
          };

          let updateresponse = await updateRecord(updateObj);

          res.status(200).json({ success: true });

          let thumbnailUrl =
            "https://storage.screenshotapi.net/app_sites60_com_smartsite_0jywub7mym2m_9d7558bf9903.png";

          // Website Screenshot

          if (process.env.NODE_ENV == "production") {
            // if(true){
            let website =
              process.env.LIVE_URL +
              "/smartsite/" +
              updateresponse.siteKey +
              "?preview=true";
            thumbnailUrl = await takeScreenshot(website, filePath);
          }

          let updateFields2 = [
            { key: "thumbnail", value: thumbnailUrl },
            { key: "updated_at", value: new Date() },
          ];

          let updateObj2 = {
            modal: "Smartsite",
            url: url,
            condition: { siteKey: req.body.key },
            type: "findOne",
            updateFields: updateFields2,
            selectFields: ["key", "siteKey"],
          };

          let thumbnailUpdated = await updateRecord(updateObj2);
        } catch (error) {
          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }

        break;

      case "DELETE":
        try {
          let url = req.url;

          const data = await new Promise(function (resolve, reject) {
            const form = new formidable.IncomingForm();
            form.uploadDir = "/tmp";
            form.keepExtensions = true;

            form.parse(req, async function (err, fields, files) {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          });

          // Check if user has access
          let key = data.fields.key;

          let delObj = {
            modal: "Smartsite",
            url: url,
            type: "findOne",
            condition: { user_id: user_id, siteKey: key },
          };

          let count = await getRecordsCount(delObj);

          if (count == 1) {
            await deleteRecord(delObj);
            res.status(200).json({ success: true });
          } else {
            res.status(400).json({ success: false });
          }
        } catch (error) {
          console.log("Error>>>> here", error);
          res.status(400).json({ success: false });
        }

        break;

      default:
        console.log("Hit default>>>");
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false, message: "Not Authorized" });
  }
}

function takeScreenshot(website, filePath) {
  return new Promise(async function (resolve, reject) {
    let hitUrl = `https://shot.screenshotapi.net/screenshot?token=B2AKV16-5S34C1W-MS2Q5X6-FF6M8FN&url=${website}&delay=5000&fresh=true`;

    try {
      const res = await fetch(hitUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      resolve(data.screenshot);
    } catch (error) {
      reject(error);
    }

    // var options = {
    //   // screenSize: {
    //   //   width: 480,
    //   //   height: 320,
    //   // },
    //   renderDelay: 30000
    // };

    // webshot(website, filePath, options, function (err) {
    //   if (err) {
    //     console.log("Error taking screenshot:", err);
    //     reject(err)
    //   } else {

    //     const futureDate = Date.now();
    //     const secondsUntilPromise = Math.floor(
    //       (futureDate - currentTime) / 1000
    //     );

    //     console.log(`Screenshot taken in ${secondsUntilPromise} seconds!`);

    //     fs.readFile(filePath, async (err, data) => {
    //       if (err) throw err;

    //       const imageBuffer = Buffer.from(data);

    //       const uuid = uuidv4();
    //       const fileName =
    //       momentTZ(new Date()).tz("Asia/Calcutta").format("HH-mm-ss") +
    //       "-" +
    //       uuid +
    //       ".png"

    //       console.log("File Name>>>>", fileName);

    //       let bucketName = "gs://" + process.env.GOOGLE_BUCKET;

    //       await uploadMedia(imageBuffer, bucketName, fileName);

    //       let urlBucketName = process.env.GOOGLE_BUCKET;

    //       let mediaUrl = `https://storage.googleapis.com/${urlBucketName}/${fileName}`;

    //       resolve(mediaUrl)

    //       // Remove local file
    //       fs.access(filePath, (err) => {
    //         if (err) {
    //           console.error('Error accessing file:', err);
    //           return;
    //         }

    //         // File exists, so we can delete it
    //         fs.unlink(filePath, (err) => {
    //           if (err) {
    //             console.error('Error deleting file:', err);
    //             return;
    //           }
    //           console.log('File deleted successfully!');
    //         });
    //       });

    //     });

    //   }
    // });
  });
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
