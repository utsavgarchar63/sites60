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

const Hero1Temp7 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;

  return (
    <div ref={ref} id={dataObj.key} className={`group px-4 sm:px-0`}>
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative overflow-auto "
        )}
      >
        <div className="flex flex-col lg:flex-col xl:flex-row  font-Poppins">
          <div className="w-full xl:w-6/12 pr-4   xl:pr-12 2xl:pr-16 pl-4 md:pl-8 lg:pl-12 xl:pl-16 2xl:pl-20 py-6 xl:py-36 2xl:py-64">
            <p className="xl:mb-7 text-lg md:text-lg lg:text-2xl xl:text-4xl 2xl:text-6xl font-bold">
              {" "}
              {dataObj.data.title}
            </p>
            <p className="xl:mb-7 xl:mt-3 text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-customt31 xl:pr-32 pt-10">
              {" "}
              {dataObj.data.subtitle}
            </p>
          </div>
          <div className=" p-6 xl:p-0 xl:w-[65%]">
            <img
              src={dataObj.data.image}
              alt="hero"
              className="w-full h-auto xl:h-full 2xl:h-auto"
            />
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
export default Hero1Temp7;
