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

const Gallery2Temp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  // const GalleryTemp4 = () => {
  return (
    <div
      ref={ref}
      id={dataObj.key}
      className=" group relative bg-temp4bggreen p-6 sm:p-20"
    >
      <div className="bg-temp4bggreen flex items-center justify-center">
        <div className="">
          <h2
            className={`text-temp4text mb-8 sm:text-left text-center sm:mb-14 leading-7 font-normal text-26px sm:text-5xl sm:leading-1 font-poppins`}
          >
            {dataObj.data.heading}
          </h2>
          {Array.isArray(dataObj.data.gallery) && (
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4 sm:gap-8">
              {dataObj.data.gallery.slice(0, 4).map((item, index) => {
                const row = Math.floor(index / 2) + 1;
                const col = index % 3 === 0 ? 2 : 1;

                const imageClass =
                  index === 0 ? "sm:w-screen" : "w-full sm:w-full";

                return (
                  <div key={index} className={`sm:col-span-${col}`}>
                    <img
                      src={item.image}
                      alt={`Image ${index + 1}`}
                      className={`h-80 w-full sm:w-full sm:h-[400px] object-cover rounded-lg shadow-sm ${imageClass}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
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

export default Gallery2Temp4;
