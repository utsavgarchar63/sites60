import dbConnect from "../../../lib/dbConnect";
import { fetchRecords, updateRecord } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";
import randomstring from "randomstring";
import Smartsite from "../../../models/Smartsite";
const secret = process.env.NEXTAUTH_SECRET;
import { featherIconsList } from "../../../lib/genericData";
import { EDITPAGE_COMPONENTS_CONFIG as componentData } from "../../../lib/componentConfig";
import { sectionsList } from "../../../lib/genericData";

const staticLogos = [
  "https://firebasestorage.googleapis.com/v0/b/anirudhtest-e263d.appspot.com/o/logo4.svg?alt=media&token=43c7ac5b-fd8c-4277-95d9-911a3d5aa252",
  "https://firebasestorage.googleapis.com/v0/b/anirudhtest-e263d.appspot.com/o/logo3.svg?alt=media&token=582e7464-7bf5-4415-976f-b829cd08c361",
  "https://firebasestorage.googleapis.com/v0/b/anirudhtest-e263d.appspot.com/o/logo1.svg?alt=media&token=c7a560bf-7d3e-480e-bc45-5ada6bfa557a",
  "https://firebasestorage.googleapis.com/v0/b/anirudhtest-e263d.appspot.com/o/logo2.svg?alt=media&token=be51eeda-df15-4fc6-a9ec-b74da6ea9b43",

  "https://app.sites60.com/whitelogo.png",
  "https://app.sites60.com/whitelogo.png",
];

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;

  function filterSectionById(sections, id) {
    return sections.find(section => section.id === id);
  }


  function filterSectionsByCategory(category) {
    const sections = sectionsList();

    const filteredSections = sections.filter(section => section.category === category);
    return filteredSections;
  }
  if (token) {
    await dbConnect();

    const { method } = req;

    switch (method) {
      case "GET":
        try {
          let url = req.url;
          const type = req.query.type;
          const uniqueIdentifier = req.query.siteKey;

          let bodyObj = {
            category: "",
            // templateId: "yoga",
            sections: []

          };

          let getObj = {
            modal: "User",
            url: url,
            type: "findById",
            selectFields: [
              "brand_name",
              "brand_category",
              "brand_pic",
              "belief",
            ],
            id: user_id,
          };

          let userInfo = await fetchRecords(getObj);

          if (userInfo.brand_category) {
            bodyObj.category = userInfo.brand_category;
          }

          // if (type == "section") {
          //   bodyObj["section"] = req.query.section;
          // }
          // let allSectionsList = sectionsList();
          const allSectionsList = filterSectionsByCategory(userInfo.brand_category);


          if (type == "section") {
            // bodyObj["section"] = [];
            const sectionIdToFind = req.query.section;
            let sectionsNew = allSectionsList[0].sections;
            const filteredSection = filterSectionById(sectionsNew, sectionIdToFind);
            // bodyObj.section.push(filteredSection);
            bodyObj.sections = filteredSection;


          }

          if (type == "allsections") {
            bodyObj["sections"] = allSectionsList[0].sections;
          }

          // if (userInfo.belief) {
          //   bodyObj["belief"] = userInfo.belief;
          // }

          // Fetch Data from API

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
          }

          console.log(JSON.stringify(totalInfo), "<<<TotalInfo ");

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
              if (sectionType.includes("header")) {
                let headerObj = componentData[sectionType];

                headerObj.data.logo = userInfo.brand_pic;
                headerObj.data.companyName = userInfo.brand_name;
                headerObj.section_id = iterator.componentId;
                headerObj.key = uniqueKey;

                finalArray.push(headerObj);
              } else if (sectionType.includes("footer")) {
                let footerObject = componentData[sectionType];

                footerObject.data.logo = userInfo.brand_pic;
                footerObject.data.company = userInfo.brand_name;
                footerObject.section_id = iterator.componentId;
                footerObject.key = uniqueKey;

                finalArray.push(footerObject);
              } else if (sectionType.includes("hero")) {
                let img = iterator.urls[0].regular;

                let heroObject = componentData[sectionType];

                heroObject.data.title = iterator.content.title || iterator.content[0]?.title || iterator.content.about[0]?.title,
                  heroObject.data.subtitle = iterator.content.description || iterator.content[0]?.description || iterator.content.subtitle || iterator.content[0]?.subtitle || iterator.content.about[0]?.subtitle,


                  heroObject.data.image = iterator.urls[0].regular;
                heroObject.section_id = iterator.componentId;
                heroObject.key = uniqueKey;


                finalArray.push(heroObject);
              } else if (sectionType.includes("gallery")) {
                let galleryObject = componentData[sectionType];
                console.log(galleryObject, "<< galleryObject before");
                console.log(sectionType, "<<   sectionType");

                galleryObject.section_id = iterator.componentId;
                galleryObject.key = uniqueKey;
                galleryObject.data.gallery = [];
                galleryObject.data.heading = "Checkout my products";
                galleryObject.data.subHeading = "Explore our curated collection";
                if (iterator.hasOwnProperty("urls")) {
                  for (const iterator2 of iterator.urls) {
                    galleryObject.data.gallery.push({
                      heading: "",
                      subHeading: "",
                      description: "",
                      image: iterator2.regular,
                    });
                  }
                }

                if (sectionType == "gallery3") {
                  for (const iterator2 of staticLogos) {
                    galleryObject.data.gallery.push({
                      heading: "",
                      subHeading: "",
                      description: "",
                      image: iterator2,
                    });
                  }
                }
                console.log(galleryObject, "<< galleryObject after");
                finalArray.push(galleryObject);
              } else if (sectionType.includes("testimonial")) {
                let testimonialObject = componentData[sectionType];
                testimonialObject.section_id = iterator.componentId;
                testimonialObject.key = uniqueKey;
                testimonialObject.data.testimonials = [];
                testimonialObject.data.title = iterator.content.title;
                testimonialObject.data.subtitle = iterator.content.title;

                // let testimonialObject = {
                //   data: {
                //     title: iterator.content.title,
                //     subtitle: iterator.content.title,
                //     testimonials: [],
                //   },
                //   section_id: iterator.componentId,
                //   key: uniqueKey,
                // };

                if (iterator.content.hasOwnProperty("items")) {
                  let index = 0;
                  for (const iterator2 of iterator.content.items) {
                    testimonialObject.data.testimonials.push({
                      name: iterator2.name,
                      designation: iterator2.designation,
                      content: iterator2.testimonial,
                      image: iterator.urls[index].regular,
                    });

                    index++;
                  }
                }

                finalArray.push(testimonialObject);
              } else if (sectionType.includes("contact")) {
                let contactObject = componentData[sectionType];
                contactObject.section_id = iterator.componentId;
                contactObject.key = uniqueKey;

                finalArray.push(contactObject);
              } else if (sectionType.includes("feature")) {
                let featureObject = componentData[sectionType];

                featureObject.section_id = iterator.componentId;
                featureObject.key = uniqueKey;
                featureObject.data.features = [];
                featureObject.data.title = iterator.content.title || iterator.content?.Features?.title;
                featureObject.data.subtitle = iterator.content.subtitle || iterator.content?.Features?.subtitle;
                // let featureObject = {
                //   data: {
                //     title: iterator.content.title,
                //     subtitle: iterator.content.subtitle,
                //     features: [],
                //   },
                //   section_id: iterator.componentId,
                //   key: uniqueKey,
                // };

                if (iterator.content.hasOwnProperty("items")) {
                  for (const iterator2 of iterator.content.items) {
                    featureObject.data.features.push({
                      title: iterator2.title,
                      description: iterator2.description,
                      icon: getRandomIcon(),
                    });
                  }
                }

                finalArray.push(featureObject);
              }
            }

            Smartsite.findOne({ siteKey: uniqueIdentifier }).exec(function (
              err,
              result
            ) {
              if (err) {
                console.log(err);
                res.status(500).json({ success: false });
              } else {
                if (result) {
                  result.sections = JSON.stringify(finalArray);
                  result.save(function (err1, updatedResult) {
                    if (err1) {
                      console.log(err1);
                      res.status(500).json({ success: false });
                    } else {
                      res.status(200).json({
                        success: true,
                        message: "Content regenerated successfully",
                      });
                    }
                  });
                } else {
                  res.status(500).json({ success: false });
                }
              }
            });

            try {
              saveScreeShot(uniqueIdentifier);
            } catch (error) {
              console.log("Saving Failed Smartsite>>>", error);
              res.status(500).json({ success: false });
            }
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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
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
