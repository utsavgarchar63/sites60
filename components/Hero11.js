import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowPathIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hero11 = forwardRef((props, ref) => {
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
        <div className="overflow-hidden bg-white py-6 sm:py-0">
          <div className="max-w-full">
            <div className="relative w-full grid grid-cols-1 sm:flex items-center justify-start h-full">
              <img
                src={dataObj.data.image}
                alt={dataObj.data.title}
                className="w-[100%] ring-1 ring-gray-400/10 sm:w-[60%]  max-h-[[200px]] sm:max-h-[650px] object-cover"
              />
              <div className="sm:absolute relative flex w-full justify-center sm:ml-56 ml-0">
                <div
                  className={`sm:max-w-3xl max-w-xl bg-${themeColor.name}-50 bg-white md:py-20 py-4 md:px-20 px-2 min-h-[[200px]] sm:min-h-[300px]`}
                >
                  <p
                    className={`mt-2 text-2xl font-bold tracking-tight text-${themeColor.name}-500 sm:text-4xl`}
                  >
                    {dataObj.data.title}
                  </p>
                  <p className="mt-6 text-lg sm:text-xl font-thin text-gray-600 tracking-wide h-truncate">
                    {dataObj.data.subtitle}
                  </p>
                </div>
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
  );
});
export default Hero11;
