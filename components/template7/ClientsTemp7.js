import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import { forwardRef } from "react";

const ClientsTemp7 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
 
    return (
      <div
      ref={ref}
      id={dataObj.key}
      className={`group relative ${fontFam?.name}`}
    >
      <div className="bg-customblack lg:pb-12 lg:pt-10 lg:pl-20 lg:pr-10">
        <div className="mx-auto max-w-full px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none p-10">
            <h4 className="text-center mb-4 text-customt32 font-bold text-md lg:text-xl xl:text-2xl 2xl:text-3xl">
            {dataObj.data.heading}
            </h4>
            <h2 className="text-lg md:text-lg lg:text-2xl xl:text-4xl 2xl:text-6xl font-semibold leading-8 text-herot7 text-center">
            {dataObj.data.subheading}
            </h2>
  
            <div className="mx-auto mt-20 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-7  gap-28">
            {dataObj.data.client.map((item, index) => (
              <div key={index} className="relative">
                <img
                  key={index}
                  src={item.image}
                  alt={item.alt}
                  className="w-36 h-10 object-contain"

                />
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
      {fromPage == "edit" && (
          <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  hidden py-1 px-2 space-x-2 rounded-md">
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
                saveChanges("delete", dataObj.key);
              }}
            >
              <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
            </span>
          </div>
        )}
      </div>
    );
  });

  export default ClientsTemp7;
  