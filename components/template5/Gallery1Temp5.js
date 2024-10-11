import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import { forwardRef } from "react";

const Gallery1Temp5 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const imageUrls = [
    "gt5.png",
    "gat52.png",
    "gat53.png",
    "gat54.png",
    "gat55.png",
    "gat56.png",
  ];

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group relative bg-white py-14 ${fontFam?.name}`}
      >
        <div className="p-4 xl:p-20 font-Poppins">
          <h1 className="text-customt5 text-lg md:text-2xl lg:text-4xl xl:text-6xl text-left w-full xl:w-7/12 mb-10 mt-5">
          {dataObj.data.title}
          </h1>
          <div className="grid lg:grid-cols-3 gap-16 ">
            {dataObj.data.gallery.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl.image}
                alt={`Image ${index + 1}`}
                className={`img-526x${index % 2 === 0 ? "619" : "300"} ${
                  index === 4 ? "-mt-80" : ""
                }`}
              />
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

export default Gallery1Temp5;
