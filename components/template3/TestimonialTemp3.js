import {
  AcademicCapIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowPathIcon,
  BanknotesIcon,
  BoltIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  EyeDropperIcon,
  FolderIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../../lib/genericData";
import { useState, useEffect } from "react";

import { forwardRef } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const cardData = [
  {
    image: "/test.png",
    image1: "/gt3.png",
    title: "Quinton",
    subtitle: "consequatur",
    description:
      "Dolorem voluptatem non quaerat qui voluptas iure dicta repellat minima",
  },
  {
    image: "/test2.png",
    image1: "/gt3.png",

    title: "Darien",
    subtitle: "repellat",
    description:
      "Iusto corrupti dolorum ullam veritatis odio quae alias nisi laudantium lorem",
  },
  {
    image: "/test3.png",
    image1: "/gt3.png",

    title: "Foster",
    subtitle: "placeat",
    description:
      "Ut sed nesciunt sequi non quis non provident natus harum fugit delectus",
  },
  {
    image: "/test4.png",
    image1: "/gt3.png",

    title: "Lionel",
    subtitle: "suscipit",
    description:
      "Amet iusto autem voluptatem porro omnis necessitatibus ipsam repellendus",
  },
];

const TestimonialTemp3 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, fontFam, themeColor } = props;

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
    <div ref={ref} className="group relative bg-slate-100">
      <div
        id={dataObj.key}
        className={classNames(
          fromPage == "edit"
            ? `group-hover:bg-slate-300/20`
            : "group-hover:none",
          "mx-auto max-w-7xl py-16 px-6 sm:px-8 sm:py-16",
          fontFam?.name
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4  gap-4 p-4 xl:p-20 justify-center items-center font-Poppins">
          {dataObj.data.testimonials.map((card, index) => (
            <div
              key={index}
              className="relative  bg-white border-2 border-customblue rounded-2xl shadow-md p-20 w-full h-full "
            >
              <div className="flex justify-center items-center flex-col">
                <div className="flex items-center justify-center">
                  <img
                    src={cardData[index]?.image1}
                    alt=""
                    className="w-10 h-6"
                  />
                </div>
                <p className="text-center text-customt31 text-2xl  mt-4 ml-4 mr-4 mb-4">
                  {card.description}
                </p>
                <div className="w-20 h-20  bg-blue-500 rounded-full text-white flex items-center justify-center mt-10">
                  <img src={card.image} alt="Image" className="" />
                </div>
                <h2 className="text-center text-2xl font-bold mt-6">
                  {card.title}
                </h2>
                <h4 className="text-center font-light mt-1  text-base text-customt31">
                  {card.subtitle}
                </h4>
              </div>
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
              saveChanges("generateai", dataObj.key, "testimonials");
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
export default TestimonialTemp3;
