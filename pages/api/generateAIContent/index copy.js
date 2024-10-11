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
            templateId: "yoga",
          };

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
            ],
            id: user_id,
          };

          let userInfo = await fetchRecords(getObj);

          if (userInfo.brand_category) {
            bodyObj.category = userInfo.brand_category;
          }

          if (type == "section") {
            bodyObj["section"] = req.query.section;
          }

          if (userInfo.belief) {
            bodyObj["belief"] = userInfo.belief;
          }

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

            let components = await loadTemplateComponents(
              userInfo.brand_category,
              userInfo.brand_other
            );

            for (const iterator of totalInfo.data.sections) {
              // Genrate Random Key for Section
              let uniqueKey = randomstring.generate({
                length: 12,
                charset: "alphanumeric",
              });

              // let sectionType = componentName;
              let sectionType = iterator.componentId;

              const removeTemp1Suffix = (name) => name.replace(/Temp1$/, "");

              let sectionTypeCompare = await removeTemp1Suffix(sectionType);

              const isPresent1 = components.hasOwnProperty(
                sectionTypeCompare.toLowerCase()
              );

              console.log(isPresent1, "<< isPresent1");
              if (isPresent1) {
                let comp = components[sectionTypeCompare.toLowerCase()];
                const componentName = makeFirstLetterLowerCase(comp);

                if (sectionType.toLowerCase().includes("header")) {
                  let headerObj = {
                    data: {
                      logo: userInfo.brand_pic,
                      companyName: userInfo.brand_name,
                      btn1_text: "Button 1",
                      btn1_link: "https://sites60.com",
                      btn1_show: false,
                      btn2_text: "Button 2",
                      btn2_link: "https://sites60.com",
                      btn2_show: false,
                      navigation: [
                        {
                          name: "About",
                          href: "none",
                        },
                        {
                          name: "Features",
                          href: "none",
                        },
                        {
                          name: "Testimonials",
                          href: "none",
                        },
                      ],
                    },
                    section_id: componentName,
                    // section_id: iterator.componentId,
                    key: uniqueKey,
                  };

                  finalArray.push(headerObj);
                } else if (sectionType.toLowerCase().includes("footer")) {
                  let footerObject = {
                    data: {
                      logo: userInfo.brand_pic,
                      company: userInfo.brand_name,
                      tagline: "Your awesome tagline",
                      navigation: [
                        {
                          name: "About",
                          href: "https://sites60.com",
                        },
                        {
                          name: "Features",
                          href: "https://sites60.com",
                        },
                        {
                          name: "Testimonials",
                          href: "https://sites60.com",
                        },
                      ],
                      social: [
                        {
                          name: "Facebook",
                          href: "https://sites60.com",
                          icon: "https://www.svgrepo.com/show/330401/facebook.svg",
                        },
                        {
                          name: "Instagram",
                          href: "https://sites60.com",
                          icon: "https://www.svgrepo.com/show/333552/instagram.svg",
                        },
                        {
                          name: "Twitter",
                          href: "https://sites60.com",
                          icon: "https://www.svgrepo.com/show/349909/twitter.svg",
                        },
                        {
                          name: "LinkedIn",
                          href: "https://sites60.com",
                          icon: "https://www.svgrepo.com/show/144550/linkedin.svg",
                        },
                        {
                          name: "Pinterest",
                          href: "https://sites60.com",
                          icon: "https://www.svgrepo.com/show/119056/pinterest.svg",
                        },
                      ],
                    },
                    section_id: componentName,
                    // section_id: iterator.componentId,
                    key: uniqueKey,
                  };

                  finalArray.push(footerObject);
                } else if (sectionType.toLowerCase().includes("hero")) {
                  let img = iterator.urls[0].regular;

                  let heroObject = {
                    data: {
                      title: iterator.content.title,
                      subtitle: iterator.content.description
                        ? iterator.content.description
                        : iterator.content.subtitle,
                      image: iterator.urls[0].regular,
                    },
                    section_id: componentName,
                    // section_id: iterator.componentId,
                    key: uniqueKey,
                  };

                  finalArray.push(heroObject);
                } else if (sectionType.toLowerCase().includes("gallery")) {
                  let galleryObject = {
                    data: {
                      heading: "Checkout my products",
                      subHeading: "",
                      gallery: [],
                    },
                    section_id: componentName,
                    // section_id: iterator.componentId,
                    key: uniqueKey,
                  };

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

                  finalArray.push(galleryObject);
                } else if (sectionType.toLowerCase().includes("testimonial")) {
                  let testimonialObject = {
                    data: {
                      title: iterator.content.title,
                      subtitle: iterator.content.subtitle,
                      testimonials: [],
                    },
                    section_id: componentName,
                    // section_id: iterator.componentId,
                    key: uniqueKey,
                  };

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
                } else if (sectionType.toLowerCase().includes("contact")) {
                  let contactObject = {
                    data: {
                      heading: "Get in touch",
                      subHeading:
                        "Fill the below fields so that I can understand your needs better",
                      image:
                        "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/hero-image-1.png",
                      name_show: true,
                      email_show: true,
                      phone_show: true,
                      message_show: true,
                      buttonText: "Submit",
                    },
                    section_id: componentName,
                    // section_id: iterator.componentId,
                    key: uniqueKey,
                  };

                  finalArray.push(contactObject);
                } else if (sectionType.toLowerCase().includes("feature")) {
                  let featureObject = {
                    data: {
                      title: iterator.content.title,
                      subtitle: iterator.content.subtitle,
                      features: [],
                    },
                    section_id: componentName,
                    // section_id: iterator.componentId,
                    key: uniqueKey,
                  };

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
            }

            // Create Smartsitehttps://app.sites60.com/edit-smartsite/WtfL3Mc3i0kMhttps://app.sites60.com/edit-smartsite/WtfL3Mc3i0kM

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

            if (freeSites.length > 1) {
              res.status(501).json({
                status: 501,
                success: false,
                message:
                  "You've reached the limit for free sites. Only one free site is allowed per account",
              });
              return;
            }

            console.log(finalArray, "< finalArray");

            let smartsiteObj = new Smartsite({
              user_id: user_id,
              title: `${userInfo.brand_name} Website`,
              color: JSON.stringify(
                "{name: 'indigo', bgColor: 'bg-indigo-500', selectedColor: 'ring-indigo-500'}"
              ),
              company: userInfo.brand_name || "",
              category: userInfo.brand_category || "",
              siteKey: uniqueIdentifier || uniqueKey,
              key: uniqueKey,
              sections: JSON.stringify(finalArray),
              created_at: new Date(),
              updated_at: new Date(),
            });

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

