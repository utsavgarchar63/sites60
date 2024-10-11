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

const GalleryTemp5 = forwardRef((props, ref) => {

  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group relative bg-white py-14 ${fontFam?.name}`}
      >
        <div className=" px-6 xl:pl-20 pt-6 xl:pt-20 pb-6 xl:pr-0 xl:pb-20  font-Poppins">
          <div className="grid grid-rows-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-10">
            {dataObj.data.gallery.map((item, index) => (
              <div key={index} className="mb-10 sm:mb-0">
                <p className="text-left text-lg md:text-xl lg:text-5xl xl:text-6xl font-semibold mb-2 text-customt51">
                  {(index + 1).toString().padStart(2, "0")}
                </p>

                <p className="text-left text-md lg:text-2xl 2xl:text-3xl mb-6 text-customt5 font-bold">
                  {item.name}
                </p>
                <div className="2xl:pr-14 ">
                  <img
                    src={item.image}
                    alt="image1"
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-[84%] xl:w-[88%]">
                  <p className="mt-6 text-customt31 text-md lg:text-2xl">
                    {item.descriptiom}
                  </p>
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

export default GalleryTemp5;
