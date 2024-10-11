import dbConnect from "../../../lib/dbConnect";
import { updateRecord, fetchRecords } from "../../../lib/genericController";
import Track from "../../../models/Track";
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";

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

          let fromDate = req.query.fromDate;
          let toDate = req.query.toDate;

          console.log("Req Query>>>>", req.query);

          // Fetch all Smartsites of the user
          let sitesObj = {
            modal: "Smartsite",
            url: url,
            type: "find",
            condition: { "user_id": user_id, is_del: false },
            selectFields: ["key", "title", "description", "favicon"],
          };

          let sitesList = await fetchRecords(sitesObj);

          console.log("sitesList>>>>", sitesList);

          let finalArray = []

          for (const iterator of sitesList) {

             // Get Tracking Info 

             let trackObj = {
                modal: "Track",
                url: url,
                type: "findOne",
                condition: {
                  "smartsite_id": iterator._id,
                  "views.date": {$lte: toDate, $gte: fromDate} ,
                  "clicks.date": { $lte: toDate, $gte: fromDate }
                },
                
                "selectFields": ["smartsite_id", "views", "clicks"],
              }

           
             let trackDetails = await fetchRecords(trackObj);

             let formObj = {
                modal: "Contact",
                url: url,
                type: "find",
                condition: {
                  "smartsite_id": iterator._id,
                },                
                "selectFields": ["name", "email", "phone", "message"],
             }
           
             let formDetails = await fetchRecords(formObj);

            console.log("trackDetails>>>>", JSON.stringify(trackDetails));
            finalArray.push({
              smartsite: iterator,
              data: trackDetails,
              responses: formDetails,
            });

          }

          res.status(200).json({ success: true, finalArray: finalArray });
        } catch (error) {
          console.log("Error>>>>", error);
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
