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

const Hero2Temp3 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;
 
    return (
      <div ref={ref} id={dataObj.key} className={`group px-4 sm:px-0`}>
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative overflow-auto py-10"
        )}
      >
      <div className="p-4 xl:p-20 font-Poppins">
        <div className="flex flex-col xl:flex-row border-customblue border border-l-white">
          <div className=" w-full xl:w-1/2">
            <img 
                src={dataObj.data.image}
                alt="heroimage2" 
             className="rounded-l-lg w-full h-full" />
          </div>
          <div className="w-full xl:w-1/2 p-4 xl:p-12">
            <div className="">
              <h2 className="text-xl lg:text-2xl xl:text-4xl font-bold ">Praesent dapibus, neque id cur faucibus, tortor neque</h2>
              <p className="mt-10 text-md xl:text-2xl text-gray-500">
              {dataObj.data.title}

              </p>
              <p className="mt-10 text-md xl:text-2xl text-gray-500 ">
                {" "}
                {dataObj.data.description}

                </p>
            </div>{" "}
          </div>
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
  export default Hero2Temp3;
  