import React from "react";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useRef, useEffect, useState } from "react";
const Gallery2Yoga = forwardRef((props, ref) => {
  const [count, setCount] = useState(1);
  let {
    fromPage,
    dataObj,
    saveChanges = () => {},
    themeColor,  themeColorPrimary, themeColorSecondary, themeColorTertiary,
    fontFam,
  } = props;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSaveChanges = (action, key, type) => {
    if (typeof saveChanges === "function") {
      saveChanges(action, key, type);
    }
  };

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>
          <>
            <div
              className={`group relative pb-20 bg-${themeColorPrimary.name}-50 bg-cover object-cover object-center sm:w-full pt-8 sm:py-20 lg:h-[930px] sm:h-full bg-opacity-100`}
              style={{ backgroundImage: `url('/yogatemp3/Group 240.png')` }}
            >
              <div className="flex items-center justify-center">
                <div>
                  <h2
                    className={`${`text-${themeColorSecondary.name}-800 mb-4 sm:text-center text-center sm:mb-4 leading-7 font-bold text-2xl sm:text-2xl sm:leading-1 ${fontFam?.name}`}
                    )}`}
                    onClick={() =>
                      handleSaveChanges("edit", dataObj?.key, "heading")
                    }
                  >
                    {dataObj?.data?.heading
                      ? dataObj?.data?.heading
                      : "Heading"}
                  </h2>
                  <p
                    className={classNames(
                      "pb-8 sm:pb-16 text-xl flex items-center justify-center",
                      fontFam?.name
                    )}
                    onClick={() =>
                      handleSaveChanges("edit", dataObj?.key, "subheading")
                    }
                  >
                    <span
                      className={classNames(
                        "text-yogatext font-bold text-xl text-center sm:text-7xl lg:text-5xl flex items-center justify-center",
                        fontFam?.name
                      )}
                    >
                      {dataObj?.data?.subHeading
                        ? dataObj?.data?.subHeading
                        : "SubHeading"}
                    </span>
                  </p>
                  {Array.isArray(dataObj?.data?.gallery) && (
                    <div
                      className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3  sm:px-20 gap-8"
                      onClick={() => {
                        handleSaveChanges("edit", dataObj?.key, "carousel");
                      }}
                    >
                      {dataObj?.data?.gallery.slice(0, 3).map((item, index) => {
                        const row = Math.floor(index / 2) + 1;
                        const col = index % 3 === 0 ? 2 : 1;

                        const imageClass =
                          index === 0 ? "sm:w-screen" : "w-full sm:w-full";

                        return (
                          <div
                            key={index}
                            className={`bg-white rounded-bottom object-cover object-center sm:h-[600px]`}
                          >
                            <img
                              src={item.image}
                              alt={`Image ${index + 1}`}
                              className={`h-80 w-full sm:rounded-tl-md sm:rounded-tr-md sm:h-[420px] object-cover object-center shadow-md ${imageClass}`}
                            />
                            <div className="flex items-center p-4 sm:px-10 pt-4 sm:pt-8 gap-4">
                              <img
                                src="/yogatemp3/Group 187.png"
                                className="sm:w-12 sm:h-12 w-8 h-8"
                                alt="Your Image"
                              />
                              <h1
                                className={classNames(
                                  "text-left text-yogatext  font-semibold text-lg sm:text-24px",
                                  fontFam?.name
                                )}
                              >
                                {dataObj?.data?.heading
                                  ? dataObj?.data?.heading
                                  : ""}
                              </h1>
                            </div>

                            <p
                              className={classNames(
                                "bg-white sm:px-10  sm:p-0 px-4 sm:pt-0 text-left sm:text-left text-yogatext text-md sm:text-lg h-16 sm:h-20 rounded-bl-md rounded-br-md",
                                fontFam?.name
                              )}
                            >
                              {dataObj?.data?.subHeading
                                ? dataObj?.data?.subHeading
                                : "SubHeading"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              {fromPage == "edit" && (
                <div className="sm:absolute absolute-none right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("up", dataObj.key);
                    }}
                  >
                    <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("down", dataObj.key);
                    }}
                  >
                    <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      // saveChanges("add", dataObj?.key);/
                      setCount(count + 1);
                    }}
                  >
                    <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("generateai", dataObj.key, "hero");
                    }}
                  >
                    <ArrowPathIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>

                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      handleSaveChanges("delete", dataObj.key);
                      setCount(count - 1);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                </div>
              )}
            </div>
          </>
        </div>
      );
    }
    return components;
  };

  return <>{renderComponents}</>;
});

export default Gallery2Yoga;
