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

const Gallery2 = forwardRef((props, ref) => {
  // export default function Gallery1({ fromPage, dataObj, saveChanges, themeColor, fontFam }) {

  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  return (
    <>
      <div ref={ref} id={dataObj.key} className={`group relative py-16 px-8`}>
        <h2
          className={`text-center text-3xl font-bold tracking-tight text-${themeColor.name}-500 sm:text-4xl pb-6`}
        >
          {dataObj.data.heading}
        </h2>
        {/* <p className="mt-4 text-lg leading-6 text-gray-500">
    {dataObj.data.subHeading}
  </p> */}
        <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-20 space-x-0 md:px-16 px-8 pt-8">
          {dataObj.data.gallery.length > 9 && (
            <ul
              role="list"
              className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-0 md:items-center"
            >
              {dataObj.data.gallery.slice(0, -1).map((item, index) => (
                <li key={item.key} className="relative">
                  <div className="overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt=""
                      className="pointer-events-none group-hover:opacity-75 w-full h-44 object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {dataObj.data.gallery.length <= 9 && (
            <ul
              role="list"
              className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-0 md:items-center"
            >
              {dataObj.data.gallery.map((item, index) => (
                <li key={item.key} className="relative">
                  <div className="overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt=""
                      className="pointer-events-none group-hover:opacity-75 w-full h-44 object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {dataObj.data.gallery.length > 9 && (
            <div className="flex items-center">
              <img
                src={
                  dataObj.data.gallery[dataObj.data.gallery.length - 1].image
                }
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75 max-h-[250px] md:max-h-[500px] w-full"
              />
            </div>
          )}
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

export default Gallery2;
