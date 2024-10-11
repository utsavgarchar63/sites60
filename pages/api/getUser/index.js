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
          let email = req.query.email 
         
          let getObj = {
            modal: "User",
            url: url,
            type: "findOne",
            selectFields: ["first_name", "last_name", "email"],
            condition: { email: email },
          };

          let userInfo = await fetchRecords(getObj); 

          res
            .status(200)
            .json({ success: true, userInfo: userInfo });
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
