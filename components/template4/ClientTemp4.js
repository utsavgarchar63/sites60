import React from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { forwardRef } from "react";
const ClientTemp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  return (
    <>
      <div className="group bg-temp4bg sm:py-10 py-3 pl-8">
        <h1 className="text-gray-100 text-left font-bold text-28px sm:text-3xl sm:ml-16 font-poppins sm:pt-2">
        {dataObj.data.heading}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 sm:p-6 md:grid-cols-6 sm:h-24 sm:ml-10 sm:space-x-3 items-center justify-center relative">
          {dataObj.data.client.map((item, index) => (
            <div key={index} className="relative">
              <img
                key={index}
                src={item.image}
                alt={item.alt}
                className={`h-28 w-28 sm:h-[40px] sm:w-[210.94px] object-contain sm:pr-8 ${
                  index !== item.length - 1
                    ? "sm:border-r-2 sm:border-customgray sm:border-opacity-30"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>
        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  hidden py-1 px-2 space-x-2 rounded-md">
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
                saveChanges("delete", dataObj.key);
              }}
            >
              <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
            </span>
          </div>
        )}
      </div>
    </>
  );
});

export default ClientTemp4;
