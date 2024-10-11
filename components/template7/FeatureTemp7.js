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

const featuresarray = [
  {
    imageUrl: "/ft71.png",
    description:
      "Labore et dolore magna erat, sed diam voluptua. et accusam et justo",
  },
  {
    imageUrl: "/ft72.png",
    description: "Eirmod tempor invidunt ut dolore magna aliquya diam voluptua",
  },
  {
    imageUrl: "/ft73.png",
    description: "Corem ipsum dolor sit consetetur sadip scing Lectus in donec",
  },
];
const FeatureTemp7 = forwardRef((props, ref) => {
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
          "relative mx-auto max-w-full ",
          fontFam?.name
        )}
      >
        <div className="mx-auto max-w-full p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24 font-Poppins bg-customblack">
          <div className="mx-auto max-w-4xl lg:mx-0">
            <h6 className="mb-4 text-herot7 font-bold text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl ">
              {dataObj.data.title}
            </h6>
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-4xl 2xl:text-6xl font-bold tracking-tight text-customt32">
              {dataObj.data.subtitle}
            </h2>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {dataObj.data.features.map((action, actionIdx) => (
              <div key={action.title} className="relative ">
                <dt>
                  <img
                    src={featuresarray[actionIdx]?.imageUrl}
                    className={`absolute mt-4 h-8 w-8 md:h-8 md:w-8 lg:h-12 lg:w-12 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20 text-white  `}
                    aria-hidden="true"
                  />
                </dt>
                <dd className="mt-2 pl-16 lg:pl-20 xl:pl-24 2xl:pl-28 text-sm sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl leading-7 text-customt32 w-auto  2xl:w-3/4 break-all h-truncate">
                  {action.description}
                </dd>
                <div className=" divide-x divide-customt31" />
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
});
export default FeatureTemp7;
