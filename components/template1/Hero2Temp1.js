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
const Hero2Temp1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group bg-temp1bg xl:py-10 px-6 sm:px-0`}
      >
        <div
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            "relative overflow-auto py-10"
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-gray-100"
          />
          <div className=" lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-x-8 xl:gap-x-20 lg:px-2">
            <div className=" max-w-full sm:mx-0 lg:max-w-7xl sm:max-w-7xl sm:px-0 flex">
              <div className=" sm:h-[400px] w-[900px] sm:ml-16 sm:pt-24">
                <h2 className="sm:text-3xl text-center lg:text-left text-3xl font-bold text-white">
                  {dataObj.data.title}
                </h2>
                <p className="sm:mt-4 mt-2 sm:mb-0 mb-6 text-md sm:text-lg text-white text-center lg:text-left text-opacity-80">
                  {dataObj.data.subtitle}
                </p>
              </div>
            </div>
            <div className={classNames()}>
              <div className="rounded-none sm:absolute xl:right-20 xl:h-[400px] xl:w-[700px] items-end flex justify-end">
                <img
                  className="object-cover lg:h-[400px] lg:w-[450px] xl:h-[400px] xl:w-[700px] w-full h-64 rounded-none"
                  src={dataObj.data.image}
                  alt="Inbox user interface"
                  // style={{ height: "[400px]", width: "[1000px]" }}
                />
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
    </>
  );
});
export default Hero2Temp1;
