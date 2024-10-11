import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Test2 from "./Test2";
import confetti from "canvas-confetti";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function DummyWebsite({
  msg,
  siteId,
  aiLoader,
  UpdatedHtmlKey,
  updatedTemplatehtml,
}) {
  const router = useRouter();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [siteKey, setSiteKey] = useState(null);

  useEffect(() => {
    if (siteId) {
      setSiteKey(siteId);
    }
  }, [siteId]);

  useEffect(() => {
    if (siteKey) {
      const counterElement = document.querySelector(".counter");
      counterElement.classList.add("paused");
      counterElement.style.display = "none";

      // Trigger confetti when the site is ready
      confetti({
        particleCount: 100,
        spread: 160,
        zIndex: 1000,
      });
    }
  }, [siteKey]);

  const goToSite = () => {
    // Save HTML content to localStorage
    localStorage.setItem("websiteContent", updatedTemplatehtml);

    // Trigger confetti on button click
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });

    // Navigate to the preview page
    router.push(`/smartsite/${siteKey}?preview=true`);
  };

  let loaderMsgs = [
    { id: "header6", msgLabel: "Setting up your website: Please wait..." },
    {
      id: "hero13",
      msgLabel: "Fetching content from reliable sources: Almost there!",
    },
    {
      id: "testimonial5",
      msgLabel: "Generating web layout: Sit tight, it won't be long!",
    },
    {
      id: "feature10",
      msgLabel: "Optimizing images for your website: Just a few more seconds!",
    },
    {
      id: "hero14",
      msgLabel:
        "Customizing design elements: Hang in there, we're making progress!",
    },
    {
      id: "gallery2",
      msgLabel: "Compiling your website: We're almost ready to launch!",
    },
    {
      id: "testimonial6",
      msgLabel: "Finalizing details: Your website is just a few moments away!",
    },
    {
      id: "gallery3",
      msgLabel:
        "Polishing up the finishing touches: Your website is looking great!",
    },
    {
      id: "contact2",
      msgLabel: "Preparing for launch: We appreciate your patience!",
    },
    { id: "header6", msgLabel: "Setting up your website: Please wait..." },
    {
      id: "hero13",
      msgLabel: "Fetching content from reliable sources: Almost there!",
    },
    {
      id: "testimonial5",
      msgLabel: "Generating web layout: Sit tight, it won't be long!",
    },
    {
      id: "feature10",
      msgLabel: "Optimizing images for your website: Just a few more seconds!",
    },
    {
      id: "hero14",
      msgLabel:
        "Customizing design elements: Hang in there, we're making progress!",
    },
    {
      id: "gallery2",
      msgLabel: "Compiling your website: We're almost ready to launch!",
    },
    {
      id: "testimonial6",
      msgLabel: "Finalizing details: Your website is just a few moments away!",
    },
    {
      id: "gallery3",
      msgLabel:
        "Polishing up the finishing touches: Your website is looking great!",
    },
    {
      id: "contact2",
      msgLabel: "Preparing for launch: We appreciate your patience!",
    },
    { id: "footer", msgLabel: "Generating Your Website, Hang Tight......" },
    { id: "loading", msgLabel: "Generating Your Website, Hang Tight......" },
  ];

  let loaderMsgIndex = 0;

  useEffect(() => {
    let intervalId;

    if (siteKey == null) {
      intervalId = setInterval(getLoaderMessage, 3500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [siteKey]);

  function getLoaderMessage() {
    let msg = loaderMsgs[loaderMsgIndex];

    if (loaderMsgIndex < loaderMsgs.length) {
      setLoadingMessage(msg);
    }

    loaderMsgIndex = loaderMsgIndex + 1;
  }

  return (
    <>
      <div>
        <Test2 loadingDivVal={loadingMessage.id} />
      </div>
      <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-md dark:bg-black/60 opacity-100">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            {/* 60seconds code START */}
            <div className="container-seconds absolute right-3 top-3">
              <section className="counter border border-gray-300 rounded-full"></section>
            </div>
            {/* 60seconds code END */}
            <div>
              <div className="mt-3 text-center sm:mt-5">
                {siteKey == null && (
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    <div className="mx-auto flex items-center justify-center mb-4">
                      <div className="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    {loadingMessage.msgLabel}
                  </h3>
                )}
                {siteKey && (
                  <h3
                    className="text-xl font-bold text-gray-700 space-y-2"
                    id="modal-title"
                  >
                    <p className="text-2xl text-orange-500">Congratulations!</p>
                    <p>Your website is ready to go! 🎉</p>
                    <div className="text-left pl-20 font-normal text-xs space-y-2">
                      <span>
                        Also, you can customize your website anytime to :
                      </span>
                      <li>Edit Content</li>
                      <li>Replace Images</li>
                      <li>Add more sections</li>
                      <li>Generate content using AI</li>
                      <li>Domain Name Linking</li>
                    </div>
                  </h3>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid flex justify-center px-2 mx-auto">
              {siteKey && (
                <>
                  <button
                    onClick={goToSite}
                    type="button"
                    className="inline-flex w-full justify-center rounded-sm bg-gray-700 px-3 py-3 text-md font-normal text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:col-start-2"
                  >
                    View Your Website{" "}
                    <ArrowRightIcon className="w-5 h-5 text-white ml-2 pt-1" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
