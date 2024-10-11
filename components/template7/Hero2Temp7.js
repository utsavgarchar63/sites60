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

const Hero2Temp7 = forwardRef((props, ref) => {
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
        <div className="flex flex-col xl:flex-row font-Poppins ">
          <div className="w-full xl:w-[53%] p-6 xl:p-0 xl:pl-20 order-last xl:order-none">
            <img
              src={dataObj.data.image}
              alt="hero"
              className="w-full h-full"
            />
          </div>
          <div className="w-full xl:w-8/12 p-6 xl:p-0 xl:pr-10 xl:pl-32 xl:pt-40 xl:pb-14">
            <h2 className="mb-3 text-herot7 font-bold text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              {dataObj.data.title}
            </h2>
            <p className=" xl:mb-7 text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold xl:pr-48 w-10/12">
              {" "}
              {dataObj.data.subtitle}
            </p>
            <p className=" mt-5 xl:mt-20 text-customt31 xl:pr-56 text-md md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
              {dataObj.data.description}
            </p>
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
export default Hero2Temp7;
