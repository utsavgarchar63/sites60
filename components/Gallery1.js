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

const Gallery1 = forwardRef((props, ref) => {
  // export default function Gallery1({ fromPage, dataObj, saveChanges, themeColor, fontFam }) {

  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group relative bg-white py-14 ${fontFam?.name}`}
      >
        <div className="mx-auto max-w-full lg:mx-0 sm:px-8 px-4">
          <h2
            className={`text-3xl font-bold tracking-tight text-${themeColor.name}-500 sm:text-4xl break-all w-4/4 sm:w-3/4`}
          >
            {dataObj.data.heading}
          </h2>
        </div>
        <div className="w-full border-b border-slate-400 h-0 mt-10"></div>
        <ul
          role="list"
          className="mt-20 mx-auto max-w-full grid grid-cols-1 sm:gap-20 gap-6 sm:grid-cols-3 sm:px-8 px-4"
        >
          {dataObj.data.gallery.map((item, index) => (
            <li key={item.key}>
              <img
                className="aspect-[2/2] w-full object-cover mx-auto"
                src={item.image}
                alt=""
              />
              <p className="text-slate-700 text-md sm:text-2xl py-8 font-thin">
                {item.subHeading}
              </p>
            </li>
          ))}
        </ul>
        {/* </div> */}

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

export default Gallery1;
