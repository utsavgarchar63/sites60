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



  const Hero9 = forwardRef((props, ref) => {
    let { fromPage, dataObj, saveChanges, themeColor } = props;
  return (
    <div  ref={ref} className={`group px-4 sm:px-0 bg-white`}>
      <div
      id={dataObj.key}
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative py-10"
        )}
      >


        <div className="max-w-full mx-auto relative sm:min-h-[[600px]] min-h-full">
          <div className={`h-56 ${themeColor.bgColor} sm:h-full lg:absolute lg:left-0 lg:h-full lg:w-1/2 sm:pl-2 sm:pt-0 pl-1 pt-1`}>
            <img
              className="h-full w-full object-cover"
              src={dataObj.data.image}
              alt="Support team"
            />
          </div>
          <div className="relative mx-auto max-w-7xl py-8 px-6 sm:py-24">
            <div className="mx-auto max-w-2xl lg:mr-0 lg:ml-auto lg:w-1/2 lg:max-w-none lg:pl-10">
              <div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-md ${themeColor.bgColor} text-white`}>
                  <span className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {dataObj.data.title}
              </h2>
              <p className="mt-6 text-lg text-gray-500">
              {dataObj.data.subtitle}
              </p>
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
})
export default  Hero9
