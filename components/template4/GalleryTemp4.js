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
const Gallery2Temp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className=" group relative bg-temp4bggreen lg:h-[600px] xl:h-[840px] p-6 lg:p-10 xl:p-20"
      >
        <div className="bg-temp4bggreen flex items-center justify-center">
          <div className="sm:pt-2">
            <h2
              className={`text-temp4text mb-6 sm:text-center text-center sm:mb-8 leading-7 font-semibold text-26px lg:text-3xl xl:text-5xl sm:leading-1 font-poppins`}
            >
              {dataObj.data.heading}
            </h2>
            <p className="text-temp4text pb-6 lg:pb-12 xl:pb-20 font-poppins text-xl flex items-center justify-center">
              <span className="border-t-2 opacity-25 border-gray-700 h-0 w-10 sm:w-16 mr-6"></span>
              <span className=" font-poppins font-medium text-sm text-center lg:text-xl xl:text-28px flex items-center justify-center">
                {dataObj.data.subHeading}
              </span>
              <span className="border-t-2 opacity-30 border-gray-700 h-0 w-10 sm:w-16 ml-6"></span>
            </p>
            {Array.isArray(dataObj.data.gallery) && (
              <div className="grid grid-col-1 sm:grid-cols-3 gap-6 xl:gap-10">
                {dataObj.data.gallery.slice(0, 3).map((item, index) => {
                  const row = Math.floor(index / 2) + 1;
                  const col = index % 3 === 0 ? 2 : 1;

                  const imageClass =
                    index === 0 ? "sm:w-screen" : "w-full sm:w-full";

                  return (
                    <div key={index} className={`xl:h-[460px]`}>
                      <img
                        src={item.image}
                        alt={`Image ${index + 1}`}
                        className={`h-56 w-full lg:h-[200px] xl:h-[320px] object-cover object-center rounded-t-lg ${imageClass}`}
                      />
                      <p className="text-slate-700 h-32 lg:h-36 xl:h-[170px] rounded-b-lg px-4 bg-white text-sm sm:text-lg py-6 font-thin">
                        {item.subHeading}
                      </p>
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
    </>
  );
});

export default Gallery2Temp4;
