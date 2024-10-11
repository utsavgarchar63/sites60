import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { data } from "autoprefixer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ContactTemp7 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);
  return (
    <div
      ref={ref}
      id={dataObj.key}
      className={`group border-t border-gray-200 relative  ${fontFam?.name}`}
    >
      <div className=" font-Poppins  bg-customblack ">
        <div className="mx-auto max-w-[80%] px-6 py-16 sm:py-24 lg:px-8   ">
          <div className="relative  shadow-xl">
            <div className="pb-16">
              <h2 className=" text-customt32 text-5xl">
                {dataObj.data.title}
              </h2>
              <p className="text-herot7 mt-3">{dataObj.data.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Contact information */}

              {/* Contact form */}
              <div className="px-6 py-10 sm:px-10 lg:col-span-2  bg-herot71  border rounded-l-lg ">
                <form
                  action="#"
                  method="POST"
                  className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        placeholder="First Name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        placeholder="Last Name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between"></div>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        autoComplete="tel"
                        className="block w-full rounded-md border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        aria-describedby="phone-optional"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex justify-between"></div>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Message"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        aria-describedby="message-max"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-start">
                    <button
                      type="submit"
                      className="mt-2 text-customt32 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-herot7 px-16 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="relative overflow-hidden  rounded-r-lg  border-transparent ">
                <div className="mx-auto  flex max-w-2xl flex-col  text-base leading-7   lg:mx-0 lg:max-w-none bg-herot7 ">
                  <div className="border border-transparent p-10 border-customt32">
                    <h3 className=" pl-6 font-semibold text-customt32">
                      Address
                    </h3>
                    <address className=" pl-6 pt-2 not-italic font-thin text-customt32">
                      <p>208 Don Jackson Lane </p>
                      <p>Honolulu, HI 96826</p>
                    </address>
                  </div>
                  <div className="border p-10 border-customt32 border-l-transparent border-r-transparent">
                    <h3 className=" pl-6 font-semibold text-customt32">
                      New York
                    </h3>
                    <address className=" pl-6 pt-2 not-italic text-customt32">
                      <p>886 Walter Street</p>
                      <p>New York, NY 12345</p>
                    </address>
                  </div>
                  <div className="p-10">
                    <h3 className=" pl-6 font-semibold text-customt32">
                      Toronto
                    </h3>
                    <address className=" pl-6 pt-2 not-italic text-customt32">
                      <p>7363 Cynthia Pass</p>
                      <p>Toronto, ON N3Y 4H8</p>
                    </address>
                  </div>
                </div>
              </div>
            </div>
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
  );
});
export default ContactTemp7;
