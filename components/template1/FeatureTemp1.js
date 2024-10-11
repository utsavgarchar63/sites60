import React from "react";
import { useState, useEffect, forwardRef } from "react";
import { featherIconsList } from "../../lib/genericData";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
const sections = [
  {
    imageSrc: "/hand.svg",
    title: "Quia veniam",
    description:
      "Fugit mollitia est. Aut sit mollitia. Est delectus nisi qui sit veniam sint ea facere aut.",
  },
  {
    imageSrc: "/people.svg",
    title: "Soluta aspernatur",
    description:
      "Beatae aut placeat eius. Nemo possimus accusantium sit odit saepe et pariatur",
  },
  {
    imageSrc: "/pig.svg",
    title: "Veritatis rem",
    description:
      "Iure sint cupiditate voluptas id ipsam tempore quae. Laudantium aperiam",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const FeatureTemp1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  const iconsList = featherIconsList();

  const FeatherIcon = ({ name }) => {
    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {
      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon);
    }, [name]);

    if (selIcon != undefined) {
      return (
        <selIcon.shape className="xl:w-16 xl:h-16 lg:w-12 lg:h-12  w-10 h-10 stroke-current stroke-1" />
      );
    }
  };

  function truncateText(text, maxLength) {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  }
  return (
    <>
      <div className="justify-center bg-white items-center overflow-x-hidden">
        <div
          ref={ref}
          id={dataObj.key}
          className={classNames(
            "group relative text-center p-6 xl:p-20",
            // themeColor.bgColor,
            fontFam?.name
          )}
        >
          <h1 className="text-temp1text mb-4 xl:mb-12 font-bold pb-4 sm:pb-6 leading-10 text-3xl xl:text-5xl leading-11 font-poppins tracking-normal text-center">
            {dataObj.data.title}
          </h1>
          <div className="flex flex-col md:flex-row">
            {dataObj.data.features.slice(0, 3).map((feature, index) => (
              <div
                key={feature.title}
                className={`flex-none w-full h-full md:w-1/3 p-4 md:p-2 border-2 md:border-2 border-opacity-40 border-gray-400 ${
                  index === 1 ? "border-l-1 md:border-r-0 md:border-l-0" : ""
                }`}
              >
                <div className="p-2 lg:p-6 xl:p-4 rounded-md h-64 lg:h-[320px] xl:h-[400px] flex flex-col justify-center items-center text-center">
                  <div className="mb-2 mt-6 xl:mb-4 flex  text-temp1text justify-center items-center">
                    {feature.icon && (
                      <FeatherIcon
                        name={feature.icon}
                        className="mx-auto stroke-1"
                      />
                    )}
                  </div>
                  <h3 className="text-temp1text mb-2 xl:mb-2 mt-2 xl:mt-4 font-bold text-20px xl:text-24px md:leading-6 font-poppins tracking-normal">
                    {feature.title}
                  </h3>
                  <p className="mt-2 xl:mt-4 mb-2 xl:mb-4 pb-2 xl:pb-4 px-2 xl:px-6 text-opacity-80 font-normal text-16px xl:text-xl leading-7 xl:leading-8 font-poppins text-custom-gray tracking-normal">
                    {/* {feature.description} */}
                    {truncateText(feature.description, 20)}
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
    </>
  );
});
