import React from "react";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Styles } from "@hubspot/api-client/lib/codegen/cms/blogs/blog_posts";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hero1Temp5 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;
  return (
    <div ref={ref} id={dataObj.key} className={`group px-4 sm:px-0`}>
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative overflow-auto "
        )}
      >
        <div className="flex flex-col lg:flex-row font-Poppins">
          <div className="w-full xl:w-1/2 bg-customt5">
            <div className=" 2xl:py-64 px-6 py-10 lg:px-12 xl:pl-20 xl:pr-10">
              <h2 className="font-semibold text-lg md:text-2xl lg:text-4xl xl:text-6xl text-customt32 xl:pb-10 mt-10 xl:mt-0">
                {dataObj.data.title}
              </h2>
              <p className="my-10 xl:mt-10 xl:pr-32 text-textt5 font-light text-md xl:text-2xl">
                {dataObj.data.description}
              </p>
            </div>
          </div>
          <div className="w-full  xl:w-1/2 ">
            <img src={dataObj.data.image} alt="image" />
          </div>
        </div>
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
    </div>
  );
});
export default Hero1Temp5;
