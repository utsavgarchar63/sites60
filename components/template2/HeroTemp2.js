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

// export const HeroTemp2 = () => {
const HeroTemp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className, fontFam } = props;

  const originalText = dataObj.data.subtitle;
  const words = originalText.split(" ");
  const limitedText = words.slice(0, 9).join(" ");

  return (
    <>
      <div ref={ref} className={`group bg-custom-tints`}>
        <div
          id={dataObj.key}
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            "relative",
            fontFam?.name
          )}
        >
          <div className="relative isolate h-72 w-full object-cover sm:h-[560px] sm:w-full overflow-hidden bg-custom-tints">
            <img
              src={dataObj.data.image}
              alt=""
              className="absolute inset-0 -z-10 h-full w-full sm:h-full sm:w-full object-cover object-center"
            />
            <div className="px-6 sm:px-20 lg:px-20 relative">
              <div className="max-w-4xl py-20 sm:py-14 lg:py-48">
                <div className="sm:text-left text-center">
                  <h1 className="font-light text-temp2text text-md sm:text-20px leading-7 sm:mb-6 font-sans">
                    {dataObj.data.title}
                  </h1>
                  <h1 className=" text-xl font-bold sm:w-full tracking-normal sm:leading-tight text-white sm:text-57px">
                    {limitedText}
                  </h1>
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
      {/* <div ref={ref} id={dataObj.key} className={`group sm:px-0`}>
        <div
          className={classNames(
            fromPage == "edit" ? " " : " group-hover:none",
            "relative overflow-hidden "
          )}
        >
          <div
            className="w-full h-56 sm:h-[560px] object-cover object-center"
            // style={{
            //   backgroundImage: `url('/pen.png')`,
            // }}
          >
            <img
              src={dataObj.data.image}
              className="w-full h-56 sm:h-[560px] object-cover"
              alt="Pen Image"
            />
          </div>
          <div className="sm:px-20 grid absolute top-1 sm:top-52 z-4 sm:text-left text-center justify-center items-center sm:justify-start text-white">
            <h1 className="font-bold text-xl sm:w-full whitespace-nowrap sm:text-60px sm:leading-tight font-poppins text-white text-center sm:text-left mb-4">
              {limitedText}
            </h1>
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
      </div> */}
    </>
  );
});
export default HeroTemp2;
