import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hero10 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <div ref={ref} className={`group px-4 sm:px-0`}>
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
        <div
          className={`max-w-full bg-${themeColor.name}-50 sm:pt-4 sm:pb-10 pt-3 pb-5 sm:px-10 px-4`}
        >
          <div className="relative">
            <img
              src={dataObj.data.image}
              alt=""
              className="w-full h-full object-cover sm:max-h-[500px] max-h-[350px]"
            />
          </div>
          <h3
            className={`mt-6 text-3xl sm:text-5xl font-bold text-${themeColor.name}-500 py-5 sm:py-10`}
          >
            {dataObj.data.title}
          </h3>
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
export default Hero10;
