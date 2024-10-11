
import {
  AcademicCapIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,  ArrowPathIcon,
  BanknotesIcon, BoltIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, EyeDropperIcon, FolderIcon, GlobeAltIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../lib/genericData";
import { useState, useEffect } from "react";

import {forwardRef} from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Testimonials5 = forwardRef((props, ref) => {
// export default function Testimonial5({ fromPage, dataObj, saveChanges, themeColor, fontFam }) {

let {
  fromPage,
  dataObj,
  saveChanges,
  fontFam,
  themeColor,
} = props;

   const iconsList = featherIconsList();
  let themeColorName = themeColor.name;

  const FeatherIcon = ({name}) => {


    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {

      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon)


    }, [name]);

    if (selIcon != undefined) {
      return (

          <selIcon.shape className="w-8 h-8" />

      );
    }
   };



  return (
    <div ref={ref} className="group relative bg-slate-100">
    <div
      id={dataObj.key}
      className={classNames(
        fromPage == "edit"
          ? `group-hover:bg-slate-300/20`
          : "group-hover:none",
        "mx-auto max-w-7xl py-16 px-6 sm:px-8 sm:py-16",
        fontFam?.name
      )}
    >
      <div className="grid grid-cols-1 md:gap-x-16 sm:grid-cols-2">
        {dataObj.data.testimonials.map((item, index) => (
        <div className="relative m-2 grid md:flex md:items-start md:space-x-10 rounded-lg bg-white px-4 md:px-10 md:py-5 py-3 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
          <div className="flex-shrink-0">
            <img
              className="sm:h-16 sm:w-16 h-14 w-14 rounded-full object-cover"
              src={item.image}
              alt=""
            />
          </div>
          <div className="flex text-left flex-wrap md:pt-1">
            <p className="text-gray-600 text-md leading-loose">
              {item.content}
            </p>
          </div>
        </div>
        
        ))}
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
                saveChanges("generateai", dataObj.key , "testimonials");
              }}
            >
              <ArrowPathIcon className="w-5 h-5 mr-2 text-gray-100" />
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
export default Testimonials5;
