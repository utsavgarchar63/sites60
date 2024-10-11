import {
  ArrowDownIcon,ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {forwardRef} from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hero14 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <div  ref={ref} className={`group px-4 sm:px-0`}>
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
        <section
          className={`py-14 px-15 bg-${themeColor.name}-500 brightness-110`}
        >
          <div className="container mx-auto">
            <div className="md:flex md:flex-wrap grid grid-cols-1 md:px-16 px-2">
              <div className="w-full sm:w-1/2 px-2 sm:px-8 py-2 sm:py-8 grid content-center flex-wrap ">
                <h1 className="text-2xl sm:text-3xl text-white mb-2 sm:mb-4 font-bold">
                  {dataObj.data.title}
                </h1>
                <p className="text-md text-white mt-2">
                  {dataObj.data.subtitle}
                </p>
              </div>
              <div className="w-full sm:w-1/2 px-2 sm:px-8 py-2 sm:py-8 max-h-[250px] md:max-h-[500px]">
                <img
                  src={dataObj.data.image}
                  className="w-full h-full flex items-center object-cover  "
                  alt={dataObj.data.title}
                />
              </div>
            </div>
          </div>
        </section>
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
                saveChanges("generateai", dataObj.key , "hero");
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
export default Hero14;
