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

const cardData = [
  {
    imageurl: "/tf1.png",
    title: "Dignissi Veritasi coluptas",
    description:
      "Fugit mollitia est. Aut sit mollitia. Est delectus nisi qui sit veniam",
  },
  {
    imageurl: "/tf2.png",
    title: "Praesent Dapibus, neque id",
    description:
      "Liogui mollitia est. Aut sit mollitia. Est delectus nisi qui sit veniam",
  },
  {
    imageurl: "/tf3.png",
    title: "Sedadipis Cing ornare risus",
    description:
      "Eros mollitia est. Aut sit mollitia. Est delectus nisi qui sit veniam",
  },
  {
    imageurl: "/tf4.png",
    title: "Nam nulla Quam, gravida no",
    description:
      "Semtris mollitia est. Aut sit mollitia. Est delectus nisi qui sit veniam",
  },
];

const FeatureTemp3 = forwardRef((props, ref) => {
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
    <div
      ref={ref}
      id={dataObj.key}
      className={classNames(
        "group relative",
        //   themeColor.bgColor,
        fontFam?.name
      )}
    >
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "mx-auto max-w-full px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl sm:max-w-7xl lg:px-8 lg:pt-24"
        )}
      >
        <div className="grid 2xl:grid-cols-4 md:grid-cols-2 gap-10 p-4 xl:p-28 font-Poppins">
          {dataObj.data.features.map((card, index) => (
            <div
              key={index}
              className="relative  bg-white border-2 border-customblue rounded-2xl shadow-md p-8 "
            >
              <div className="w-[75px] h-[75px] lg:w-[130px] lg:h-[130px] mt-4 ml-4  rounded-lg text-white flex items-center justify-center  bg-customblue">
                <img src={cardData[index]?.imageurl} className="w-6 h-6" />
              </div>
              <h2 className="text-left text-lg lg:text-2xl xl:text-3xl font-bold mt-8 ml-4">
                {card.title}
              </h2>
              <p className="text-left text-gray-700 text-md xl:text-2xl mt-8 mx-4 mb-4">
                {card.description}
              </p>
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
  );
});
export default FeatureTemp3;
