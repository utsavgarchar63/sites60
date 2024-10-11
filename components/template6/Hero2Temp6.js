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

const Hero2Temp6 = forwardRef((props, ref) => {
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
        <div className="overflow-hidden bg-white py-32 font-Poppins">
          <div className="max-w-full">
            <div className="relative w-full grid grid-cols-1 sm:flex items-center justify-end h-full 2xl:pl-10">
              <div className="sm:absolute relative flex w-full justify-center pl-80 lg:pl-96 xl:pl-60  2xl:pl-0 sm:mx-96 order-last sm:order-first ">
                <div
                  className={` md:max-w-[[550px]] lg:max-w-[[550px]] xl:max-w-[760px] 2xl:max-w-[960px] bg-herot6 md:py-10 py-4 md:px-10 lg:px-5 lg:py-10 xl:px-10 xl:py-20 2xl:px-20 2xl:py-32 px-2 md:min-h-[[200px]] lg:min-h-[[200px]] xl:min-w-[400px] sm:min-h-[400px]`}
                >
                  <p
                    className={`mt-2 text-lg xl:text-xl 2xl:text-3xl font-bold tracking-tight  text-customblue6 pl-12`}
                  >
                    {dataObj.data.title}
                  </p>
                  <p className="mt-6 text-md xl:text-lg 2xl:text-2xl font-thin text-customt31 tracking-wide h-truncate px-12">
                    {dataObj.data.description}
                  </p>
                </div>
              </div>
              <img
                src={dataObj.data.image}
                alt="hero"
                className="w-[100%] max-w-none ring-1 ring-gray-400/10 sm:w-[60%] max-h-full sm:max-h-[850px] object-cover"
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
  );
});
export default Hero2Temp6;
