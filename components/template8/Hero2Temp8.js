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
const Hero2Temp8 = forwardRef((props, ref) => {
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
          <div
            className=" px-4 sm:px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24
       pt-4 sm:pt-4 md:pt-8 lg:pt-12 xl:pt-16 2xl:pt-20
       font-Poppins bg-customt8"
          >
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 xl:grid-cols-2  2xl:grid-cols-2">
              <div className=" pr-10">
                <h1 className="pb-6 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-customt32">
                  {dataObj.data.title}
                </h1>
                <p className="pb-8 lg:pb-12 xl:pb-8 2xl:pb-16 text-customt32 text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl max-w-[85%]">
                  {dataObj.data.description}
                </p>
                <img
                  src={dataObj.data.image}
                  alt="hero"
                  className="pt-0 xl:pt-10 2xl:pt-10  w-full h-auto"
                />{" "}
              </div>
              <div className=" pl-0 2xl:pl-10  ">
                <h1 className="pb-6 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-customt32">
                  {dataObj.data.title}
                </h1>
                <p className="pb-0 lg:pb-12 xl:pb-8 2xl:pb-16  text-customt32 text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl max-w-[85%]  ">
                  {dataObj.data.description}
                </p>

                <img
                  src={dataObj.data.image}
                  alt="hero"
                  className="pr-0 xl:pr-10 2xl:pr-10   pt-0 xl:pt-10 2xl:pt-10   w-full h-auto 2xl:h-[65%]"
                />
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
    </>
  );
});

export default Hero2Temp8;
