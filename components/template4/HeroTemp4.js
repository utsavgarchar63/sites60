import React from "react";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const HeroTemp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges } = props;
  function truncateText(text, maxLength) {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  }

  return (
    <div ref={ref} id={dataObj.key} className="group bg-white relative">
      <div className="bg-white h-full box-border">
        <div className="flex flex-col md:flex-row items-center h-full">
          <div className="md:w-1/2 w-screen lg:px-10 xl:px-20 xl:h-full border-r">
            <img
              src={dataObj.data.image}
              alt="Gallery Image"
              className="w-full sm:mt-20 sm:rounded-tr-lg sm:rounded-tl-lg h-72 lg:h-[600px] xl:h-[800px] object-center object-cover"
            />
          </div>

          <div className="md:w-1/2 h-1/2 sm:pt-16 sm:py-0 py-8 px-6 lg:px-10 xl:px-20 text-left">
            <h2 className="text-xl lg:text-2xl xl:text-5xl text-temp4text sm:text-left text-center leading-7 font-poppins font-semibold mb-4 sm:mb-8">
              {dataObj.data.title}
            </h2>
            <p className="text-custom-gray text-sm text-opacity-70 sm:text-lg sm:text-left text-center leading-5 sm:leading-7 font-poppins xl:mb-16">
              {truncateText(dataObj.data.subtitle, 60)}
            </p>
            <hr className="border-b border-opacity-60 my-4 xl:mb-20" />
            <h2 className="text-xl lg:text-2xl xl:text-5xl text-temp4text sm:text-left text-center leading-7 mb-4 sm:mb-8 font-poppins font-semibold">
              {dataObj.data.title}
            </h2>
            <p className="text-custom-gray text-sm text-opacity-70 sm:text-lg sm:text-left text-center leading-5 sm:leading-7 font-poppins sm:mb-16">
              {truncateText(dataObj.data.subtitle, 60)}
            </p>
          </div>
        </div>
      </div>
      {/* </div> */}

      {fromPage == "edit" && (
        <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
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
              saveChanges("edit", dataObj.key);
            }}
          >
            <PencilIcon className="w-5 h-5 mr-2 text-gray-100" />
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
            }}
          >
            <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
          </span>
        </div>
      )}
    </div>
  );
});

export default HeroTemp4;
