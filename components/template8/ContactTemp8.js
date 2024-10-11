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

const ContactTemp8 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [agreed, setAgreed] = useState(false);
  console.log(dataObj.data,"hu")
  return (
    <div
      ref={ref}
      id={dataObj.key}
      className={`group border-t border-gray-200 relative  ${fontFam?.name}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 ">
        <div className=" bg-customtbg p-4  sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24 ">
          <div className="p-10">
            <h1 className=" text-md sm:text-lg md:text-xl lg:text-3xl xl:text-5xl 2xl:text-7xl text-customt32 font-bold">
              {dataObj.data.heading}{" "}
            </h1>
            <div className="mx-auto mt-20 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-28">
           {JSON.stringify(dataObj.data)}
            {dataObj.data?.clientData?.client.map((item, index) => (
              <div key={index} className="relative">
                <img
                  key={index}
                  src={item.image}
                  alt={item.alt}
                  className="w-36 h-7 object-contain"

                />
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className=" bg-customt8  ">
          <form className="gap-6">
            <div className="form py-10 px-14  ">
              <div className=" flex mb-10 ">
                <label
                  className="block text-md lg:text-2xl  mt-10 border-b-2 border-customblue text-customt32  "
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  // placeholder="Enter your Name"

                  className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2  border-b-customblue outline-none bg-none py-12  text-sm bg-transparent border-transparent   "
                />
              </div>
              <div className="mb-10 flex ">
                <label
                  className="block text-md lg:text-2xl border-b-2 border-customblue text-customt32"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  // placeholder="Enter your email"
                  required
                  className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2 border-b-customblue outline-none bg-none py-6 text-sm bg-transparent border-transparent "
                />
              </div>
              <div className="mb-10 flex ">
                <label
                  className="block text-md lg:text-2xl border-b-2 border-customblue text-customt32"
                  htmlFor="email"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="text"
                  // placeholder="Enter your email"
                  required
                  className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2 border-b-customblue outline-none bg-none py-6 text-sm bg-transparent border-transparent   "
                />
              </div>
              <div className="mb-10 flex ">
                <label
                  className="block text-md lg:text-2xl border-b-2 border-customblue text-customt32"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  // placeholder="Enter your message"
                  required
                  className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2 border-b-customblue outline-none bg-none py-20 text-sm bg-transparent border-transparent focus:ring-white"
                ></textarea>
              </div>
              <div className="flex items-center p-2 gap-2">
                <button type="button" className="text-md lg:text-2xl font-bold">
                  Send
                </button>
              </div>
            </div>
          </form>
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
export default ContactTemp8;
