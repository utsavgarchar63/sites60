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

const Contact2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group border-t border-gray-200 relative bg-white py-4 sm:py-8 ${fontFam?.name}`}
      >
        {/* <div className="relative bg-white"> */}
        <div className="relative mx-auto max-w-full lg:grid lg:grid-cols-7 sm:px-8 px-4 sm:gap-10 gap-4 md:items-center">
          <div className="bg-gray-50 sm:py-0 py-0 px-0 lg:col-span-3 sm:px-0">
            <div className="mx-auto">
              <img
                className="w-full sm:h-full md:max-h-[500px] max-h-[300px] object-cover"
                src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="bg-white lg:col-span-4">
            <div className="py-4 sm:py-0">
              <h2
                className={`text-3xl font-bold tracking-tight sm:text-4xl md:py-8 py-4 text-${themeColor.name}-500`}
              >
                {dataObj.data.heading}
              </h2>
              {/* <p className="mt-4 text-lg text-gray-500 sm:mt-3 pb-8 sm:pb-14">
                  {dataObj.data.subHeading}
                  </p> */}
              <div className="grid grid-cols-1 gap-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  {dataObj.data.name_show == true && (
                    <div>
                      <label htmlFor="full-name" className="sr-only">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        autoComplete="name"
                        className="block w-full border-gray-300 py-4 px-4 placeholder-gray-500 "
                        placeholder="Full name"
                      />
                    </div>
                  )}

                  {dataObj.data.email_show == true && (
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full border-gray-300 py-4 px-4 placeholder-gray-500 "
                        placeholder="Email"
                      />
                    </div>
                  )}
                </div>

                {dataObj.data.phone_show == true && (
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full border-gray-300 py-4 px-4 placeholder-gray-500 "
                      placeholder="Phone"
                    />
                  </div>
                )}

                {dataObj.data.message_show == true && (
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full border-gray-300 py-4 px-4 placeholder-gray-500 "
                      placeholder="Message"
                      defaultValue={""}
                    />
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className={`w-full inline-flex justify-center border border-transparent ${themeColor.bgColor} py-3 px-6 text-base font-medium text-white shadow-sm focus:outline-none`}
                  >
                    {dataObj.data.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

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
export default Contact2;
