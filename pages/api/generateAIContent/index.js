import dbConnect from "../../../lib/dbConnect";
import { fetchRecords, updateRecord } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";
import randomstring from "randomstring";
import Smartsite from "../../../models/Smartsite";
import AiLog from "../../../models/AiLog";
import { MixpanelEvent } from "../../../lib/trackEventBackend";
const secret = process.env.NEXTAUTH_SECRET;
import { featherIconsList } from "../../../lib/genericData";
import { componentCategoryList } from "../../../lib/genericData";
import { sectionsList } from "../../../lib/genericData";
import { templateslist } from "../../../lib/templatehtml";

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;
  function filterSectionById(sections, id) {
    return sections.find((section) => section.id === id);
  }

  function filterSectionsByCategory(category) {
    console.log(category, "category");
    const sections = templateslist();

    // const sections = sectionsList();

    const filteredSections = sections.filter(
      (section) => section.category === category
    );
    console.log(filteredSections, "filteredSections>>>>");

    return filteredSections;
  }

  if (token) {
    await dbConnect();

    const { method } = req;

    switch (method) {
      case "POST":
        try {
          // const { template_html } = req.query;

          const { template_html, templateThumbnail } = req.body;
          console.log(req.body, "req.body>>>");
          const { siteKey, temp, type } = req.query;

          console.log(templateThumbnail, "templateThumbnail>>");

          let url = req.url;
          // const type = req.query.type;
          const uniqueIdentifier = siteKey;
          const tempId = temp;
          // const html_template = req.query.html_template;

          let bodyObj = {
            category: "",
            // templateId: "yoga",
            sections: [],
          };

          // if (req?.query?.templateId) {
          //   bodyObj["templateId"] = req?.query?.templateId;
          // }

          let getObj = {
            modal: "User",
            url: url,
            type: "findById",
            selectFields: [
              "brand_name",
              "brand_category",
              "brand_other",
              "brand_pic",
              "belief",
              "html",
            ],
            id: user_id,
          };

          let userInfo = await fetchRecords(getObj);
          console.log(userInfo, "userInfo>>");

          if (userInfo.brand_category) {
            bodyObj.category = userInfo.brand_category;
          }
          // const allSectionsList = filterSectionsByCategory(tempId);

          if (type == "section") {
            // bodyObj["section"] = [];

            const sectionIdToFind = req.query.section;
          }

          let aiData = undefined;
          let totalInfo = undefined;

          if (type != "section") {
            let hitURL =
              "https://asia-east2-eqrt-network.cloudfunctions.net/chatGPT/generate-content/template";

            aiData = await fetch(hitURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer d0c9c583-023d-49ae-bcae-d19292d30f72",
              },
              body: JSON.stringify(bodyObj),
            });

            totalInfo = await aiData.json();
          } else {
            let hitURL =
              "https://asia-east2-eqrt-network.cloudfunctions.net/chatGPT/generate-content";

            aiData = await fetch(hitURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer d0c9c583-023d-49ae-bcae-d19292d30f72",
              },
              body: JSON.stringify(bodyObj),
            });

            totalInfo = await aiData.json();
          }

          const iconsList = featherIconsList();
          function getRandomIcon() {
            const randomIndex = Math.floor(Math.random() * iconsList.length);

            return iconsList[randomIndex].icon;
          }

          if (type != "section") {
            let finalArray = [];

            for (const iterator of totalInfo.data.sections) {
              // Genrate Random Key for Section
              let uniqueKey = randomstring.generate({
                length: 12,
                charset: "alphanumeric",
              });

              let sectionType = iterator.componentId;
            }

            let uniqueKey = randomstring.generate({
              length: 12,
              charset: "alphanumeric",
            });

            let freeSites = [];

            freeSites = await fetchRecords({
              modal: "Smartsite",
              url: "url",
              type: "find",
              selectFields: ["user_id", "is_paid"],
              condition: { user_id: user_id, is_paid: false, is_del: false },
            });
            console.log(freeSites, "freeSites>>>");

            if (freeSites.length > 1) {
              res.status(501).json({
                status: 501,
                success: false,
                message:
                  "You've reached the limit for free sites. Only one free site is allowed per account",
              });
              return;
            }

            let smartsiteObj = new Smartsite({
              user_id: user_id,
              title: `${userInfo.brand_name} Website`,
              color: JSON.stringify(
                "{name: 'indigo', bgColor: 'bg-indigo-500', selectedColor: 'ring-indigo-500'}"
              ),
              // primaryColor: allSectionsList[0].primaryColor,
              // secondaryColor: allSectionsList[0].secondaryColor,
              // tertiaryColor: allSectionsList[0].tertiaryColor,
              template_html: template_html,
              thumbnail: templateThumbnail,
              company: userInfo.brand_name || "",
              category: temp || "",
              siteKey: siteKey || "",
              key: uniqueKey,
              sections: JSON.stringify(finalArray),
              created_at: new Date(),
              updated_at: new Date(),
            });

            console.log(smartsiteObj, "smartsiteObj>>");
            const timeTaken =
              totalInfo.data.timeLog.endTime - totalInfo.data.timeLog.startTime;

            let timeInfo;
            if (timeTaken < 60000) {
              const seconds = Math.floor(timeTaken / 1000);
              timeInfo = `Time taken: ${seconds} seconds`;
            } else {
              const minutes = Math.floor(timeTaken / 60000);
              timeInfo = `Time taken: ${minutes} seconds`;
            }

            let aiObj = new AiLog({
              user_id: user_id,
              website_key: uniqueKey,
              timeTaken: timeInfo,
              timeLog: totalInfo.data.timeLog,
              created_at: new Date(),
              updated_at: new Date(),
            });

            try {
              saveScreeShot(uniqueIdentifier);
            } catch (error) {
              console.log("Saving Failed Smartsite>>>", error);
              res.status(500).json({ success: false });
            }

            try {
              aiObj.save(async function (err, result) {
                if (err) {
                  console.log(err, "ai logs failed");
                } else {
                  console.log("Ai logs created");
                }
              });
            } catch (error) {
              console.log("ai logs failed");
            }

            smartsiteObj.save(async function (err, result) {
              if (err) {
                console.log("Saving Failed Smartsite>>>", err);
                res.status(500).json({ success: false, message: err });
              } else {
                console.log("Saved Smartsite>>>");
                res.status(200).json({
                  success: true,
                  key: uniqueKey,
                  siteKey: uniqueIdentifier,
                });

                // Track Event
                let properties = {
                  type: "new",
                  site_id: result.key,
                  user_id: user_id,
                  created_time: new Date(),
                };

                MixpanelEvent.track("Site Created", properties);
              }
            });
          } else if (totalInfo.result != "ERROR" && type == "section") {
            res.status(200).json({ success: true, data: totalInfo.data });
          } else {
            res.status(500).json({ success: false });
          }
        } catch (error) {
          console.log("Error>>>>", error);
          res.status(400).json({ success: false, message: error });
        }

        break;

      case "GET":
        try {
          const { siteKey } = req.query;

          // Retrieve smartsite by siteKey
          const smartsite = await fetchRecords({
            modal: "Smartsite",
            url: "url",
            type: "findOne",
            condition: { siteKey },
            selectFields: ["title", "template_html", "category", "key"],
          });

          if (!smartsite) {
            return res.status(404).json({
              success: false,
              message: "Smartsite not found",
            });
          }

          // Return the smartsite details
          res.status(200).json({
            success: true,
            data: smartsite,
          });
        } catch (error) {
          console.log("Error in GET request:", error);
          res.status(500).json({
            success: false,
            message: "Server Error",
          });
        }
        break;

      case "PUT":
        try {
          const { siteKey } = req.query;
          const { template_html } = req.body;

          if (!siteKey) {
            return res
              .status(400)
              .json({ success: false, message: "siteKey is required" });
          }

          const updateData = {};
          if (template_html) updateData.template_html = template_html;

          const updatedSmartsite = await Smartsite.findOneAndUpdate(
            { siteKey, user_id },
            { $set: updateData },
            { new: true }
          );

          if (!updatedSmartsite) {
            return res
              .status(404)
              .json({ success: false, message: "Smartsite not found" });
          }

          res.status(200).json({ success: true, data: updatedSmartsite });
        } catch (error) {
          console.error("PUT Error>>>>", error);
          res.status(500).json({ success: false, message: error });
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

async function loadTemplateComponents(brand, otherCategory) {
  if (otherCategory.toLowerCase().includes("yoga")) {
    brand = "yoga";
  }
  if (otherCategory.toLowerCase().includes("insurance")) {
    brand = "insurance";
  }
  if (otherCategory.toLowerCase().includes("portfolio")) {
    brand = "portfolio";
  }

  const categoryList = componentCategoryList();
  const result = {};

  const brandCategory = categoryList.find(
    (category) => category.identifier === brand
  );

  if (!brandCategory) {
    console.error(`Brand '${brand}' not found in componentCategoryList.`);
    return null;
  }

  // Pick a random template from the templates array
  const randomTemplate =
    brandCategory.templates[
      Math.floor(Math.random() * brandCategory.templates.length)
    ];

  randomTemplate.componentMapping &&
    Object.keys(randomTemplate.componentMapping).forEach((type) => {
      const componentNames = randomTemplate.componentMapping[type];

      let randomComponentName = "";
      if (componentNames) {
        randomComponentName =
          componentNames[Math.floor(Math.random() * componentNames.length)];
      }

      result[type] = randomComponentName;
    });

  return result;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function makeFirstLetterLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

async function saveScreeShot(key) {
  let thumbnailUrl = "https://www.svgrepo.com/show/431189/pic.svg";

  // Website Screenshot

  if (process.env.NODE_ENV == "production") {
    let website = process.env.LIVE_URL + "/smartsite/" + key + "?preview=true";

    let hitUrl = `https://shot.screenshotapi.net/screenshot?token=B2AKV16-5S34C1W-MS2Q5X6-FF6M8FN&url=${website}&delay=5000`;

    try {
      const res = await fetch(hitUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      let updateFields2 = [
        { key: "thumbnail", value: data.screenshot },
        { key: "updated_at", value: new Date() },
      ];

      let updateObj2 = {
        modal: "Smartsite",
        url: "saveScreeShot",
        condition: { siteKey: key },
        type: "findOne",
        updateFields: updateFields2,
        selectFields: ["key"],
      };
      await updateRecord(updateObj2);
    } catch (error) {
      console.log(error, "<<error");
    }
  }
}
