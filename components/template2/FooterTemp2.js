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

const FooterTemp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  return (
    <>
      <footer
        ref={ref}
        id={dataObj.key}
        className={` ${dataObj.data.key} group relative ${fontFam?.name}`}
      >
        <div
          className={classNames(
            fromPage == "edit" ? "" : "group-hover:none",
            "mx-auto py-8 sm:py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8  text-custom-gray sm:text-left p-6 text-center text-lg sm:text-24px sm:p-16 bg-customblack"
          )}
        >
          <div className="sm:pl-8">{dataObj.data.company}</div>
        </div>
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
      </footer>
    </>
  );
});
export default FooterTemp2;
