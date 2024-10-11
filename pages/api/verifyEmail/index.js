import dbConnect from "../../../lib/dbConnect";
import {
  fetchRecords,
  updateRecord
} from "../../../lib/genericController";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {

    const { method } = req;

    await dbConnect();

   switch (method) {
     case "GET":
       try {
         let url = req.url;
         let key = req.query.key; 

         // Fetch Single Record

         let currentDate = new Date();

         let getObj = {
           modal: "User",
           url: url,
           type: "find",
           selectFields: ["first_name", "email", "verification_expires"],
           condition: {
             verification_key: key,
           },
         };

         const userInfo = await fetchRecords(getObj); 

         console.log("Veirfy Key>>>>", userInfo);

         if (userInfo.length>0) {

           if (userInfo[0].verification_expires >= currentDate)
           {
             // Update the Key in User Model 
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
               id: userInfo[0]._id,
               type: "findById",
               updateFields: updateFields,
               selectFields: ["first_name", "email"],
             };

             await updateRecord(updateObj);

             // Update the Email Verification Status in UserInfo Model 

             let updateFieldsInfo = [
               { key: "verified_email", value: true },
               { key: "updated_at", value: new Date() },
             ];

             let updateInfoObj = {
               modal: "UserInfo",
               url: url,
               type: "findOne",
               condition: { user_id: userInfo[0]._id },
               updateFields: updateFieldsInfo,
               selectFields: ["verified_email"]
             };

             await updateRecord(updateInfoObj);

             res.status(200).json({ success: true, expired: false });
           }
           else
           {
              // Link Expired 
              res.status(200).json({ success: true, expired: true });
           }
           
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
