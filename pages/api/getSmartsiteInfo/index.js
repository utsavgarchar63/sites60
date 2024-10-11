import dbConnect from "../../../lib/dbConnect";
import { fetchRecords } from "../../../lib/genericController";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        let url = req.url;

        let getObj = {
          modal: "Smartsite",
          url: url,
          condition: { is_del: false, siteKey: req.query.key },
          selectFields: [
            "key",
            "title",
            "status",
            "siteKey",
            "description",
            "category",
            "templateThumbnail",
            "thumbnail",
            "sections",
            "color",
            "font",
            "favicon",
            "primaryColor",
            "secondaryColor",
            "tertiaryColor",
            "user_id",
            "is_paid",
            "trial_expires",
            "brand_name",
            "brand_category",
            "brand_other",
          ],
          type: "findOne",
        };

        // let getObj = {
        //   modal: "Smartsite",
        //   url: url,
        //   condition: { is_del: false, siteKey: req.query.key },
        //   selectFields: [
        //     "key",
        //     "title",
        //     "status",
        //     "siteKey",
        //     "description"
        //   ],
        //   type: "findOne",
        // };

        let smartsiteInfo = await fetchRecords(getObj);

        console.log(smartsiteInfo, "smartsiteInfo>>>>");
        // console.log(getObj, "getObj>>>>");

        res.status(200).json({ success: true, smartsiteInfo: smartsiteInfo });
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
