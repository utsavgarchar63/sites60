import React from "react";
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  CogIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
  XMarkIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

import { featherIconsList } from "../../lib/genericData";

import { useState, useEffect, forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const FeatureTemp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const iconsList = featherIconsList();

  const FeatherIcon = ({ name }) => {
    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {
      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon);
    }, [name]);

    if (selIcon != undefined) {
      return <selIcon.shape className="sm:w-16 sm:h-16 w-10 h-10 stroke-1 text-temp4text" />;
    }
  };
  // const FeatureTemp4 = () => {
  const boxData = [
    { imageSrc: "/doloris.png", title: "Doloris" },
    { imageSrc: "/magnin.png", title: "Magnain" },
    { imageSrc: "/lanci.png", title: "Lancivila" },
    { imageSrc: "/pulnivar.png", title: "Pulvinar" },
  ];

  return (
    <div id={dataObj.key} ref={ref} className="group bg-temp4bggreen sm:h-[618px] sm:pt-0 pt-2">
      <div className="group relative flex sm:flex-row flex-col sm:h-[618px]">
        <div className="md:w-[785px] px-4 sm:px-20 sm:my-16">
          <h2 className="text-22px sm:text-5xl leading-none sm:leading-tight sm:text-left text-center font-normal font-poppins mb-4 sm:mb-8 pt-4 text-temp4text">
            {dataObj.data.title}
          </h2>
          <p className="text-custom-gray sm:text-left text-center text-md sm:text-22px font-poppins mb-6 sm:mb-0">
            {dataObj.data.subtitle}
          </p>
        </div>
        <div className=" h-[618px] grid grid-cols-1 md:grid-cols-2 divide-y border-custom-border">
          {dataObj.data.features.slice(0, 4).map((feature,index) => (
            <div
              key={feature.title}
              className={`border py-10 sm:p-16 flex flex-col items-center justify-center w-full h-full text-center ${index === 1 ? 'border-r-0' : 'border-r-0'}`}
            >
              {" "}
              {feature.icon && (
                <div>
                  {" "}
                  <FeatherIcon name={feature.icon} />{" "}
                </div>
              )}
              <p className="text-temp4text text-opacity-90 pt-2 sm:pt-5 font-semibold text-16px sm:text-20px">
                {" "}
                {feature.title}
              </p>
            </div>
          ))}
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
                saveChanges("generateai", dataObj.key, "features");
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
    </div>
  );
});

export default FeatureTemp4;
