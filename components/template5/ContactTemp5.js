import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";

import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ContactTemp5 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group border-t border-gray-200 relative  ${fontFam?.name}`}
      >
        <div className="p-8 lg:p-20 bg-contactt5 font-Poppins">
          <div className="flex flex-col lg:flex-row justify-center items-center space-x-14 mt-10 sm:mt-0 ">
            <div className="  flex w-full lg:w-[597px] h-[80px] mb-10">
              <input
                type="text"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-full py-2 px-10 text-md lg:text-2xl  focus:outline-none w-full "
              />
            </div>
            <div className="pb-10 w-[50%]">
              <button className="bg-customt5 w-[75%] lg:w-[207px] h-[80px] text-customt32 rounded-full px-4 lg:px-8 pb-2 text-md lg:text-2xl hover:bg-blue-600 focus:outline-none">
submit              </button>
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
                saveChanges("delete", dataObj.key);
              }}
            >
              <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
            </span>
          </div>
        )}
      </div>
    </>
  );
});
export default ContactTemp5;
