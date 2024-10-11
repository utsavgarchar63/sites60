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
          check("key").custom((value) => {
            return Smartsite.countDocuments({ key: value }).then((count) => {
              if (count != 1) {
                return Promise.reject("Invalid Smartsite Key");
              }
            });
          }),
          check("title")
            .escape()
            .trim()
            .isLength({ min: 0, max: 40 })
            .withMessage("changes saved"),
          check("description")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .optional({ checkFalsy: true })
            .withMessage("Invalid Description"),
          check("favicon")
            .isURL()
            .optional({ checkFalsy: true })
            .withMessage("Invalid Icon"),
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
            .withMessage("Invalid Button 1 Text"),
          check("btn1_link")
            .isURL()
            .optional({ checkFalsy: true })
            .withMessage("Invalid Button 1 Link"),
          check("btn2_text")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .optional({ checkFalsy: true })
            .withMessage("Invalid Button 2 Text"),
          check("btn2_link")
            .isURL()
            .optional({ checkFalsy: true })
            .withMessage("Invalid Button 2 Link"),
          check("navigation.*.name")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .withMessage("Navigation Name Validation Failed"),
          check("navigation.*.href")
            .isLength({ min: 2, max: 40 })
            .withMessage("Navigation Link Validation Failed"),
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
            .withMessage("Invalid Company Name"),
          check("tagline")
            .escape()
            .trim()
            .isLength({ max: 300 })
            .optional({ checkFalsy: true })
            .withMessage("Invalid Tagline"),
          check("social.*.name")
            .escape()
            .trim()
            .isLength({ min: 2, max: 40 })
            .withMessage("Name Validation Failed"),
          check("social.*.href")
            .isURL()
            .withMessage("URL Validation Failed"),
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
            .withMessage("Invalid Title"),
          check("subtitle")
            .escape()
            .trim()
            .isLength({ min: 3, max: 1000 })
            .withMessage("Invalid Subtitle"),
          check("features.*.title")
            .escape()
            .trim()
            .isLength({ min: 3, max: 300 })
            .withMessage("Feature Title Validation Failed"),
          check("features.*.description")
            .escape()
            .trim()
            .isLength({ min: 10, max: 1000 })
            .withMessage("Feature Description Validation Failed"),

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
            .isLength({ min: 3, max: 300 })
            .withMessage("Invalid Title"),
          check("subtitle")
            .escape()
            .trim()
            .isLength({ min: 3, max: 1000 })
            .withMessage("Invalid Subtitle"),
          check("testimonials.*.name")
            .escape()
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage("Name Validation Failed"),
          check("testimonials.*.designation")
            .escape()
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage("Designation Validation Failed"),
          check("testimonials.*.content")
            .escape()
            .trim()
            .isLength({ min: 10, max: 2000 })
            .withMessage("Testimonial Content Validation Failed"),
          check("testimonials.*.image")
            .isURL()
            .withMessage("Image Validation Failed"),
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
            .withMessage("changes saved"),
          check("subtitle")
            .escape()
            .trim()
            .isLength({ min: 10, max: 1000 })
            .withMessage("Invalid Subtitle"),
          check("image")
            .isURL()
            .withMessage("Invalid Header Image"),

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
            modal: "Template",
            url: url,
            condition: { is_del: false },
            selectFields: [
              "key",
              "title",
              "description",
              "color",
              "font",
              "status",
              "category",
              "thumbnail",
              "created_at",
            ],
            type: "find",
          };

          let templatesInfo = await fetchRecords(getObj);

          console.log("templatesInfo>>>>>>", templatesInfo);

          res.status(200).json({ success: true, list: templatesInfo });
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

          console.log("Body>>>>>", req.body);

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

          let allowFurther = true 
          
          if(userInfo.plan_id == "free")
          {
            if (sitesCount >= 2)
            {
              allowFurther = false
              
               res.status(403).json({
                 success: false,
                 message: "Upgrade your plan",
               });
            }  
          }
          else if (userInfo.plan_id == "price_1M7CEMSBvfNCKIA7iHEXptJP") { // freelancer 

            if (sitesCount >= 3) {
              allowFurther = false; 
              res.status(403).json({
                success: false,
                message: "Upgrade your plan",
              });
            }
          } else if (userInfo.plan_id == "price_1M7CEkSBvfNCKIA7UfKiuF02") { // agency 

            if (sitesCount >= 10) {
              allowFurther = false; 
              res
                .status(403)
                .json({ success: false, message: "Upgrade your plan" });
            }
          }

          if(allowFurther == true )
          {
              let smartsiteObj = new Smartsite({
                user_id: user_id,
                title: "New Website",
                color: JSON.stringify("{name: 'indigo', bgColor: 'bg-indigo-500', selectedColor: 'ring-indigo-500'}"),
                key: uniqueKey,
                created_at: new Date(),
                updated_at: new Date(),
              });

              let created_type = "new"

              if (req.body.type == "duplicate") {

                created_type = "duplicate"
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
            console.log("\nValidate Type - ", iterator.section_id);
            console.log("\n\nValidate Body - ", JSON.stringify(req.body));
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
            }
          }
          changeObj.sections = sectionsArray;

          req.body = changeObj;

          console.log("Body>>>>>", req.body);

          await validateBody2(req, res);

          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }

          let updateFields = [
            { key: "sections", value: JSON.stringify(req.body.sections) },
            { key: "color", value: req.body.color },
            { key: "font", value: req.body.font },
            { key: "favicon", value: req.body.favicon },
            { key: "title", value: req.body.title },
            { key: "description", value: req.body.description },
            { key: "status", value: req.body.status },
            { key: "updated_at", value: new Date() },
          ];

          let updateObj = {
            modal: "Smartsite",
            url: url,
            condition: { key: req.body.key },
            type: "findOne",
            updateFields: updateFields,
            selectFields: ["key"],
          };

          await updateRecord(updateObj);

          res.status(200).json({ success: true });
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

          console.log("Delete hit>>>", key);

          let delObj = {
            modal: "Smartsite",
            url: url,
            type: "findOne",
            condition: { "user_id": user_id, "key": key },
          };

          let count = await getRecordsCount(delObj);

          console.log("count>>>", count);

          if (count == 1)
          {
            await deleteRecord(delObj);
            res.status(200).json({ success: true });
          }
          else
          {
            res.status(400).json({ success: false });
          }
          

          
        } catch (error) {
          console.log("Error>>>>", error);
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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
