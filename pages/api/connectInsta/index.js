const { GoogleAuth } = require('google-auth-library');
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
                  "font",
                  "status",
                  "thumbnail",
                  "created_at",
                  "trial_expires",
                  "is_paid",
                  "subscription_start",
                  "subscription_end",
                  "link_domain",
                  "ip_address"
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
              let domain = req.body.domain;
              let siteKey = req.body.siteKey;
            //   let instaAppId = '2095938424109214';
            //   let redirectURI = 'https://86e7-2401-4900-1c0e-8fff-00-d9-1342.ngrok-free.app/api/instagramCallback';
              
              try {
                const instaAppId = '2095938424109214';
                const redirectURI = 'https://86e7-2401-4900-1c0e-8fff-00-d9-1342.ngrok-free.app/api/instagramCallback';
            
                // Redirect the user to the Instagram authorization URL
                res.redirect(
                  `https://www.instagram.com/oauth/authorize?client_id=${instaAppId}&redirect_uri=${redirectURI}&scope=user_profile,user_media&response_type=code`
                );
              } catch (error) {
                console.error('Error redirecting to Instagram authorization:', error);
                res.status(500).json({ error: 'Internal Server Error' });
              }
        
        } catch (error) {
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



