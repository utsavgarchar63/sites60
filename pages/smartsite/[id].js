import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { MixpanelEvent } from "../../lib/trackEventFrontend";

const Viewer = () => {
  const iframeRef = useRef(null);
  const [content, setContentState] = useState(`
    <!-- Initial content -->
  `);

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favicon, setFavicon] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState("");
  const [selectedTertiaryColor, setSelectedTertiaryColor] = useState("");
  const [siteId, setSiteId] = useState("");
  const [siteKey, setSiteKey] = useState("");
  const [backUrl, setBackUrl] = useState("");
  // const [selectedFont, setSelectedFont] = useState(siteFonts[0]);

  useEffect(() => {
    if (router) {
      if (router.query.hasOwnProperty("preview")) {
        setShowPreview(true);
      }
      if (router.query.hasOwnProperty("id")) {
        let key = router.query.id;
        setBackUrl("/edit-smartsite/" + key);
        getInfo(key);
      }
    }
  }, [router]);

  // useEffect(() => {
  //   const savedContent = localStorage.getItem("websiteContent");
  //   if (savedContent) {
  //     setContentState(savedContent);
  //   }
  //   updateContentInIframe(content);
  // }, []);

  // useEffect(() => {
  //   updateContentInIframe(content);
  // }, [content]);

  const trackInfo = async (id, type) => {
    const res = await fetch("/api/track", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        type: type,
      }),
    });
  };

  const getInfo = async (key) => {
    const res = await fetch("/api/getSmartsiteInfo?key=" + key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data, "<< smartsite data get info");

    if (data.smartsiteInfo?._id) {
      let isPreview = false;
      if (router.query.hasOwnProperty("preview")) {
        isPreview = true;
      }

      //error
      if (isPreview == false) {
        if (data.smartsiteInfo.hasOwnProperty("is_paid")) {
          const today = new Date();
          const trialExpiresDate = new Date(data.smartsiteInfo.trial_expires);

          if (trialExpiresDate < today && data.smartsiteInfo.is_paid == false) {
            router.push("/make-payment");
          }
        } else {
          router.push("/make-payment");
        }
      }
      // setSiteKey(data.smartsiteInfo.key);
      // setSiteId(data.smartsiteInfo._id);
      // trackInfo(data.smartsiteInfo._id, "views");

      // Track Event

      let properties = {
        site_id: data.smartsiteInfo.key,
        created_time: new Date(),
      };

      MixpanelEvent?.track("Site Viewed", properties);
    }

    // if (data.smartsiteInfo.font) {
    //   var index = siteFonts.findIndex(
    //     (obj) => obj.name == data.smartsiteInfo.font
    //   );
    //   setSelectedFont(siteFonts[index]);
    // }

    if (data.smartsiteInfo.siteKey) {
      generateAIContent(data.smartsiteInfo.siteKey);
    }

    console.log(data.smartsiteInfo, "smart site info!!");

    // if (data.smartsiteInfo.primaryColor) {
    //   let index = themeColor.findIndex(
    //     (x) => x.name == data.smartsiteInfo.primaryColor
    //   );
    //   if (index != -1) {
    //     setSelectedColor(themeColor[index]);
    //   }
    // }

    console.log(data.smartsiteInfo, "data smartsite info");
    // if (data.smartsiteInfo.secondaryColor) {
    //   let index = themeColor.findIndex(
    //     (x) => x.name == data.smartsiteInfo.secondaryColor
    //   );
    //   if (index != -1) {
    //     setSelectedSecondaryColor(themeColor[index]);
    //   }
    // }

    // if (data.smartsiteInfo.tertiaryColor) {
    //   let index = themeColor.findIndex(
    //     (x) => x.name == data.smartsiteInfo.tertiaryColor
    //   );
    //   if (index != -1) {
    //     setSelectedTertiaryColor(themeColor[index]);
    //   }
    // }
    if (data.smartsiteInfo?.sections) {
      let newObj = JSON.parse(data.smartsiteInfo.sections);
      setSections(newObj);

      setTitle(data.smartsiteInfo.title);
      setDescription(data.smartsiteInfo.description);

      // if (data.smartsiteInfo.color) {
      //   let newObj2 = JSON.parse(
      //     JSON.stringify(data.smartsiteInfo.primaryColor)
      //   );
      //   let newObj3 = JSON.parse(
      //     JSON.stringify(data.smartsiteInfo.secondaryColor)
      //   );
      //   let newObj4 = JSON.parse(
      //     JSON.stringify(data.smartsiteInfo.tertiaryColor)
      //   );
      //   let color = JSON.parse(newObj2).name;
      //   let color2 = JSON.parse(newObj3).name;
      //   let color3 = JSON.parse(newObj4).name;
      //   let index2 = themeColor.findIndex((x) => x.name == color);
      //   let index3 = themeColor.findIndex((x) => x.name == color2);
      //   let index4 = themeColor.findIndex((x) => x.name == color3);
      //   if (index2 != -1) {
      //     setSelectedColor(themeColor[index2]);
      //   }
      //   if (index3 != -1) {
      //     setSelectedSecondaryColor(themeColor[index3]);
      //   }
      //   if (index4 != -1) {
      //     setSelectedTertiaryColor(themeColor[index4]);
      //   }
      // }
      setFavicon(data.smartsiteInfo.favicon);
    }
  };

  async function generateAIContent(siteKey) {
    // setAiLoader(true);

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, 120000)
    );

    try {
      const res = await Promise.race([
        fetch(`/api/generateAIContent?siteKey=${siteKey}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        timeoutPromise, // Reject the promise if the timeout is reached
      ]);

      // Check if the promise resolved due to timeout
      if (!res) {
        setAiLoader(false);
        setLoading(false);
        setErrMessage("All our servers are busy. Please try after sometime.");
        return;
      }

      const aiData = await res.json();

      setContentState(aiData.data.template_html);
      updateContentInIframe(aiData.data.template_html);
      console.log(aiData.data.template_html, "aiData.data.template_html");
      // setSiteKey(aiData.siteKey);
      // }
    } catch (error2) {
      // setAiLoader(false);
      // setLoading(false);
      // setErrMessage("All our servers are busy. Please try after sometime.");
    }
  }

  const updateContentInIframe = (html) => {
    const iframeDocument =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;

    iframeDocument.open();
    iframeDocument.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Viewer Content</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  margin: 0;
              }
              section {
                  min-height: 200px;
                  position: relative;
                  background-size: cover;
                  background-position: center;
              }
              section img {
                  max-width: 100%;
                  width: auto;
                  height: auto;
                  display: block;
                  margin: 0 auto;
              }
          </style>
      </head>
      <body>${html}</body>
      </html>
    `);
    iframeDocument.close();
  };

  const handleGoBackToEditor = () => {
    // Save the current content to local storage before navigating back
    localStorage.setItem("websiteContent", content);
    router.push(backUrl);
  };

  return (
    <div className="viewer">
      {showPreview && (
        <div className="flex items-center gap-x-6 bg-gray-900 py-2.5 px-6 sm:px-3.5 sm:before:flex-1">
          <p className="text-sm leading-6 text-white">
            <strong className="font-semibold">You are in Preview Mode</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            <button
              onClick={handleGoBackToEditor}
              className="text-blue-400 hover:text-blue-600"
            >
              Go Back to Editor&nbsp;<span aria-hidden="true">&rarr;</span>
            </button>
          </p>
          <div className="flex flex-1 justify-end">
            <button onClick={() => setShowPreview(false)} type="button">
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      <iframe ref={iframeRef} className="w-full h-screen"></iframe>
    </div>
  );
};

export default Viewer;
