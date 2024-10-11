import dbConnect from "../../../lib/dbConnect";
import { fetchRecords } from "../../../lib/genericController";
const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  
    await dbConnect();
  
    const { method } = req;

    switch (method) {
      case "GET":
        try {

          let url = req.url 

          const domain = req.query.domain;
         
          let getObj = {
            modal: "WhiteLabel",
            url: url,
            type: "findOne",
            selectFields: ["whitelabelurl", "smartsite_id", "is_active"],
            condition: { whitelabelurl: domain },
            populate: [
              // Incase you want to populate inner objects
              { path: "smartsite_id", select: { key: 1 } },
            ],
          };

          let domainInfo = await fetchRecords(getObj); 

          console.log("GET Request>>>>", domainInfo);

          if (!Array.isArray(domainInfo)) {

            if (domainInfo.is_active == true) {

              res.status(200).json({ allow: true, key: domainInfo.smartsite_id.key });
            }
            else {
              res.status(200).json({ allow: false });
            }
          }
          else
          {
            res.status(200).json({ allow: false });
          }

          
        } catch (error) {

          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  
}
