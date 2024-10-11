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

const HeroTemp3 = forwardRef((props, ref) => {
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
        <div className="relative bg-customblue px-6 py-6 lg:pl-16 lg:pr-20 lg:py-20 font-Poppins">
          <div className="mx-auto lg:grid lg:max-w-full lg:grid-flow-col-dense lg:grid-cols-2 sm:gap-x-24 lg:px-8">
            <div className="mx-auto max-w-full sm:mx-0 lg:max-w-7xl sm:max-w-7xl sm:px-0 flex items-center">
              <div className="pb-12">
                <h2 className="text-lg md:text-2xl lg:text-4xl xl:text-6xl font-bold tracking-tight text-customt3">
                  {dataObj.data.title}
                </h2>
                <p className="mt-4 text-md lg:text-2xl text-customt31 pr-16 lg:pr-32">
                  {dataObj.data.description}
                </p>
              </div>
            </div>
            <div>
              <div className="hero-section hero-1-margin">
                <img
                  className={`rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 h-50 w-50 `}
                  src={dataObj.data.image}
                  alt="Inbox user interface"
                />
                {
                  <style>
                    {`
                      hero-1-margin{
                        margin-left: -40px;
                      }
                      @media (max-width:[600px]){

                        hero-1-margin{
                          margin-left: 0px;
                        }

                      }
                      `}
                  </style>
                }
              </div>
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
export default HeroTemp3;
