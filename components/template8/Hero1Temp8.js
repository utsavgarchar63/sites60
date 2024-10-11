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

const Hero1Temp8 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;
  return (
    <>
      <div ref={ref} id={dataObj.key} className={`group px-4 sm:px-0`}>
        <div
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            "relative overflow-auto py-10"
          )}
        >
          <div className="w-full h-auto bg-customt8 font-Poppins text-customt32">
            <div className="sm:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
              <div
                className="pr-20  sm:pr-20 md:pr-20 lg:pr-20 xl:pr-20 2xl:pr-80
            pl-4  sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 2xl:pl-24 
            pt-4  sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 2xl:pt-24  
            pb-4  sm:pb-4 md:pb-4 lg:pb-4 xl:pb-4 2xl:pb-28 "
              >
                <h1 className="text-2xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold">
                  {dataObj.data.title}
                </h1>
              </div>
              <div
                className=" pl-5 md:pl-14 xl:pl-0 2xl:pl-0  pr-4 pt-2 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20 2xl:pr-24 sm:pt-4 md:pt-8 lg:pt-12 xl:pt-16 2xl:pt-20"
              >
                <h1 className="pb-6 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                  {dataObj.data.subtitle}{" "}
                </h1>
                <img
                  src={dataObj.data.image}
                  alt="hero"
                  className="w-full pt-10 h-auto"
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
export default Hero1Temp8;
