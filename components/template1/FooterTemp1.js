import React from "react";
import { forwardRef } from "react";

import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FooterTemp1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  const getIcon = (platform) => {
    return platforms.filter((e) => e.name == platform)[0].icon;
  };

  return (
    <>
      {/* <footer
        ref={ref}
        id={dataObj.key}
        className="group sm:absolute  sm:w-[572px] text-gray-500 w-50 sm:text-2xl text-16px text-center sm:text-left opacity-75 border-t-2 border-r-2 p-2 sm:p-8 border-gray-300"
      >
        <div
          className={classNames(
            fromPage == "edit"
              ? "group-hover:bg-gray-300/20"
              : "group-hover:none",
            " max-w-7xl py-8 sm:py-4 px-4 sm:px-2 md:flex lg:px-8"
          )}
        >
          <h1 className="sm:pl-4 text-xl sm:text2xl text-center sm:text-left md:items-left md:justify-left">©{dataObj.data.company}</h1>
          
          {fromPage == "edit" && (
            <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
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
      </footer> */}
    </>
  );
});

export default FooterTemp1;
