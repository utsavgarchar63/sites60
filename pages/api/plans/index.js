import dbConnect from "../../../lib/dbConnect";
import { fetchRecords } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";
export const config = {
  api: { bodyParser: false },
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  if (token) {
    await dbConnect();
    const { method } = req;

    switch (method) {
      case "GET":
        try {
          let url = req.url;

          let getObj = {
            modal: "Product",
            url: url,
            type: "find",
            selectFields: [
              "name",
              "stripe_product_id",
              "description",
              "currency",
              "frequency",
              "price"
            ],
            condition: { is_active: true },
          };

          console.log(getObj, "getObj");

          let planInfo = await fetchRecords(getObj);

          console.log(planInfo , "<<<< planInfo");
          res.status(200).json({ success: true, data: planInfo });



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
