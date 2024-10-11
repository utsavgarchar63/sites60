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

const ClientsTemp5 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <div
      ref={ref}
      id={dataObj.key}
      className={`group relative ${fontFam?.name}`}
    >
      <div className="bg-customt5  p-4 xl:p-20  font-Poppins">
        <div className="mx-auto max-w-full px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none px-5  ">
            <div className="mx-auto  grid grid-cols-2   lg:grid-cols-7 gap-16">
              {dataObj.data.client.map((item, index) => (
                <div key={index} className="relative">
                  <img
                    key={index}
                    src={item.image}
                    alt={item.alt}
                    className="w-36 h-36 object-contain"
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

export default ClientsTemp5;
