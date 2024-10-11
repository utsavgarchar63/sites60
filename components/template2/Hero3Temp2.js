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

const Hero3Temp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;
  // export const Hero3Temp2 = () => {
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group bg-customblack h-[400px] sm:h-[700px] sm:px-0`}
      >
        <div
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            "relative overflow-hidden "
          )}
        >
          <div className="grid grid-cols-1 items-center sm:p-16 sm:pb-20 bg-customblack">
            <div className="flex flex-col sm:flex-row">
              <div className=" sm:w-1/2 relative ml-4 mb-10 flex items-center">
                <div className="border w-72 h-56 sm:w-[700px] sm:h-[495px] ml-6 sm:ml-10 sm:pl-20 pl-6 border-solid border-custom-orange border-t-opacity-60"></div>

                <img
                  src={dataObj.data.image}
                  alt="Testimonial Image"
                  className="w-80 h-56 sm:w-[700px] sm:h-[495px] object-cover pr-8 absolute top-10 sm:top-12 left-0 right-56 -mt-4 -mr-4"
                />
              </div>

              <div className=" sm:w-full sm:pt-20">
                <div className="sm:ml-20 sm:mt-20 sm:mr-10 sm:p-0 p-7 sm:pr-20 sm:justify-center sm:text-center sm:items-center">
                  <p className="text-16px sm:text-20px leading-7 opacity-90 font-sans font-thin text-white text-left">
                    {dataObj.data.subtitle}
                  </p>
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
      </div>
    </>
  );
});
export default Hero3Temp2;
