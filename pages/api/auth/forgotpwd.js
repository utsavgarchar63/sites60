import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../../../lib/emailController";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method == "POST") {
    let email = sanitize(req.body.email);
    let captcha = req.body.captcha;
    try {
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

 
        if (captchaValidation.success) {
          const userInfo = await User.findOne({
            email: email,
            is_active: true,
          });

          
          if (userInfo) {

            const new_verification_key = uuidv4();

            // Send this key to the user via email
            sendResetPwdEmail(
              userInfo.first_name,
              userInfo.email,
              new_verification_key
            );

            // Update the key in DB
            const updatedInfo = await User.findByIdAndUpdate(
              userInfo._id,
              {
                verification_key: new_verification_key,
                verification_expires: new Date(
                  Date.now() + 2 * (60 * 60 * 1000)
                ),
                updated_at: new Date(),
              },
              { new: true }
            );

            
            res.status(200).json({ success: true });
          } else {
            res
              .status(403)
              .json({ success: false, message: "Invalid Data", status: 403 });
          }
        } else {
          res
            .status(403)
            .json({ success: false, message: "Invalid Captcha1", status: 403 });
        }
      } catch (captchaError) {
        
        res
          .status(403)
          .json({ success: false, message: "Invalid Captcha2", status: 403 });
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}

function sendResetPwdEmail(name, email, key) {
  let verifyLink = process.env.LIVE_URL + "/reset-password?key=" + key;

  var importEmail = require("../../../emails/reset-password");
  let resetPwdTemplate = importEmail.emailTemplate(
    name,
    "Sites60",
    "https://app.sites60.com/whitelogo.png",
    verifyLink
  );

  let sendSmtpEmail = {
    subject: `Sites60 - Reset your password`,
    sender: { email: "support@sites60.com", name: "Sites60" },
    replyTo: { email: "support@sites60.com", name: "Sites60" },
    to: [{ name: name, email: email }],
    htmlContent: resetPwdTemplate,
  };

  sendEmail(sendSmtpEmail);

}

function sanitize(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}


