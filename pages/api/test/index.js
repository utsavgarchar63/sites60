import sendLeads from "../../../lib/sendLeads";


export default async function handler(req, res) {

  const { method } = req;

  switch (method) {
    case "GET":
      try {

       sendLeads(
         "Anirudh",
         "Maddy",
         "anirudh@videoform.com",
         "afwwefwe",
         "owner"
       );


        res.status(200).json({ success: true });
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
