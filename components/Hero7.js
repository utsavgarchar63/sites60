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

const Hero7 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor } = props;
  return (
    <div ref={ref} className={`group px-4 sm:px-0`}>
      <div
        id={dataObj.key}
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-slate-400/20"
            : " group-hover:none",
          "relative"
        )}
      >
        <div className="bg-white">
          <main>
            <div>
              <div className="relative ">
                <div className="mx-auto max-w-full ">
                  <div className="relative shadow-md sm:overflow-hidden ">
                    <div className="w-full h-auto sm:h-[750px]">
                      <img
                        className="w-full h-full object-cover bg-center object-top"
                        src={dataObj.data.image}
                        alt="People working on laptops"
                      />
                      <div
                        className={classNames(
                          "absolute inset-0 mix-blend-multiply bg-slate-300"
                        )}
                      />
                    </div>
                    <div className="absolute top-0 py-4 px-4 sm:py-24 lg:py-32 lg:px-8 h-full">
                      <div className="bg-white max-w-md sm:max-w-3xl px-8 py-8 sm:py-14 max-h-full overflow-y-hidden shadow-2xl">
                        <h1 className="max-w-lg sm:max-w-3xl text-left text-2xl font-extrabold sm:text-5xl break-normal">
                          <span
                            className={`block ${themeColor.selectedColor} h-full`}
                          >
                            {dataObj.data.title}
                          </span>
                        </h1>
                        <p className="mt-4 text-left text-md sm:text-lg text-slate-500 break-words w-full py-2">
                          {dataObj.data.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
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
export default Hero7;
