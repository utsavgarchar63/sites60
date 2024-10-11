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
const GalleryTemp8 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor } = props;
  return (
    <div ref={ref} id={dataObj.key} className={`group relative`}>
      <div
        className=" 
      pl-4 sm:pl-4 md:pl-8 lg:pl-16 xl:pl-20 2xl:pl-24
      pr-4 sm:pr-4 md:pr-8 lg:pr-16 xl:pr-20 2xl:pr-24
      py-4 sm:py-4 md:py-8 lg:py-12 xl:py-16 2xl:py-20
      
      bg-customtbg font-Poppins"
      >
        <div className="grid md:grid-flow-row lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
          <div className="order-last sm:order-last md:order-last xl:order-first lg:order-first  p-4 ">
            <div className="flex">
              <div className="  ">
                <div className="mb-4 w-full h-full max-w-full max-h-full">
                  <img
                    src={dataObj.data.gallery[0].image}
                    alt="Image 1"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className=" pl-6">
                <div className="grid grid-cols-1  gap-4  mt-6 sm:mt-6 md:mt-16 lg:mt-6  xl:mt-12 2xl:mt-12">
                {dataObj.data.gallery.map((imageSrc, index) => (
                    <img
                      key={index}
                      src={imageSrc.image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-auto"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className=" p-4  ">
            <p className="mb-4 pr-4 sm:pr-4 md:pr-8  2xl:pr-44  pl-4 sm:pl-4 md:pl-2 lg:pl-12 xl:pl-16 2xl:pl-20  mt-10  text-lg sm:text-lg md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-7xl  text-customt32 font-bold">
            {dataObj.data.title}            </p>
            <p className="mt-4  pl-4 sm:pl-4 md:pl-2 lg:pl-12 xl:pl-16 2xl:pl-20  pr-4 sm:pr-8 md:pr-12 2xl:pr-24 text-customt8 text-sm md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
            {dataObj.data.description}
            </p>
            <p className="mt-4  pl-4 sm:pl-4 md:pl-2 lg:pl-12 xl:pl-16 2xl:pl-20 pr-4 sm:pr-8 md:pr-12  2xl:pr-24 text-customt8 text-sm md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
            {dataObj.data.description}
            </p>
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
export default GalleryTemp8;
