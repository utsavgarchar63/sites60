import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GalleryTemp3 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor } = props;
  return (
    <div ref={ref} id={dataObj.key} className={`group relative`}>
      <div className="p-6 lg:p-20 font-Poppins">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-1/2 xl:w-2/5 bg-customblue p-4 xl:p-32">
            <h2 className="text-lg lg:text-2xl xl:text-4xl font-bold tracking-tight text-gray-700">
              {dataObj.data.heading}
            </h2>
            <p className="mt-4 text-md xl:text-2xl text-customt31 pt-20">
              {dataObj.data.heading}
            </p>
          </div>

          <div className="w-full lg:w-1/2 2xl:w-3/5">
            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-4  gap-4 2xl:gap-0">
              {dataObj.data.gallery.map((image, index) => (
                <div key={index} className="h-auto max-w-full mx-4 sm:mx-0">
                  <img src={image.image} alt={`image${index}`} />
                </div>
              ))}
            </div>
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

export default GalleryTemp3;
