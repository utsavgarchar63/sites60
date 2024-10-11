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

const ContactTemp3 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);
  return (
    <div
      ref={ref}
      id={dataObj.key}
      className={`group border-t border-gray-200 relative  ${fontFam?.name}`}
    >
      {/* <div
        className={`relative bg-${themeColor.name}-500  sm:py-7 lg:py-20 flex justify-center`}
      > */}
      <div className="p-4 xl:p-20 font-Poppins">
        <h1 className="text-4xl font-bold mb-16">Contact Form</h1>
        <div className="flex flex-col lg:flex-row border-customblue border-2 border-r-transparent border-l-transparent">
          <div className="w-full lg:w-1/2">
            <img src="/contact.png" alt="heroimage3" className=" p-12" />
          </div>
          <div className="w-full lg:w-1/2">
            <form className="flex flex-col w-full pt-5 xl:pr-10">
              <div className="form">
                <div className="mb-4 flex  ">
                  <label
                    className="block text-md xl:text-2xl text-customt31 xl:w-2/12 border-b-2 py-6 border-customblue"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    // placeholder="Enter your Name"
                    className="w-11/12 border-b-2 border-customblue outline-none bg-none py-6 border-l-white border-r-white border-t-white"
                  />
                </div>
                <div className="mb-4 flex ">
                  <label
                    className="block text-md xl:text-2xl text-customt31 xl:w-2/12 border-b-2 border-customblue"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    // placeholder="Enter your email"
                    required
                    className="w-11/12 border-b-2 border-customblue outline-none bg-none py-6 border-l-white border-r-white border-t-white"
                  />
                </div>
                <div className="mb-4 flex ">
                  <label
                    className="block text-md xl:text-2xl text-customt31  xl:w-2/12 border-b-2 border-customblue"
                    htmlFor="email"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="text"
                    // placeholder="Enter your email"
                    required
                    className="w-11/12 border-b-2 border-customblue outline-none bg-none py-6 border-l-white border-r-white border-t-white"
                  />
                </div>
                <div className="mb-4 flex ">
                  <label
                    className="block text-md xl:text-2xl text-customt31 xl:w-2/12 border-b-2 border-customblue"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    // placeholder="Enter your message"
                    required
                    className="w-11/12 border-b-2 border-customblue outline-none border-t-white border-l-white border-r-white py-6"
                  ></textarea>
                </div>
                <div className="flex items-center p-2 gap-2">
                  <button
                    type="button"
                    className="text-md xl:text-2xlfont-bold"
                  >
                    {dataObj.data.buttonText}
                  </button>
                  <img src=  {dataObj.data.image}
alt="send" className="w-6 h-6" />
                </div>
              </div>
            </form>
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
      {/* </div> */}
    </div>
  );
});
export default ContactTemp3;
