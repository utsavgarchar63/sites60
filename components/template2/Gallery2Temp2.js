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

const Gallery2Temp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  // const Gallery2Temp2 = () => {
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group relative ${fontFam?.name}`}
      >
        <div>
          <div className="flex flex-col lg:flex-row justify-between p-4 sm:p-14 bg-customblack">
            <div className="lg:w-1/2 sm:pl-5 sm:pb-4">
              <h2 className="font-bold text-24px mb-1 text-center sm:text-left sm:text-32px sm:leading-10 font-poppins text-white">
                {dataObj.data.heading}
              </h2>
              <p className="text-lg sm:text-22px tracking-normal text-temp2text leading-7 font-thin font-sans text-center sm:text-left">
                {dataObj.data.subHeading}
              </p>
            </div>

            <div className=" flex justify-between gap-16 items-center sm:pr-5 bg-customblack sm:px-0 px-4 sm:p-4">
              <img
                src="/left.png"
                alt="Image 1"
                className="h-6 w-14 text-temp2text cursor-pointer"
              />
              <img
                src="/right.png"
                alt="Image 2"
                className="h-6 h- w-14 text-temp2text cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 sm:p-0 p-4 gap-2 sm:gap-[2px] bg-customblack">
            {dataObj.data.gallery.slice(0, 5).map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={`Image ${index + 1}`}
                className="sm:w-full sm:h-[460px] w-full h-96 object-cover object-center"
              />
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

export default Gallery2Temp2;
