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
      "relative mx-auto max-w-full py-8 sm:py-32 lg:px-8 lg:py-14",
      fontFam?.name
    )}
  >
    <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
      <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold tracking-tight text-slate-700 sm:text-5xl">
              {dataObj.data.title}
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {dataObj.data.subtitle}
            </p>
          </div>
          <dl className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-12 lg:col-span-2 lg:mt-0">
            {dataObj.data.features.map((action, actionIdx) => (
              <div
                key={action.title}
                className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
              >
                {action.icon && (
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${themeColor.name}-500 text-white sm:shrink-0`}
                  >
                    <FeatherIcon
                      name={action.icon}
                      className="h-8 w-8"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900 w-2/4 truncate">
                    {action.title}
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600 w-3/4 break-all h-truncate">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {fromPage == "edit" && (
        <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  hidden py-1 px-2 space-x-2 rounded-md">
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
