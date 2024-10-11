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

import { featherIconsList } from "../lib/genericData";

import { useState, useEffect, forwardRef } from "react";

const features = [
  {
    name: "Push to Deploy",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL Certificates",
    description:
      "Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.",
    icon: LockClosedIcon,
  },
  {
    name: "Simple Queues",
    description:
      "Rerum quas incidunt deleniti quaerat suscipit mollitia. Amet repellendus ut odit dolores qui.",
    icon: ArrowPathIcon,
  },
  {
    name: "Advanced Security",
    description:
      "Ullam laboriosam est voluptatem maxime ut mollitia commodi. Et dignissimos suscipit perspiciatis.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Powerful API",
    description:
      "Ab a facere voluptatem in quia corrupti veritatis aliquam. Veritatis labore quaerat ipsum quaerat id.",
    icon: CogIcon,
  },
  {
    name: "Database Backups",
    description:
      "Quia qui et est officia cupiditate qui consectetur. Ratione similique et impedit ea ipsum et.",
    icon: ServerIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feature2 = forwardRef((props, ref) => {
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
    <div ref={ref} className="group" id={dataObj.key}>
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "group relative bg-white pb-16",
          fontFam?.name
        )}
      >
        <div
          className={classNames(
            "mx-auto max-w-md px-4 py-8 pt-8 pb-8 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
          )}
        >
          <h2 className="text-4xl py-8 font-bold tracking-tight text-gray-700 max-w-full">
            {dataObj.data.title}
          </h2>

          <p className="mx-auto mt-4 max-w-prose text-md text-gray-500">
            {dataObj.data.subtitle}
          </p>
          <div className="mt-12">
            <div
              className={classNames(
                fromPage == "edit"
                  ? " group-hover:opacity-80"
                  : " group-hover:none",
                dataObj.data.key,
                "grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3 "
              )}
            >
              {dataObj.data.features.map((feature) => (
                <div key={feature.title} className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8 shadow-md">
                    <div className="-mt-6">
                      <div
                        className={`shadow-lg px-2 py-2 rounded-lg w-12 h-12 flex items-center justify-center text-gray-200 mx-auto ${themeColor.bgColor}`}
                      >
                        {feature.icon && (
                          <div>
                            {" "}
                            <FeatherIcon name={feature.icon} />{" "}
                          </div>
                        )}
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 h-truncate">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
    </div>
  );
});
export default Feature2;
