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
const images = [
  {
    imageSrc: "/yogatemp3/Group 197.png",
  },
];
const GalleryYoga = forwardRef((props, ref) => {
  const [count, setCount] = useState(1);
  let {
    fromPage,
    dataObj,
    saveChanges = () => {},
    themeColorPrimary, themeColorSecondary, themeColorTertiary,
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
              className={`group relative bg-${themeColorPrimary.name}-50 bg-cover object-cover w-full pt-6  sm:mb-0 pb-20 lg:pb-16 sm:pt-16 lg:h-[550px] h-full bg-opacity-100`}
              style={{ backgroundImage: `url('/yogatemp3/Group 238.png')` }}
            >
              <div className=" flex items-center justify-center">
                <div>
                  <h2
                    onClick={() => {
                      handleSaveChanges("edit", dataObj?.key, "heading");
                    }}
                    className={`${classNames(
                      `text-${themeColorSecondary.name}-800 mb-2 sm:text-center text-center sm:mb-6 leading-7 font-bold text-2xl text-opacity-95 sm:text-2xl sm:leading-1`,
                      fontFam?.name
                    )}`}
                  >
                    {dataObj?.data?.heading
                      ? dataObj?.data?.heading
                      : "Heading"}
                  </h2>
                  <p
                    className=" pb-6 sm:pb-14 flex items-center justify-center"
                    onClick={() => {
                      handleSaveChanges("edit", dataObj?.key, "subheading");
                    }}
                  >
                    <span
                      className={`text-${themeColorSecondary.name}-800 font-poppins font-bold text-xl text-center md:text-3xl lg:text-5xl text- flex items-center justify-center ${fontFam?.name}`}
                      
                    >
                      {dataObj?.data?.subHeading
                        ? dataObj?.data?.subHeading
                        : "SubHeading"}
                    </span>
                  </p>
                  {Array.isArray(dataObj?.data?.gallery) && (
                    <div
                      className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-20 sm:gap-8"
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
                          <div key={index} className={`relative`}>
                            {images.map((imageSrc, index) => (
                              <div key={index}>
                                <img
                                  src={imageSrc.imageSrc}
                                  className="absolute items-center sm:top-0 top-40 left-1/2 sm:transform -translate-x-1/2 -mt-10 sm:mt-24 w-12 h-12 object-cover rounded-lg"
                                />
                                <img
                                  src={item.image}
                                  alt={`Image ${index + 1}`}
                                  className={` w-[300px] h-[245px] object-cover rounded-lg shadow-md ${imageClass}`}
                                />
                              </div>
                            ))}
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
                      // saveChanges("add", dataObj?.key);
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
  return <>{renderComponents()}</>;
});

export default GalleryYoga;
