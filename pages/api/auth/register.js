import dbConnect from "../../../lib/dbConnect";
import initMiddleware from "../../../lib/initMiddleware";
import validateMiddleware from "../../../lib/validateMiddleware";
import { check, body, checkSchema, validationResult } from "express-validator";
import User from "../../../models/User";
import UserInfo from "../../../models/UserInfo";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import randomstring from "randomstring";
import sendLeads from "../../../lib/sendLeads";
import {
  verificationRules,
  companyName,
  companyLogo,
} from "../../../lib/customRules";
import sendEmail from "../../../lib/emailController";
import { MixpanelEvent } from "../../../lib/trackEventBackend";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("first_name")
        .isLength({ min: 3, max: 40 })
        .withMessage("Min 3 Max 40 characters")
        .escape()
        .trim(),
      check("last_name")
        .isLength({ min: 1, max: 40 })
        .withMessage("Min 1 Max 40 characters")
        .escape()
        .trim(),
      check("role")
        .isIn(["owner", "member", "waiter", "customer"])
        .escape()
        .trim(),
      check("email")
        .isEmail()
        .escape()
        .toLowerCase()
        .trim()
        .withMessage("This is an invalid email"),
      check("email").custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
      check("random").custom((value) => {
        return User.findOne({ uid: value }).then((user) => {
          if (user) {
            return Promise.reject("Unique ID already in use");
          }
        });
      }),
      check("mobile")
        .matches(phoneRegExp)
        .optional({ checkFalsy: true })
        .withMessage("Invalid Phone Number"),
      check("password")
        .isLength({ min: 6, max: 100 })
        .withMessage("Min 6 Max 100 characters"),
    ],
    validationResult
  )
);

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method == "POST") {
    try {
      // Check if user has an account

      let x = randomstring.generate({
        length: 8,
        charset: "alphanumeric",
      });

      req.body.random = x;

      await validateBody(req, res);

      let captcha = req.body.captcha;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Error>>>>", errors.array());
        return res.status(422).json({ errors: errors.array() });
      } else {
        // Check if Captcha is Valid

        try {
          // Ping the google recaptcha verify API to verify the captcha code you received
          const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=utf-8",
              },
              method: "POST",
            }
          );
          const captchaValidation = await response.json();
          const captchaVerify = true;

          // if (captchaVerify) {
          if (captchaValidation.success) {
            const salt = await bcrypt.genSalt(12);

            const hash = await bcrypt.hash(req.body.password, salt);

            const verification_key = uuidv4();

            let currentDate = new Date();

            let uInfo = await User.create({
              uid: req.body.random,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              from: req.body.from,
              mobile: req.body.mobile,
              role: req.body.role,
              verification_key: verification_key,
              verification_expires: currentDate.getTime() + 7200000,
              password: hash,
            });

            res.status(200).json({ success: true });

            // Track Event

            MixpanelEvent.people.set(uInfo._id, {
              $first_name: uInfo.first_name,
              $last_name: uInfo.last_name,
              $email: uInfo.email,
              $created: new Date(),
            });

            let properties = {
              user_id: uInfo._id,
              created_time: new Date(),
            };

            MixpanelEvent.track("User Created", properties);

            createUserInfo(uInfo._id, uInfo.role, {
              fname: req.body.first_name,
              lname: req.body.last_name,
              email: req.body.email,
              uuid: verification_key,
            });

            sendLeads(
              req.body.first_name,
              req.body.last_name,
              req.body.email,
              req.body.random,
              req.body.role
            );
          } else {
            console.log("Captcha Failed>>>>>>>");
            res.status(406).json({
              success: false,
              message: "Invalid Captcha",
              status: 406,
            });
          }
        } catch (captchaError) {
          console.log("Captcha Error>>>>", captchaError);
          res
            .status(403)
            .json({ success: false, message: "Invalid Captcha", status: 403 });
        }
      }
    } catch (error) {
      console.log("Error>>>>>", error);
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}

async function createUserInfo(user_id, role, more_info) {
  try {
    if (role == "owner") {
      UserInfo.create({
        user_id: user_id,
      });

      let userRule = verificationRules.filter((e) => e.role === "owner")[0];

      // Send Verification Email Logic
      if (userRule.verify_email == true) {
        var importEmail = require("../../../emails/verify-email");
        let verifyURL =
          process.env.LIVE_URL +
          "/confirm-email?key=" +
          more_info.uuid;
        let verifyTemplate = importEmail.emailTemplate(
          more_info.fname,
          companyName,
          companyLogo,
          verifyURL
        );

        let sendSmtpEmail = {
          subject: `${companyName} - Verify your Email`,
          sender: { email: "support@sites60.com", name: companyName },
          replyTo: { email: "support@sites60.com", name: companyName },
          to: [{ name: more_info.fname, email: more_info.email }],
          htmlContent: verifyTemplate,
        };

        sendEmail(sendSmtpEmail);
      } else {
        console.log("Ignore Send Verification Email>>>>");
      }
    }
  } catch (error) {
    console.log("createUserInfo Error>>>>", error);
  }
}
