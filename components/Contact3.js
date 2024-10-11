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

const Contact3 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group border-t border-gray-200 relative  ${fontFam?.name}`}
      >
        <div
          className={`relative bg-${themeColor.name}-500  sm:py-7 lg:py-20 flex justify-center`}
        >
          <div className=" mx-auto   max-w-7xl sm:px-6 lg:px-8  ">
            <div>
              <div className="max-w-2xl  text-center py2  font-bold tracking-tight text-white ">
                <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold tracking-tight text-white sm:text-4xl">
                  {dataObj.data.heading}
                </h2>{" "}
                <p className="text-md font-normal">{dataObj.data.subHeading}</p>
              </div>
              <form className="mx-auto mt-3 justify-center flex max-w-2xl gap-x-4">
                {dataObj.data.email_show == true && (
                  <div className="flex gap-x-6 ">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-w-0 flex-auto  w-full sm:w-96 border-0 bg-white px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-66"
                      placeholder="Enter your valid  email"
                    />
                    <button
                      type="submit"
                      className="flex-none  bg-slate-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 md:px-8"
                    >
                      {dataObj.data.buttonText}
                    </button>
                  </div>
                )}
              </form>
              <p className="mt-4 text-sm text-center leading-6 text-gray-300">
                We care about your data. Read our{" "}
                <a
                  href="#"
                  className="font-semibold text-white hover:text-indigo-50"
                >
                  privacy&nbsp;policy
                </a>
                .
              </p>
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
      </div>
    </>
  );
});
export default Contact3;
