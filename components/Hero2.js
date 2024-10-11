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

const Hero2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges } = props;
  return (
    <div  ref={ref} id={dataObj.key} className={`group px-4 sm:px-0`}>
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative py-10"
        )}
      >
        <div className="lg:grid lg:max-w-7xl lg:grid-flow-col-dense sm:grid-cols-2 sm:gap-x-36 sm:pl-8 items-center mx-auto">
          <div className=" max-w-full sm:mx-0 lg:max-w-7xl sm:max-w-7xl sm:px-0 flex items-center ">
            <div>
              <div className="">
                <h2 className="text-4xl font-bold tracking-tight text-gray-700">
                  {dataObj.data.title}
                </h2>
                <p className="mt-4 text-xl text-gray-500">
                  {dataObj.data.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              fromPage == "edit"
                ? " group-hover:opacity-80"
                : " group-hover:opacity-100",
              "mt-12 sm:mt-16 lg:col-start-1 lg:mt-0"
            )}
          >
            <div className="sm:relative hero-section hero-2-margin">
              <img
                className=" rounded-xl shadow-xl"
                src={dataObj.data.image}
                alt="Customer profile user interface"
              />
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
export default Hero2;
