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
  Square3Stack3DIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../lib/genericData";
import { useState, useEffect, forwardRef } from "react";

const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: FolderIcon,
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: EyeDropperIcon,
  },
  {
    name: "Computer notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: BanknotesIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feature6 = forwardRef((props, ref) => {
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
    <div ref={ref} className="group relative sm:my-4 my-10 px-4 sm:px-10 bg-white py-4 sm:py-10 max-w-full mx-auto">
    <div
      id={dataObj.key}
      className={classNames(
        fromPage == "edit"
          ? `group-hover:bg-${themeColor.name}-300/20`
          : " group-hover:none",
        "max-w-xl sm:text-center lg:max-w-2xl md:mb-12 mx-auto px-4 py-8",
        fontFam?.name
      )}
    >
        <h2 className="mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          {dataObj.data.title}
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          {dataObj.data.subtitle}
        </p>
      </div>

      <section class="mb-3 mt-3 text-gray-800 text-left">
        <ul
          role="list"
          className="space-y-12 lg:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:items-start lg:gap-x-8 lg:gap-y-12 gap-x-2 gap-y-4 lg:space-y-0"
        >
          {dataObj.data.features.map((action, actionIdx) => (
            <div
              class="mb-12 lg:mb-0 relative shadow-md rounded-lg sm:w-full sm:h-44 h-28 w-full flex justify-start items-center space-x-4"
              key={action.title}
            >
              {action.icon && (
                <div
                  className={`bg-${themeColor.name}-50 px-6 sm:px-10 h-full flex justify-start items-center sm:items-center sm:justify-center w-auto sm:w-auto rounded-l-lg`}
                >
                  <span
                    className={`${themeColor.bgColor} text-white w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center sm:mx-auto mx-0 mb-2 shadow-sm sm:shadow-xl rounded-lg sm:rounded-2xl sm:p-3 p-2`}
                  >
                    {" "}
                    <FeatherIcon name={action.icon} className="" />{" "}
                  </span>
                </div>
              )}

              <div>
                <h2 class="text-xl font-semibold text-slate-600 mb-1 text-left">
                  {action.title}
                </h2>
                <div className="text-lg max-w-lg pr-2">
                  <p className="text-gray-500 font-thin h-truncate">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </section>

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
  );
});
export default Feature6;
