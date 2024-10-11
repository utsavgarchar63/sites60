import dbConnect from "../../../lib/dbConnect";
import { updateRecord, fetchRecords } from "../../../lib/genericController";
import Track from "../../../models/Track";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        let url = req.url;

        let id = req.body.id;

        let trackObj = {
          modal: "Track",
          url: url,
          type: "find",
          condition: { smartsite_id: id },
          selectFields: ["smartsite_id", "views", "clicks"],
        };

        let trackDetails = await fetchRecords(trackObj);

        if (trackDetails.length == 0) {
          let tObj = new Track({
            smartsite_id: id,
            views: [
              {
                count: 1,
                date: new Date(),
              },
            ],
          });

          tObj.save(async function (err) {
            if (err) {
              console.log("Error>>>", err);
              res.status(400).json({ success: false });
            } else {
              res.status(200).json({ success: true });
            }
          });
        } else {
          let type = req.body.type;

          // console.log("trackDetails>>>>", trackDetails);

          let viewArray = [];
          let clickArray = [];

          if (trackDetails[0].clicks)
          {
            clickArray = trackDetails[0].clicks;
          }

          if (trackDetails[0].views)
          {
            viewArray = trackDetails[0].views;
          }

          if (type == "views") {
            viewArray.push({
              count: 1,
              date: new Date(),
            });
          }
          else if (type == "clicks") {
            clickArray.push({
              count: 1,
              date: new Date(),
            });
          }

          let updateFields = [
            { key: "views", value: viewArray },
            { key: "clicks", value: clickArray },
          ];

          let updateObj = {
            modal: "Track",
            url: url,
            type: "findById",
            id: trackDetails[0]._id,
            updateFields: updateFields,
            selectFields: ["smartsite_id"],
          };

          await updateRecord(updateObj);

          res.status(200).json({ success: true });
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


