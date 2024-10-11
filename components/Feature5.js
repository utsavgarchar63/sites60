import {
  AcademicCapIcon,
  ArrowPathIcon,
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

const Feature5 = forwardRef((props, ref) => {
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
    <div ref={ref} className="group relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full md:px-24 md:py-24 bg-white">
    <div
      id={dataObj.key}
      className={classNames(
        fromPage == "edit"
          ? `group-hover:bg-${themeColor.name}-300/20`
          : " group-hover:none",
        "max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12 px-4 py-8",
        fontFam?.name
      )}
    >
        <h2
          className={`max-w-lg mb-6 font-sans text-3xl font-bold leading-none text-slate-800 sm:text-4xl md:mx-auto`}
        >
          <span className={`relative inline-block ${themeColor.selectedColor}`}>
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className={`absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block`}
            >
              <defs>
                <pattern
                  id="18302e52-9e2a-4c8e-9550-0cbb21b38e55"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#18302e52-9e2a-4c8e-9550-0cbb21b38e55)"
                width="52"
                height="24"
              />
            </svg>
          </span>{" "}
          {dataObj.data.title}
        </h2>
        <p className={`text-base text-slate-400 md:text-lg`}>
          {dataObj.data.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
        {dataObj.data.features.map((action, actionIdx) => (
          <div
            key={action.title}
            className={`flex flex-col justify-between p-5 border rounded shadow-sm`}
          >
            <div>
              {action.icon && (
                <div
                  className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-${themeColor.name}-50 ${themeColor.selectedColor}`}
                >
                  {" "}
                  <FeatherIcon
                    name={action.icon}
                    className={classNames("w-8 h-8")}
                  />{" "}
                </div>
              )}
              <h6 className="mb-2 font-semibold leading-5">{action.title}</h6>
              <p className="mb-3 text-sm text-gray-900 h-truncate">
                {action.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {fromPage == "edit" && (
        <div className="absolute right-5 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
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
export default Feature5;
