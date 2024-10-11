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
  DocumentDuplicateIcon,
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
const FeatureYoga = forwardRef((props, ref) => {
  const [count, setCount] = useState(1);

  let {
    fromPage,
    dataObj,
    saveChanges = () => {},
    themeColorPrimary,
    themeColorSecondary,
    themeColorTertiary,
    fontFam,
  } = props;

  console.log(dataObj, "data obj");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSaveChanges = (action, key, type) => {
    if (typeof saveChanges === "function") {
      saveChanges(action, key, type);
    }
  };
  const iconsList = featherIconsList();

  const FeatherIcon = ({ name }) => {
    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {
      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon);
    }, [name]);

    if (selIcon != undefined) {
      return <selIcon.shape className="w-14 h-14 stroke-current stroke-1" />;
    }
  };

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>
          <>
            <div
              className="group relative bg-custom-tints bg-cover object-cover sm:w-full sm:py-16 py-4 pt-6 lg:h-[618px] sm:h-full bg-opacity-100"
              style={{ backgroundImage: `url('/yogatemp3/Group 239.png')` }}
            >
              <div className=" grid items-center justify-center">
                <h2
                  className={`${classNames(
                    "text-customwhite text-opacity-90 mb-0 sm:text-center text-center sm:mb-6 leading-7 font-bold  tracking-wide sm:leading-1",
                    fontFam?.name
                  )}`}
                  onClick={() =>
                    handleSaveChanges("edit", dataObj?.key, "heading")
                  }
                >
                  {dataObj?.data?.title ? dataObj?.data?.title : "Title"}
                </h2>
                <p
                  className="text-customwhite pb-6 sm:pb-16 flex items-center justify-center"
                  onClick={() =>
                    handleSaveChanges("edit", dataObj?.key, "subheading")
                  }
                >
                  <span
                    className={classNames(
                      "text-customwhite text-opacity-90 font-bold text-md text-center sm:text-3xl lg:text-5xl flex items-center justify-center",
                      fontFam?.name
                    )}
                  >
                    {dataObj?.data?.subtitle
                      ? dataObj?.data?.subtitle
                      : "SubTitle"}
                  </span>
                </p>
              </div>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-4 sm:px-20"
                onClick={() =>
                  handleSaveChanges("edit", dataObj?.key, "carousel")
                }
              >
                {dataObj?.data?.features.slice(0, 3).map((feature, index) => (
                  <div
                    key={feature.title}
                    className="border-4 border-opacity-95 border-custom-tint rounded-lg p-4 md:p-2"
                  >
                    <div className="p-2 md:p-4 rounded-lg sm:h-[290px] flex flex-col justify-center items-center text-center">
                      <div className="mb-2 sm:mb-0 flex text-customwhite text-opacity-90 justify-center items-center">
                        {feature.icon && (
                          <FeatherIcon
                            name={feature.icon}
                            className="mx-auto stroke-1"
                          />
                        )}
                      </div>
                      <h3
                        className={classNames(
                          "text-customwhite text-opacity-90 mb-2 sm:mb-0 mt-2 sm:mt-2 font-bold text-xl md:text-lg lg:text-2xl leading-9 tracking-normal",
                          fontFam?.name
                        )}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={classNames(
                          "mt-2 sm:mt-2 mb-2 sm:mb-4 pb-2 sm:pb-4 px-2 sm:px-20 font-bold text-2xl md:text-xl lg:text-sm leading-7 sm:leading-8 text-customwhite text-opacity-90 tracking-normal",
                          fontFam?.name
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {fromPage == "edit" && (
                <div className="sm:absolute absolute-none right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => handleSaveChanges("up", dataObj.key)}
                  >
                    <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => handleSaveChanges("down", dataObj.key)}
                  >
                    <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() =>
                      // handleSaveChanges("add", dataObj?.key)
                      setCount(count + 1)
                    }
                  >
                    <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() =>
                      handleSaveChanges("generateai", dataObj.key, "hero")
                    }
                  >
                    <ArrowPathIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>

                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      handleSaveChanges("delete", dataObj.key);
                      setCount(count - 1);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                </div>
              )}
            </div>
          </>
        </div>
      );
    }
    return components;
  };
  return <>{renderComponents()}</>;
});

export default FeatureYoga;
