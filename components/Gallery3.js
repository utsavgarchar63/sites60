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

const Gallery3 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor } = props;
  // export default function Gallery2({ fromPage, dataObj, saveChanges, themeColor }) {
  return (
    <>
      <div ref={ref} id={dataObj.key} className={`group relative`}>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-8 sm:py-12 lg:px-8">
            <div className="flex flex-col items-center justify-between lg:flex-row gap-8 px-4 sm:px-8 lg:px-0">
              <div className="mt-3">
                <h2 className="max-w-xl text-center lg:text-left text-3xl font-bold tracking-tight text-gray-700 lg:max-w-xl lg:text-3xl">
                  Trusted by
                </h2>
              </div>
              <div className="mt-8 mx-auto lg:mt-0 gap-5 flex justify-end lg:gap-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 object-cover">
                  {dataObj.data.gallery.slice(0, 4).map((item, index) => (
                    <div key={item.key}>
                      <img
                        className="max-h-36 max-w-xs w-full object-cover"
                        src={item.image}
                        alt={item.alt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Gallery3;
