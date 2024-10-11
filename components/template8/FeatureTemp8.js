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
  
  import { featherIconsList } from "../../lib/genericData";
  import { useState, useEffect, forwardRef } from "react";
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  const FeatureTemp8 = forwardRef((props, ref) => {
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
      <div
        className="pt-8 
        px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24
        pb-2 sm:pb-4 md:pb-8 lg:pb-12 xl:pb-16 2xl:pb-20 space-x-2 sm:space-x-10 md:space-x-4 xl:space-x-0 bg-customblack font-Poppins "
      >
        <div className="mt-2 mb-10 sm:mb-0 grid grid-cols-1 text-gray-300 sm:grid-cols-3 sm:mt-6 md:mt-10 lg:mt-16 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 space-y-6 sm:space-y-6 md:space-y-6 lg:space-y-0  gap-2 sm:gap-10  lg:gap-14 mx-auto justify-center w-full">
          {dataObj.data.features.map((feature, index) => (
            <div
              key={feature.title}
              className="border border-customt8 rounded-lg max-w-full h-auto"
            >
              <div>
                <FeatherIcon
                  src={feature.icon}
                  alt="icon"
                  className="flex w-8 md:w-12 xl:w-16 2xl:w-16 h-12 md:h-16 xl:h-20 2xl:h-20  ml-6 md:ml-32 lg:ml-12 xl:ml-16 2xl:ml-20 mt-10 items-center justify-center rounded-md bg-opacity-10"
                />{" "}
              </div>
              <div className="mt-6 px-6  sm:px-4 md:px-32 lg:px-12 xl:px-16 2xl:px-20 mb-10 flex items-center ">
                <p className="text-left text-md md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-20 mr-3 text-customt8">
                  {(index + 1).toString().padStart(2, "0")}.
                </p>
  
                <p className="mt-2 ml-3 mb-10 text-md md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl text-customt32 w-80 h-20">
                  {feature.description}
                </p>
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
    );
  })
  export default FeatureTemp8;
