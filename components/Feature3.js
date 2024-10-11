import {
  AcademicCapIcon,ArrowPathIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../lib/genericData";

import { useState, useEffect, forwardRef } from "react";

const actions = [
  {
    title: "Request time off",
    href: "#",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Benefits",
    href: "#",
    icon: CheckBadgeIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Payroll",
    href: "#",
    icon: BanknotesIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Submit an expense",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Training",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feature3 = forwardRef((props, ref) => {
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
          themeColor.bgColor,
          fontFam?.name,
          "group relative border-t border-gray-200 mt-5"
        )}
      >
        <div
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            "text-center mx-auto w-full lg:px-8 pt-10"
          )}
        >
          <h2 className="text-4xl py-4 font-bold tracking-tight text-gray-50 max-w-full">
            {dataObj.data.title}
          </h2>

          <p className="mx-auto max-w-prose text-md text-gray-200 mt-4 pb-4">
            {dataObj.data.subtitle}
          </p>
        </div>
        <div
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            themeColor.bgColor,
            "overflow-hidden shadow"
          )}
        >
          <div className="sm:max-w-5xl max-w-full lg:max-w-6xl mx-auto sm:grid sm:grid-cols-2 grid-cols-1 sm:gap-px px-4 pb-14">
            {dataObj.data.features.map((action, actionIdx) => (
              <div
                key={action.title}
                className={classNames(
                  actionIdx === 0
                    ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                    : "",
                  actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                  actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                  actionIdx === actions.length - 1
                    ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                    : "",
                  "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                )}
              >
                <div>
                  <span
                    className={classNames(
                      action.iconBackground,
                      action.iconForeground,
                      "rounded-lg inline-flex py-3 px-3 ring-4 ring-white "
                    )}
                  >
                    {action.icon && (
                      <div>
                        {" "}
                        <FeatherIcon name={action.icon} />{" "}
                      </div>
                    )}
                  </span>
                </div>
                <div className="mt-3 px-3">
                  <h3 className="text-lg font-medium">
                    <a href={action.href} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 h-truncate">
                    {action.description}
                  </p>
                </div>
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
    </div>
  );
});
export default Feature3;
