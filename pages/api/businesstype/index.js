import dbConnect from "../../../lib/dbConnect";
import BusinessType from "../../../models/BusinessType";
export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { query, focus } = req.query;

  switch (method) {
    case "GET":
      try {
        const user_id = req.query.user_id;

        const { query, from } = req.query;

        let searchResults = [];
        if (from) {
          searchResults = await BusinessType.find({}, "name").limit(10).exec();
        } else {
          searchResults = await BusinessType.find(
            {
              name: {
                $regex: new RegExp(query, "i"),
              },
            },
            "name"
          )
            .sort({ name: 1 })
            .exec();
        }

        res.status(200).json({ success: true, data: searchResults });
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
