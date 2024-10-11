import React from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ContactTemp1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const getIcon = (platform) => {
    return platforms.filter((e) => e.name == platform)[0].icon;
  };

  console.log(dataObj, "<<<<<<<< dataObj contacttttttttttt");
  return (
    <div
      ref={ref}
      id={dataObj.key}
      className={`group relative flex flex-wrap bg-white sm:border-t border-gray-300 border-opacity-100 ${fontFam?.name}`}
    >
      <div className=" sm:p-0 text-left sm:border-r-2 sm:pb-16">
        <h2 className="text-36px sm:p-0 sm:pl-20 sm:pt-20 pt-6 sm:text-5xl pb-6 font-bold text-temp1text text-center sm:text-left">
          {/* Address */}
          {/* {dataObj.data.subHeading} */}
          Address
        </h2>
        <div className="relative px-6 sm:text-left text-center sm:px-20 pb-10 space-y-4 sm:h-80 sm:pt-20 w-full sm:space-y-8 opacity-75 text-16px leading-4 sm:text-xl text-custom-gray border-gray-300">
          <p>208 Don Jackson Lane Honolulu, HI 96826</p>

          {dataObj?.data?.addressContact?.map((item, index) => (
            <>
              <p>{item.text}</p>
            </>
          ))}

          {}
        </div>
        <h1 className="sm:pl-20 text-xl sm:w-[572px] text-gray-500 w-50 sm:text-xl text-16px text-center sm:text-left opacity-75 border-t-2 p-2 sm:p-8 border-gray-300 md:items-left md:justify-left">
          <p className="sm:pt-2">©{dataObj?.data?.company || "Your Company"}</p>
        </h1>
      </div>
      <div className="w-full sm:p-0 sm:w-2/3 lg:w-1/2 space-y-5 sm:py-0">
        <h2 className="font-bold sm:p-20 text-36px sm:text-5xl sm:pb-4 text-temp1text text-center sm:text-left ">
          Contact Us
        </h2>
        <form className="flex flex-col sm:pt-9 sm:pb-0 pb-8 sm:absolute space-y-2 sm:space-y-6">
          <div className="grid grid-cols-1 sm:px-0 px-6 sm:grid-cols-2 md:grid-cols-2 md:gap-x-8 gap-x-4 ">
            {/* {dataObj.data.name_show == true && ( */}
            <div className="mt-2.5 md:mt-0 sm:ml-20">
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full md:w-96 px-4 py-4 text-lg bg-white border-2 border-gray-300"
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
                className="w-full md:w-96 px-4 py-4 text-lg bg-white border-2 border-gray-300"
                placeholder="Email"
              />
            </div>
            {/* )} */}
          </div>
          {/* {dataObj.data && dataObj.data.buttonText && ( */}
          <div className="sm:ml-20 sm:pt-2 sm:px-0 px-6 md:w-[830px]">
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full lg:w-[800px] md:w-[600px] bg-white px-4 py-4 text-lg border-2 border-gray-300"
              placeholder="Message"
              defaultValue={""}
            />
          </div>
          {/* )} */}
          <div className="sm:ml-20 sm:px-0 px-6 sm:pb-0 pb-2">
            <button
              type="submit"
              className="w-full sm:w-72 px-20 py-4 bg-white border-2 text-lg border-gray-300 text-gray-400 sm:float-left"
            >
              Submit
              {/* {dataObj.data?.buttonText} */}
            </button>
          </div>
        </form>
      </div>
      {fromPage == "edit" && (
        <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex   hidden py-1 px-2 space-x-2">
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

export default ContactTemp1;
