import dbConnect from "../../../lib/dbConnect";
import {
  fetchRecords,
  updateRecord
} from "../../../lib/genericController";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../../../lib/emailController";
import { companyName, companyLogo } from "../../../lib/customRules";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {

    const { method } = req;

    await dbConnect();

    switch (method) {
     case "GET":
       try {
         let url = req.url;
         let key = req.query.key; 

         let currentDate = new Date();

         // Check Token 
         const token = await getToken({ req, secret });
         
         let getObj = {
           modal: "User",
           url: url,
           type: "findOne",
           selectFields: ["first_name", "email"],
           condition: {
             verification_key: key,
           },
         };

         if (token) { 

           getObj.type = "findById";
           getObj['id'] = token.sub;

         }

         const userInfo = await fetchRecords(getObj); 

         console.log("Resend Email>>>>>", userInfo);

         if (userInfo) {
           
           // Update the Key 
           const verification_key = uuidv4();

           let updateFields = [
             { key: "verification_key", value: verification_key },
             {
               key: "verification_expires",
               value: currentDate.getTime() + 7200000, // 2 hours 
             },
             { key: "updated_at", value: new Date() },
           ];

           let updateObj = {
             modal: "User",
             url: url,
             id: userInfo._id,
             type: "findById",
             updateFields: updateFields,
             selectFields: ["first_name", "email"],
           };

           await updateRecord(updateObj);

           // Send the Key as Email

            var importEmail = require("../../../emails/verify-email");
            let verifyURL =
              process.env.LIVE_URL +
              "/confirm-email?key=" +
              verification_key;
            let verifyTemplate = importEmail.emailTemplate(
              userInfo.first_name,
              companyName,
              companyLogo,
              verifyURL
            );

            let sendSmtpEmail = {
              subject: `${companyName} - Verify your Email`,
              sender: { email: "support@sites60.com", name: companyName },
              replyTo: { email: "support@sites60.com", name: companyName },
              to: [{ name: userInfo.first_name, email: userInfo.email }],
              htmlContent: verifyTemplate,
            };

            sendEmail(sendSmtpEmail);

           res.status(200).json({ success: true, data: userInfo });
         } else {
           res.status(400).json({ success: false, message: "Invalid Key" });
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
 
}
