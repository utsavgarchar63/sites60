import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";

import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ContactTemp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group sm:flex grid sm:h-[618px] bg-custombg ${fontFam?.name}`}
      >
        <div className=" text-center sm:border-r border-opacity-60 border-custom-orange">
          <div className="relative sm:py-0 py-10 px-6 lg:px-8 xl:px-16 space-y-4 xl:h-80 sm:pt-44 w-full sm:space-y-16  ">
            {dataObj.data?.addressContact.map((item, i) => (
              <>
                <h1 className="text-20px font-poppins leading-4 sm:text-26px text-temp2text font-thin sm:text-left text-center space-y-16">
                  {item.text}
                </h1>
              </>
            ))}

            {}
          </div>
        </div>
        <div className="w-full sm:p-0 sm:w-full xl:h-full xl:w-[1100px] space-y-5 sm:py-0">
          <h2 className="font-bold lg:p-14 lg:ml-6 xl:p-16 text-20px sm:text-3xl sm:pb-0 text-temp2text text-center sm:text-left ">
            {dataObj.data?.heading}
          </h2>
          <form className="flex flex-col xl:pb-0 pb-8 relative space-y-2 sm:space-y-6">
            <div className="grid grid-cols-1 sm:px-0 px-6 sm:grid-cols-2 md:grid-cols-2 md:gap-x-8 gap-x-4 ">
              {/* {dataObj.data.name_show == true && ( */}
              <div className="mt-2.5 md:mt-0 sm:ml-20">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="w-full lg:w-[250px] xl:w-[450px] placeholder-customgray rounded-md px-4 py-5 text-lg bg-customblack  "
                  placeholder="Full Name"
                />
              </div>
              {/* )} */}
              {/* {dataObj.data.email_show == true && ( */}
              <div className="mt-2.5 md:mt-0 ml-0">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full lg:w-[250px] xl:w-[450px] px-4 py-5 rounded-md placeholder-customgray text-lg bg-customblack  "
                  placeholder="Email"
                />
              </div>
              {/* )} */}
            </div>
            {/* {dataObj.data && dataObj.data.buttonText && ( */}
            <div className="sm:ml-20 sm:pt-2 sm:mt-14 sm:px-0 px-6">
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full lg:w-[530px] xl:w-[940px] px-4 rounded-md placeholder-customgray bg-customblack py-6 text-lg  "
                placeholder="Message"
                defaultValue={""}
              />
            </div>
            {/* )} */}
            <div className=" xl:mr-20 lg:mr-14 sm:px-0 px-6 sm:pb-0 pb-2">
              <button
                type="submit"
                className="w-full lg:w-28 xl:w-44 px-16 py-5 font-sans bg-custombgorange rounded-md text-lg text-gray-200 sm:float-right"
              >
                Send
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
    </>
  );
});

export default ContactTemp2;
