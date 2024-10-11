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

const Hero8 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor } = props;
  return (
    <div ref={ref} className={`group px-4 sm:px-0`}>
      <div
        id={dataObj.key}
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative py-10"
        )}
      >
        <div className="relative overflow-hidden bg-slate-50">
          <div
            className="hidden sm:absolute top-12 right-24 sm:block"
            aria-hidden="true"
          >
            <div className={`${themeColor.bgColor} w-96 h-96`}></div>
          </div>
          <div className="relative pt-6 pb-16 sm:pb-24">
            <main className="mt-16 sm:mt-24">
              <div className="mx-auto max-w-7xl">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
                        {dataObj.data.title}
                      </h1>
                      <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        {dataObj.data.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                    <img
                      className="w-full sm:max-h-[440px] max-h-[[340px]]"
                      src={dataObj.data.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </main>
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
export default Hero8;
