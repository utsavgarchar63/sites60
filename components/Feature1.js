import {
  ArrowDownIcon,ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../lib/genericData";

import { useState, useEffect, forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feature1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  const iconsList = featherIconsList();

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
    <div>
    <div
      ref={ref}
      id={dataObj.key}
      className={classNames(
        "group relative",
        themeColor.bgColor,
        fontFam?.name
      )}
    >
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "mx-auto max-w-full px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl sm:max-w-7xl lg:px-8 lg:pt-24"
        )}
      >
          <h2 className="text-4xl py-3 font-bold tracking-tight text-white max-w-full">
            {dataObj.data.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-200">
            {dataObj.data.subtitle}
          </p>
          <div className="mt-12 grid grid-cols-1 text-gray-300 sm:grid-cols-3 lg:mt-16 lg:grid-cols-3 gap-2 sm:gap-10 lg:gap-14 mx-auto justify-center w-full">
            {dataObj.data.features.map((feature) => (
              <div key={feature.title}>
                <div>
                  {feature.icon && (
                    <div className="">
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                        {" "}
                        <FeatherIcon name={feature.icon} />{" "}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-300 h-truncate">
                    {feature.description}
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
                saveChanges("generateai", dataObj.key , "features");
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
export default Feature1;
