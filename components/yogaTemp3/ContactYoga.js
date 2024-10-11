import React, { useState } from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ContactYoga = forwardRef((props, ref) => {
  const [count, setCount] = useState(1);
  let { fromPage, dataObj, saveChanges, themeColorPrimary, themeColorSecondary, themeColorTertiary, fontFam } = props;

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>
          <>
            <div
              ref={ref}
              id={dataObj?.key}
              className={`group relative bg-${themeColorPrimary.name}-100 py-20 sm:h-[495px]`}>
              <div className="grid grid-cols-1 md:grid-cols-1 justify-center text-center gap-4 ">
                {/* {dataObj && dataObj.data && dataObj.data.heading && ( */}
                <h1
                  className={classNames(
                    `text-2xl text-${themeColorSecondary.name}-900 font-bold`,
                    fontFam?.name
                  )}
                  onClick={
                    fromPage === "edit"
                      ? () => saveChanges("edit", dataObj?.key, "heading")
                      : undefined
                  }
                >
                  {dataObj.data.heading}
                  {/* Contact us */}
                </h1>
                {/* // )} */}

                <h2
                  className={classNames(
                    `text-lg sm:text-xl font-bold text-${themeColorSecondary.name}-800 mb-6`,
                    fontFam?.name
                  )}
                  onClick={
                    fromPage === "edit"
                      ? () => saveChanges("edit", dataObj?.key, "subheading")
                      : undefined
                  }
                >
                  {dataObj.data?.subHeading}
                  {/* This approach ensures that you */}
                </h2>
              </div>
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-center items-center placeholder-red-900::placeholder mt-4 mb-6">
                {/* {dataObj.data?.email_show == true && (
          <div> */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-72 md:w-96 px-4 py-2 sm:h-14 border text-xl placeholder-customtint  bg-white rounded-lg focus:ring focus:ring-orange-100 focus:outline-none"
                  placeholder="Enter email"
                  onClick={
                    fromPage === "edit"
                      ? () => saveChanges("edit", dataObj?.key, "form")
                      : undefined
                  }
                />

                {/* </div> */}
                {/* )} */}
                <button
                  onClick={
                    fromPage === "edit"
                      ? () => saveChanges("edit", dataObj?.key, "button")
                      : undefined
                  }
                  type="submit"
                  placeholder="Submit"
                  className={classNames(
                    `ml-4 sm:w-36 px-4 text-white py-2 sm:h-14 font-semibold text-xl bg-${themeColorTertiary.name}-800 rounded-lg focus:ring focus:ring-red-800`,
                    fontFam?.name
                  )}
                >
                  Submit
                  {/* {dataObj?.data?.buttonText} */}
                </button>
              </div>
              <div className="absolute left-1/2 sm:top-80 transform -translate-x-1/2 -translate-y-1/2 sm:-translate-y-0">
                <img
                  className="w-full h-full sm:h-full md:max-h-[301px] max-h-[301px] object-cover"
                  src="/yogatemp3/Group 225.png"
                  alt=""
                />
              </div>
              {/* {fromPage == "edit" && (
                <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex   hidden py-1 px-2 space-x-2 rounded-md">
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("up", dataObj?.key);
                    }}
                  >
                    <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("down", dataObj?.key);
                    }}
                  >
                    <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      // saveChanges("add", dataObj?.key);
                      setCount(count + 1);
                    }}
                  >
                    <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      handleSaveChanges("delete", dataObj.key);
                      setCount(count - 1);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                </div>
              )} */}
            </div>
            <footer
              className={classNames(
                `text-center sm:h-[225px] text-opacity-70 bg-${themeColorPrimary.name}-50 py-20`,
                fontFam?.name
              )}
            >
              <div
                className={classNames(
                  "sm:mt-16 text-xl tracking-normal",
                  fontFam?.name
                )}
                onClick={
                  fromPage === "edit"
                    ? () => saveChanges("edit", dataObj?.key, "company")
                    : undefined
                }
              >
                &copy;{dataObj?.data?.company || "Your Company"}
              </div>
            </footer>
          </>
        </div>
      );
    }
    return components;
  };

  return <>{renderComponents()}</>;
});

export default ContactYoga;
