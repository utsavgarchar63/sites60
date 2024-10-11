import Smartsite from "../../../models/Smartsite";

export default async function handler(req, res) {
  const { uniqueIdentifier } = req.query;

  try {
    const site = await Smartsite.findOne({ siteKey: uniqueIdentifier });

    if (site) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}
