import React from "react";
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
const ContactTemp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className="group sm:h-[600px] sm:pt-20 pt-8  sm:w-full items-center justify-center text-center bg-temp4bg"
      >
        <div className="w-full bg-temp4bg justify-center items-center">
          <h2 className="text-3xl sm:pb-0 pb-6 font-poppins text-white sm:text-60px text-center">
            {dataObj && dataObj.data && dataObj.data.heading}
          </h2>
          <form className="sm:py-16 justify-center items-center text-center sm:ml-8 sm:pb-0 pb-8 sm:absolute xl:start-80 md:start-20 lg:start-16 sm:start-80 space-y-2 sm:space-y-6 ">
            <div className="grid grid-cols-1 sm:px-0 px-6 sm:grid-cols-2 md:grid-cols-2 md:gap-x-0 gap-x-4 ">
              {/* {dataObj.data.name_show == true && ( */}
              <div className="mt-2.5 md:mt-0">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="w-full md:w-96 px-4 placeholder-customwhite bg-temp4bg rounded-lg py-4 text-lg border-opacity-50 border-2 border-zinc-50"
                  placeholder="Full Name"
                />
              </div>
              {/* )} */}
              {/* {dataObj.data.email_show == true && ( */}
              <div className="mt-2.5 md:mt-0">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full md:w-96 px-4 py-4 placeholder-customwhite bg-temp4bg text-lg border-opacity-50 border-2 border-zinc-50 rounded-lg"
                  placeholder="Email"
                />
              </div>
              {/* )} */}
            </div>
            {/* {dataObj.data && dataObj.data.buttonText && ( */}
            <div className=" sm:pt-2 justify-center items-center sm:px-0 px-6 md:w-[830px]">
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full lg:w-[800px] md:w-[600px] placeholder-customwhite bg-temp4bg px-4 py-4 text-lg rounded-lg border-opacity-50 border-2 border-zinc-50"
                placeholder="Message"
                defaultValue={""}
              />
            </div>
            {/* )} */}
            <div className="sm:px-0 px-6 justify-center items-center sm:pb-0 pb-2">
              <button
                type="submit"
                className="w-full sm:w-72 px-20 text-customwhite text-opacity-80 justify-center bg-temp4bg py-4 rounded-lg text-lg border-opacity-50 border-2 border-zinc-50 sm:float-center"
              >
                Submit
                {/* {dataObj.data?.buttonText} */}
              </button>
            </div>
          </form>
        </div>
        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex   hidden py-1 px-2 space-x-2 rounded-md">
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
export default ContactTemp4;
