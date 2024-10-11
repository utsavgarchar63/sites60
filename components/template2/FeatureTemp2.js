import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../../lib/genericData";

import { useState, useEffect, forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FeatureTemp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  const iconsList = featherIconsList();

  const FeatherIcon = ({ name }) => {
    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {
      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon);
    }, [name]);

    if (selIcon != undefined) {
      return <selIcon.shape className="sm:w-16 sm:h-16 w-10 h-10 stroke-1" />;
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
      <div
        ref={ref}
        id={dataObj.key}
        className={classNames(
          "group relative",
          // themeColor.bgColor,
          " bg-custombg sm:p-20 p-6",
          fontFam?.name
        )}
      >
        <div
          className={classNames(
            fromPage == "edit" ? "" : " group-hover:none",
            " bg-custombg"
          )}
        >
          <h2 className="font-bold text-20px sm:pb-0 pb-4 sm:text-32px leading-46 font-poppins text-white text-center sm:text-left">
            {dataObj.data.title}
          </h2>
          <p className="font-normal text-temp2text text-opacity-85 pb-6 sm:pb-20 text-18px sm:text-20px sm:leading-7 font-poppins text-center sm:text-left">
            {dataObj.data.subtitle}
          </p>
          <div className="grid grid-cols-1 sm:gap-x-10 sm:gap-0 gap-4 sm:gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {dataObj.data.features.map((feature, index) => (
              <div
                key={index}
                className={`border ${
                  index === 1
                    ? "bg-custombgorange text-white"
                    : "text-temp2text"
                } border-custom-orange border-opacity-80 sm:items-start sm:justify-start justify-center items-center sm:w-[435px] h-64 w-full sm:h-[340px] text-left flex flex-col`}
              >
                <div className="sm:mx-12 sm:pt-10">
                  {feature.icon && (
                    <FeatherIcon
                      name={feature.icon}
                      className="w-20 h-20 sm:text-left text-center bg-transparent bg-left bg-cover opacity-100"
                    />
                  )}
                </div>
                <h2
                  className={`ont-normal sm:text-left text-center my-2 sm:my-6 text-sm sm:text-20px sm:mx-14 leading-9 font-poppins text-temp2text ${
                    index === 1 ? "text-white" : "text-temp2text"
                  }`}
                >
                  {feature.title}
                </h2>

                <p className=" sm:text-18px sm:text-left text-center text-sm mx-8 sm:mx-14 opacity-90 leading-6 font-thin tracking-normal font-poppins text-white">
                  {truncateText(feature.description, 20)}
                </p>
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
    </>
  );
});
export default FeatureTemp2;
