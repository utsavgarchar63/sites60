import {
  AcademicCapIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowPathIcon,
  BanknotesIcon,
  BoltIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  EyeDropperIcon,
  FolderIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../../lib/genericData";
import { useState, useEffect } from "react";

import { forwardRef } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TestimonialTemp5 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, fontFam, themeColor } = props;

  const iconsList = featherIconsList();
  let themeColorName = themeColor.name;

  const FeatherIcon = ({ name }) => {
    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {
      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon);
    }, [name]);

    if (selIcon != undefined) {
      return <selIcon.shape className="w-8 h-8" />;
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
        <div className="p-4 xl:p-20">
          <div className="max-w-full mx-auto relative border-2 rounded-lg p-4 xl:p-10 mt-4">
            <div className="text-center xl:pt-10 xl:pb-20 xl:pl-30 xl:pr-30">
              <p className="text-md md:text-lg lg:text-2xl xl:text-3xl font-light mb-4 px-12 xl:px-72 ">
                {dataObj.data.description}
              </p>
              <div className="flex justify-between items-center  mt-4">
                <img
                  src="/arrowleft.png"
                  alt="left arrow"
                  className="w-8 h-4"
                />
                <div className="pb-12 xl:pb-0">
                  <p className="text-gray-600 mt-20 text-md md:text-lg lg:text-2xl xl:text-3xl">
                    {dataObj.data.title}
                  </p>
                  <p className="text-gray-500 text-sm xl:text-2xl">
                    {dataObj.data.subtitle}
                  </p>
                </div>
                <img
                  src="/arrowright.png"
                  alt="right arrow"
                  className="w-8 h-4"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 xl:h-12 h-6 bg-transparent  ">
              <img
                src={dataObj.data.image}
                alt="testimonial image"
                className="w-24 h-12 xl:h-24 mx-auto object-contain"
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
              saveChanges("generateai", dataObj.key, "testimonials");
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
export default TestimonialTemp5;
