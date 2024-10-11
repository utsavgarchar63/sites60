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

const FooterTemp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  const getIcon = (platform) => {
    return platforms.filter((e) => e.name == platform)[0].icon;
  };
  return (
    <>
      <footer
        ref={ref}
        id={dataObj.key}
        className="group relative h-32 lg:h-28 xl:h-[200px] bg-temp4bggreen"
      >
        <div className={classNames(fromPage == "edit" ? "" : "", " ")}>
          <h1 className="text-gray-500 tracking-wide bg-temp4bggreen font-thin text-opacity-80 py-14 xl:py-20 sm:text-20px justify-center items-center text-16px text-center">
            ©{dataObj.data.company}
          </h1>
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
      </footer>
    </>
  );
});

export default FooterTemp4;
