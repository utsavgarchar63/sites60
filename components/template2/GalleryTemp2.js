import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import { forwardRef } from "react";

const GalleryTemp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group sm:px-0 bg-customblack h-[550px] sm:h-[715px]`}
      >
        <div
          className={classNames(
            fromPage == "edit" ? " " : " group-hover:none",
            "relative overflow-hidden"
          )}
        >
          <div className="grid grid-cols-1 sm:p-0 p-6 sm:pt-10 lg:grid-cols-3 xl:grid-cols-3">
            <div className="sm:px-6 xl:pl-20 sm:pt-40 justify-center items-center text-center">
              <h1
                className="font-bold text-20px sm:text-3xl leading-tight
             font-poppins text-white text-center sm:text-left"
              >
                {dataObj.data.heading}
              </h1>

              <p className=" text-sm sm:pt-8 sm:text-xl sm:leading-8 font-poppins font-thin text-customwhite/90 text-center sm:text-left">
                {dataObj.data.subHeading}
              </p>
            </div>

            <div className="grid grid-cols-1 pt-8 lg:w-[250px] lg:h-[350px] xl:w-[900px] xl:h-[650px] sm:ml-28 sm:grid-cols-2 space-y-0 sm:space-y-0">
              {dataObj.data.gallery.slice(0, 2).map((item, index) => (
                <div className="sm:pt-3">
                  <div
                    className={`border w-72 h-80 lg:w-[250px] lg:h-[400px] xl:w-[360px] xl:h-[550px] border-solid border-custom-orange opacity-100 ${
                      index > 0 ? "hidden sm:block" : ""
                    }`}
                  ></div>
                  <img
                    src={item.image}
                    alt={`Image ${index + 1}`}
                    className={`w-72 h-80 sm:w-[360px] sm:h-[550px] object-cover object-center absolute top-36 ml-6 sm:top-28 sm:ml-8 ${
                      index > 0 ? "hidden sm:block" : ""
                    }`}
                  />
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
export default GalleryTemp2;
