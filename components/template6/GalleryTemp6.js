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

const GalleryTemp6 = forwardRef((props, ref) => {
  // export default function Gallery1({ fromPage, dataObj, saveChanges, themeColor, fontFam }) {

  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group relative bg-white py-14 ${fontFam?.name}`}
      >
        <div className="p-4 xl:p-20 font-Poppins">
          <div className="   mx-auto">
            <h1 className="text-lg md:text-2xl lg:text-4xl xl:text-6xl text-customblue6 font-bold">
              {dataObj.data.heading}
            </h1>
          </div>
        </div>
        <div className="w-[20%] border-t-2  border-gray-300" />
        <div className="p-6 xl:p-20 ">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:grid-rows-2 xl:grid-cols-2 2xl:grid-cols-3  ">
            {dataObj.data.gallery.map((item, index) => (
              <div key={index}>
                <div className={` w-full 2xl:w-[506px] h-auto 2xl:h-[481px] `}>
                  <img src={item.image} alt="image1" />
                </div>
                <div className={`text-customt31 w-[85%] pt-10`}>
                  <p className="mt-6 text-lg xl:text-2xl">{item.descriptiom}</p>
                </div>
              </div>
            ))}
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

export default GalleryTemp6;
