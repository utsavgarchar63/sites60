import dbConnect from "../../../lib/dbConnect";
import { updateRecord } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";

export const config = {
  api: { bodyParser: true },
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;

   if (token) {
    await dbConnect();

    const { method, body } = req;

    console.log(JSON.parse(body),"body");
    switch (method) {
      case "PUT":
        try {
          let url = req.url;

          let sections = JSON.parse(body)

          let updateFields = [
            { key: "sections", value: JSON.stringify( sections.sections) },

            { key: "updated_at", value: new Date() },
          ];

          let updateObj = {
            modal: "Smartsite",
            url: url,
            condition: { key: req.query.key },
            type: "findOne",
            updateFields: updateFields,
            selectFields: ["key"],
          };

          await updateRecord(updateObj);

          res.status(200).json({ success: true });

          let thumbnailUrl = "https://www.svgrepo.com/show/431189/pic.svg";

          // Website Screenshot

          if (process.env.NODE_ENV == "production") {
            let website = process.env.LIVE_URL + "/smartsite/" + req.body.key;
            thumbnailUrl = await takeScreenshot(website, filePath);
          }

          let updateFields2 = [
            { key: "thumbnail", value: thumbnailUrl },
            { key: "updated_at", value: new Date() },
          ];

          let updateObj2 = {
            modal: "Smartsite",
            url: url,
            condition: { key: req.body.key },
            type: "findOne",
            updateFields: updateFields2,
            selectFields: ["key"],
          };

          await updateRecord(updateObj2);
        } catch (error) {
          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }

        break;

      default:
        console.log("Hit default>>>");
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false, message: "Not Authorized" });
  }
}

function takeScreenshot(website, filePath) {
  return new Promise(async function (resolve, reject) {
    let hitUrl = `https://shot.screenshotapi.net/screenshot?token=B2AKV16-5S34C1W-MS2Q5X6-FF6M8FN&url=${website}&delay=5000`;

    try {
      const res = await fetch(hitUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      resolve(data.screenshot);
    } catch (error) {
      reject(error);
    }

    // var options = {
    //   // screenSize: {
    //   //   width: 480,
    //   //   height: 320,
    //   // },
    //   renderDelay: 30000
    // };

    // webshot(website, filePath, options, function (err) {
    //   if (err) {
    //     console.log("Error taking screenshot:", err);
    //     reject(err)
    //   } else {

    //     const futureDate = Date.now();
    //     const secondsUntilPromise = Math.floor(
    //       (futureDate - currentTime) / 1000
    //     );

    //     console.log(`Screenshot taken in ${secondsUntilPromise} seconds!`);

    //     fs.readFile(filePath, async (err, data) => {
    //       if (err) throw err;

    //       const imageBuffer = Buffer.from(data);

    //       const uuid = uuidv4();
    //       const fileName =
    //       momentTZ(new Date()).tz("Asia/Calcutta").format("HH-mm-ss") +
    //       "-" +
    //       uuid +
    //       ".png"

    //       console.log("File Name>>>>", fileName);

    //       let bucketName = "gs://" + process.env.GOOGLE_BUCKET;

    //       await uploadMedia(imageBuffer, bucketName, fileName);

    //       let urlBucketName = process.env.GOOGLE_BUCKET;

    //       let mediaUrl = `https://storage.googleapis.com/${urlBucketName}/${fileName}`;

    //       resolve(mediaUrl)

    //       // Remove local file
    //       fs.access(filePath, (err) => {
    //         if (err) {
    //           console.error('Error accessing file:', err);
    //           return;
    //         }

    //         // File exists, so we can delete it
    //         fs.unlink(filePath, (err) => {
    //           if (err) {
    //             console.error('Error deleting file:', err);
    //             return;
    //           }
    //           console.log('File deleted successfully!');
    //         });
    //       });

    //     });

    //   }
    // });
  });
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
