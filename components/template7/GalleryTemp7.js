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

const GalleryTemp7 = forwardRef((props, ref) => {
  // export default function Gallery1({ fromPage, dataObj, saveChanges, themeColor, fontFam }) {

  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <>
      <div ref={ref} id={dataObj.key} className={`group relative py-16 px-8`}>
        <div className=" px-6 py-6 xl:px-20 xl:py-24 bg-herot7">
          <div className="text-center  mb-10 xl:mb-20">
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-customt32">
              {dataObj.data.heading}
            </p>
            <p className="text-lg md:text-lg lg:text-2xl xl:text-4xl 2xl:text-6xl font-bold text-customt32">
              {dataObj.data.subheading}
            </p>
          </div>
          <div className="flex flex-col xl:flex-row  ">
            <div className="w-full xl:w-1/2 mb-10 xl:mb-0 ">
              <div className="flex">
                <div className="w-full">
                  <img
                    src={dataObj.data.gallery[0].image}
                    alt="Image 1"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex  mt-8 space-x-6">
                <div className="w-full">
                  <img
                    src={dataObj.data.gallery[1].image}
                    alt="Image 1"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full">
                  <img
                    src={dataObj.data.gallery[2].image}
                    alt="Image 1"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/2 ">
              <div className="flex gap-6">
                <div className="w-full xl:ml-8 ">
                  <img
                    src={dataObj.data.gallery[3].image}
                    alt="Image 1"
                    className="max-w-full h-full  object-contain"
                  />
                </div>
                <div className="w-full space-y-8">
                  <img
                    src={dataObj.data.gallery[4].image}
                    alt="Image 1"
                    className="w-full h-auto object-contain "
                  />
                  <img
                    src={dataObj.data.gallery[5].image}
                    alt="Image 1"
                    className="w-full h-auto object-contain"
                  />
                </div>
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
    </>
  );
});

export default GalleryTemp7;
