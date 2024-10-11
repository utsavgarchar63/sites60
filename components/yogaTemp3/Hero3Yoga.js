import React from "react";
import { GiMeditation } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";

import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useRef, useEffect, useState } from "react";
const Hero3Yoga = forwardRef((props, ref) => {
  const [count, setCount] = useState(1);

  let {
    fromPage,
    dataObj,
    saveChanges,
    themeColorPrimary,
    themeColorSecondary,
    themeColorTertiary,
    fontFam,
  } = props;
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>
          <div
            className="group relative bg-custom-tints bg-cover lg:bg-cover sm:object-center md:bg-contain bg-center bg-no-repeat sm:w-full pt-8 pb-20 sm:pt-20 h-[495px] lg:h-[700px] w-full sm:h-full bg-opacity-100"
            style={{ backgroundImage: `url('/yogatemp3/Rectangle 234.png')` }}
          >
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 py-8 sm:py-20 lg:h-[650px] sm:h-full"> */}
            <div className="container mx-auto flex flex-col items-center justify-center my-16">
              <div className="text-center">
                <h1
                  className={`text-xl sm:text-2xl text-opacity-90 font-bold ${fontFam?.name} text-${themeColorSecondary?.name}-900`}
                  onClick={() => {
                    saveChanges("edit", dataObj?.key, "heading", "title");
                  }}
                >
                  {dataObj?.data?.title ? dataObj?.data?.title : "Title"}
                </h1>
                <h2
                  className={`text-${themeColorSecondary?.name}-800 text-xl sm:text-text-4xl lg:text-5xl sm:px-0 px-4 lg:w-[800px] font-bold mb-10 lg:mb-20 ${fontFam?.name}`}
                  onClick={() => {
                    saveChanges("edit", dataObj?.key, "subheading", "subtitle");
                  }}
                >
                  {dataObj?.data?.subtitle
                    ? dataObj?.data?.subtitle
                    : "SubTitle"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 w-full px-4 sm:px-20 gap-4 justify-items-center">
                <div className="text-left sm:w-[400px] sm:pt-0 pt-9 flex flex-col items-center lg:items-start space-y-2 lg:space-y-6">
                  {/* <img
                    src="/yogatemp3/Group 187.png"
                    alt="Left Image"
                    className="lg:w-16 lg:h-16 md:w-12 md:h-12 w-10 h-10 rounded-md"
                  /> */}
                  <GiMeditation
                    className={`text-${themeColorSecondary?.name}-800 w-20 h-20`}
                  />

                  <h2
                    className={`text-${themeColorSecondary?.name}-800 text-sm md:text-lg lg:text-3xl font-bold ${fontFam?.name}`}
                    onClick={() => {
                      saveChanges("edit", dataObj?.key, "heading", "title2");
                    }}
                  >
                    {dataObj?.data?.title2 ? dataObj?.data?.title2 : "Title"}
                  </h2>
                  <h2
                    className={`text-${themeColorSecondary?.name}-800 text-sm md:text-md lg:text-lg font-medium text-opacity-80 ${fontFam?.name}`}
                    onClick={() => {
                      saveChanges(
                        "edit",
                        dataObj?.key,
                        "subheading",
                        "subtitle2"
                      );
                    }}
                  >
                    {dataObj?.data?.subtitle2
                      ? dataObj?.data?.subtitle2
                      : "SubTitle"}
                  </h2>
                </div>

                <div className="text-left sm:w-[400px] sm:pt-0 pt-9 flex flex-col items-center lg:items-end space-y-2 lg:space-y-6">
                  {/* <img
                    src="/yogatemp3/Group 194.png"
                    alt="Right Image"
                    className="lg:w-16 lg:h-16 md:w-12 md:h-12 w-10 h-10 rounded-md"
                  /> */}
                  <GrYoga
                    className={`text-${themeColorSecondary?.name}-800 w-20 h-20`}
                  />

                  <h2
                    className={`text-${themeColorSecondary?.name}-800 text-sm md:text-lg lg:text-3xl font-bold ${fontFam?.name}`}
                    onClick={() => {
                      saveChanges("edit", dataObj?.key, "heading", "title3");
                    }}
                  >
                    {dataObj?.data?.title3 ? dataObj?.data?.title3 : "Title"}
                  </h2>
                  <h2
                    className={`text-${themeColorSecondary?.name}-800 text-sm md:text-md lg:text-lg font-medium text-opacity-80 ${fontFam?.name}`}
                    onClick={() => {
                      saveChanges(
                        "edit",
                        dataObj?.key,
                        "subheading",
                        "subtitle3"
                      );
                    }}
                  >
                    {dataObj?.data?.subtitle3
                      ? dataObj?.data?.subtitle3
                      : "Subtitle"}
                  </h2>
                </div>
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
                    console.log("Count:", count);
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
                    saveChanges("delete", dataObj.key);
                    setCount(count - 1);
                  }}
                >
                  <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return components;
  };
  return <> {renderComponents()}</>;
});

export default Hero3Yoga;
