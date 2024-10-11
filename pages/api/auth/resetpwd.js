import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method == "POST") {
    let password = req.body.password;
    let password2 = req.body.password2;
    let verification_key = req.body.key;

    if (password === password2) {
      try {
        // Check User with the Key

        try {
          const userInfo = await User.findOne({
            verification_key: verification_key,
            is_active: true,
          });

          if (userInfo) {
            let currentDate = new Date();

            if (userInfo.verification_expires > currentDate) {
              const salt = await bcrypt.genSalt(12);

              const hash = await bcrypt.hash(req.body.password, salt);

              const new_verification_key = uuidv4();

              const updatedInfo = await User.findByIdAndUpdate(
                userInfo._id,
                {
                  verification_key: new_verification_key,
                  verification_expires: new Date(
                    Date.now() + 2 * (60 * 60 * 1000)
                  ),
                  password: hash,
                  updated_at: new Date(),
                },
                { new: true }
              );
              res.status(200).json({ success: true });
            } else {
              res
                .status(403)
                .json({ success: false, message: "Link Expired", status: 403 });
            }
          } else {
            res
              .status(403)
              .json({ success: false, message: "Invalid Data", status: 403 });
          }
        } catch (captchaError) {
          res
            .status(403)
            .json({ success: false, message: "Invalid Data", status: 403 });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
    } else {
      res
        .status(403)
        .json({
          success: false,
          message: "Passwords do not match",
          status: 403,
        });
    }
  } else {
    res.status(400).json({ success: false });
  }
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


