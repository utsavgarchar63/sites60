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

const ContactTemp6 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      ref={ref}
      id={dataObj.key}
      className={`group border-t border-gray-200 relative  ${fontFam?.name}`}
    >
      <div className={`relative   sm:py-7 lg:py-20 flex justify-center`}>
        <div className="p-4 xl:p-20 font-Poppins">
          <div className=" flex flex-col lg:flex-row">
            <div className=" w-full h-[30%] xl:w-1/2  ">
              <div className="flex justify-start flex-col">
                <div className="mb-6 mt-4">
                  <h1 className="text-2xl xl:text-4xl 2xl:text-6xl font-bold text-customblue6  ">
                    {dataObj.data.heading}
                  </h1>
                  <p className="text-customt31 mt-14 2xl:mb-20 text-lg 2xl:text-2xl w-[80%]">
                    For more informations email us or fill the form we will get
                    Back to you.
                  </p>
                </div>
                <div className="flex flex-col ">
                  <form className=" w-[90%] h-auto">
                    <div className="mt-10">
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full h-auto p-4 text-md 2xl:text-2xl  border border-gray-300 "
                      />
                    </div>
                    <div className="mb-10">
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-auto p-4 text-md 2xl:text-2xl border border-gray-300 mt-10"
                      />
                    </div>
                    <div className="mt-10">
                      <input
                        type="text"
                        placeholder="Phone"
                        className="w-full h-auto p-4 text-md 2xl:text-2xl border border-gray-300"
                      />
                    </div>
                    <div className="mt-10">
                      <textarea
                        placeholder="Message"
                        rows="5"
                        className="w-full h-auto p-4 text-md 2xl:text-2xl border border-gray-300"
                      ></textarea>
                    </div>
                    <div className="mt-10">
                      <button
                        type="submit"
                        className="w-full h-auto p-8 text-md 2xl:text-2xl bg-texth6 text-customt32  "
                      >
                        {dataObj.data.buttonText}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-[60%] 2xl:w-1/2  xl:pr-20 mt-10 lg:mt-20 2xl:mt-0">
              <div>
                <img
                  src={dataObj.data.image}
                  alt="contact image"
                  className="w-full h-auto"
                />
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
    </div>
  );
});
export default ContactTemp6;
