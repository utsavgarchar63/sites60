import dbConnect from "../../../lib/dbConnect";
import { fetchRecords, updateRecord } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";
 
const secret = process.env.NEXTAUTH_SECRET;
 
const staticLogos = [
  "https://app.sites60.com/whitelogo.png",
  "https://app.sites60.com/whitelogo.png",
  "https://app.sites60.com/whitelogo.png",
  "https://app.sites60.com/whitelogo.png",
  "https://app.sites60.com/whitelogo.png",
  "https://app.sites60.com/whitelogo.png",
];

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;

  if (token) {
    await dbConnect();

    const { method } = req;

    switch (method) {
      case "GET":
        try {
          // Your existing code for handling GET requests

          // ...

        } catch (error) {
          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }
        break;

      case "POST":
        try {
          // Get the AI data from the request body
          const aiData = req.body.aiData;

          // Update the AI data in the database for the user
          const updateObj = {
            modal: "User",
            url: "updateAI",
            condition: { _id: user_id },
            type: "updateOne",
            updateFields: [{ key: "aiData", value: aiData }],
            selectFields: ["_id"],
          };
          await updateRecord(updateObj);

          res.status(200).json({ success: true, message: "AI data updated and saved." });
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
