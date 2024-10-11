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

const Hero2Temp5 = forwardRef((props, ref) => {
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
        <div className="relative  font-Poppins">
          <img
            src={dataObj.data.image}
            alt=""
            className="w-full min-h-screen  lg:min-h-screen 2xl:min-h-auto object-cover "
          />
          <div className="absolute  inset-0 flex flex-col justify-evenly xl:justify-normal xl:flex-row text-center xl:px-20 xl:pt-20 xl:pb-10 px-6 py-6  xl:py-0">
            <div className="w-[65%]  flex  flex-col  justify-between">
              {" "}
              <h1 className="text-lg md:text-xl lg:text-5xl xl:text-6xl text-left font-bold xl:pb-32 text-customt32 w-full h-full">
                {dataObj.data.title}
              </h1>
              <p className=" xl:pt-24 text-customt32 text-md lg:text-2xl 2xl:text-3xl text-left w-full h-full">
                {dataObj.data.subtitle}
              </p>
            </div>

            <div className=" w-full lg:w-[80%]2xl:w-[95%]  xl:pl-32 2xl:pr-24  ">
              <p className="text-customt32 text-left  text-md xl:text-2xl">
                {dataObj.data.description}
              </p>{" "}
              <p className="text-customt32 text-left xl:text-2xl text-md  lg:pt-32 2xl:pt-80">
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
export default Hero2Temp5;
