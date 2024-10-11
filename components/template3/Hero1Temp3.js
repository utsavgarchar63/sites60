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

const Hero1Temp3 = forwardRef((props, ref) => {
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
    <div className=" mx-auto h-auto flex flex-col p-4 xl:p-20 font-Poppins">
      <div className="flex items-center justify-center">
        <img
                src={dataObj.data.image}
                alt="Image"
          className="w-full h-auto object-cover rounded-t-lg"
        />
      </div>

      <div className="flex flex-col lg:flex-row bg-customblue divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-customt32 ">
        <div className="w-full lg:w-[50%] px-6 py-6 xl:p-20 ">
          <h2 className="text-2xl lg:text-4xl font-semibold mb-2">Ivamus lorit</h2>
          <p className="text-gray-600 text-lg lg:text-2xl">
          {dataObj.data.title}

          </p>
        </div>

        <div className="w-full lg:w-[50%] px-6 py-6 lg:p-20 ">
          <h2 className="text-2xl lg:text-4xl font-semibold mb-2">Fusce pellent</h2>
          <p className="text-gray-600 text-lg  xl:text-2xl">
          {dataObj.data.description}

          </p>
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
export default Hero1Temp3;
