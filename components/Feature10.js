import {
  AcademicCapIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  BanknotesIcon,
  BoltIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  EyeDropperIcon,
  FolderIcon,
  GlobeAltIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../lib/genericData";
import { useState, useEffect, forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feature10 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
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
    <div ref={ref} className="group relative bg-white">
      <div
        id={dataObj.key}
        className={classNames(
          fromPage == "edit"
            ? `group-hover:bg-slate-300/20`
            : " group-hover:none",
          "mx-auto max-w-full py-2 sm:py-8 px-5 sm:px-36",
          fontFam?.name
        )}
      >
        <div className="space-y-2">
          <div className="space-y-5 sm:space-y-4 w-full flex justify-center">
            <h2
              className={`text-2xl mb-4 py-8 sm:text-3xl sm:text-theme sm:mb-10 sm:font-bold sm:text-center text-${themeColor.name}-500`}
            >
              {dataObj.data.title}
            </h2>
            {/* <p className="text-xl text-slate-900">
            {dataObj.data.subtitle}
          </p> */}
          </div>
          <div className="bg-white">
            <div className="mx-auto max-w-full py-4 sm:py-0 sm:px-0 px-3">
              <ul
                role="list"
                className="flex flex-wrap border border-slate-300 divide-x divide-slate-300"
              >
                {dataObj.data.features.map((action, actionIdx) => (
                  <li
                    key={action.title}
                    className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 py-3 md:py-6 md:px-8 px-4 align-middle text-center"
                  >
                    <div className="flex flex-1 flex-col px-2 md:align-top md:px-4 py-4 md:pb-6">
                      <div
                        className={`mx-auto flex-shrink-0 rounded-full text-${themeColor.name}-500 md:pb-10 iconFeatures10`}
                      >
                        {" "}
                        <FeatherIcon
                          name={action.icon}
                          className="mx-auto"
                        />{" "}
                      </div>
                      <h3
                        className={`md:mx-2 text-xl text-theme font-bold text-${themeColor.name}-500`}
                      >
                        {action.title}{" "}
                      </h3>
                      <p className="md:text-md text-gray-600 mt-4">
                        {action.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
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
  );
});
export default Feature10;
