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
  CheckIcon,
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

const Feature7 = forwardRef((props, ref) => {
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
    <div ref={ref} className="group relative bg-white">
    <div
      id={dataObj.key}
      className={classNames(
        fromPage == "edit"
          ? `group-hover:bg-slate-300/20`
          : " group-hover:none",
        "mx-auto py-8 sm:py-32 px-6 sm:px-10 sm:grid lg:grid-cols-3 sm:gap-x-12 items-center",
        fontFam?.name
      )}
    >
        <div>
          {/* <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Everything you need</h2> */}
          <p className=" text-4xl font-bold tracking-tight text-gray-900">
            {dataObj.data.title}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {dataObj.data.subtitle}
          </p>
        </div>
        <div className="mt-20 lg:col-span-2 lg:mt-0">
          <dl className="grid grid-cols-1 gap-12 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
            {dataObj.data.features.map((action, actionIdx) => (
              <div key={action.title} className="relative">
                <dt>
                  <CheckIcon
                    className={`absolute mt-1 h-8 w-8 text-white bg-${themeColor.name}-500 p-1 rounded-full`}
                    aria-hidden="true"
                  />
                  <p className="ml-14 text-lg font-semibold leading-8 text-gray-900 w-2/4 truncate">
                    {action.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-14 text-base leading-7 text-gray-600 w-3/4 break-all h-truncate">
                  {action.description}
                </dd>
              </div>
            ))}
          </dl>
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
  );
});
export default Feature7;
