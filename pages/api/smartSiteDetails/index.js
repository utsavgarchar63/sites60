import dbConnect from "../../../lib/dbConnect";
import { fetchRecords, getRecordsCount } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  if (token) {
    await dbConnect();

    const { method } = req;
    const user_id = token.sub;

    switch (method) {
      case "GET":
        try {
          let url = req.url;

          let getObj = {
            modal: "Smartsite",
            url: url,
            condition: {
              is_del: false,
              siteKey: req.query.key,
              user_id: user_id,
            },
            selectFields: [
              "key",
              "siteKey",
              "title",
              "status",
              "description",
              "sections",
              "color",
              "font",
              "favicon",
              "primaryColor",
              "secondaryColor",
              "tertiaryColor",
              "user_id",
              "is_paid",
            ],
            type: "findOne",
          };

          let smartsiteInfo = await fetchRecords(getObj);

          // Get User Smartsites Count

          let countObj = {
            modal: "Smartsite",
            url: url,
            condition: { is_del: false, user_id: user_id },
            selectFields: ["key"],
          };

          let count = await getRecordsCount(countObj);

          let showTour = false;

          if (count == 1) {
            showTour = true;
          }

          if (!Array.isArray(smartsiteInfo)) {
            res.status(200).json({
              success: true,
              smartsiteInfo: smartsiteInfo,
              showTour: showTour,
            });
          } else {
            res
              .status(400)
              .json({ success: false, message: "Invalid Smartsite" });
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
  } else {
    res.status(400).json({ success: false, message: "Not Authorized" });
  }
}
