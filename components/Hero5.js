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

const Hero5 = forwardRef((props, ref) => {
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
        <div className={classNames("relative overflow-hidden bg-white")}>
          <div
            className="hidden sm:absolute sm:inset-0 sm:block"
            aria-hidden="true"
          >
            <svg
              className={`absolute bottom-0 left-0 mb-48 translate-x-1/2 transform text-slate-200 lg:top-0 lg:mt-28 lg:mb-0 xl:translate-x-0 xl:transform-none`}
              width={364}
              height={384}
              viewBox="0 0 364 384"
              fill="none"
            >
              <defs>
                <pattern
                  id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} fill="currentColor" />
                </pattern>
              </defs>
              <rect
                width={364}
                height={384}
                fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
              />
            </svg>
          </div>
          <div className="relative pt-6 pb-16 sm:pb-24">
            <main className="mt-16 sm:mt-24">
              <div className="mx-auto max-w-full sm:max-w-7xl">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="max-h-full mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                    <div className="px-6 py-8 sm:px-10">
                      <img
                        className="sm:rounded-xl sm:shadow-2xl sm:ring-1 sm:ring-black sm:ring-opacity-5 rounded-lg shadow-none ring-0 p-2 sm:p-0"
                        src={dataObj.data.image}
                        alt="Inbox user interface"
                      />
                    </div>
                  </div>
                  <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
                        {dataObj.data.title}
                      </h1>
                      <p className="mt-3 text-gray-500 sm:mt-5 sm:text-2xl text-xl">
                        {dataObj.data.subtitle}
                      </p>
                    </div>
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
export default Hero5;
