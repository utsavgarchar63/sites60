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

const Hero6 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    // <div className="group relative bg-white">
    // <div id={dataObj.key}
    //       className={classNames(
    //         fromPage == "edit"
    //           ? `group-hover:bg-slate-300/20`
    //           : " group-hover:none",
    //         "mx-auto py-24 px-6 sm:px-10 sm:py-32 sm:grid lg:grid-cols-3 sm:gap-x-12 items-center", fontFam?.name
    //       )}>
    <main  ref={ref} className="group lg:relative">
      <div
        id={dataObj.key}
        className={classNames(
          fromPage == "edit"
            ? `group-hover:bg-slate-300/20`
            : " group-hover:none",
          "mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left",
          fontFam?.name
        )}
      >
        <div className="px-6 sm:px-8 sm:w-1/2 sm:pr-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-700 sm:text-6xl">
            <span className="block xl:inline">{dataObj.data.title}</span>{" "}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            {dataObj.data.subtitle}
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow"></div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={dataObj.data.image}
          alt=""
        />
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
    </main>

    // </div>

    // </div>
  );
});
export default Hero6;
