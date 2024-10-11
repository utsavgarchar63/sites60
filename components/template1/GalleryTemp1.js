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
const GalleryTemp1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <>
      <div ref={ref} id={dataObj.key} className={`group bg-white relative py-6 lg:py-0 xl:py-16 xl:px-12`}>
        <h2
          className={`text-center sm:px-0 px-4 text-3xl font-bold tracking-tight text-temp1text lg:text-4xl xl:text-5xl xl:pb-10`}
        >
          {dataObj.data.heading}
        </h2>
        {/* <p className="mt-4 text-lg leading-6 text-gray-500">
    {dataObj.data.subHeading}
  </p> */}
        <div className="grid md:grid-cols-2 sm:px-0 px-2 xl:grid-cols-2 grid-cols-1 xl:space-x-8 pt-8">
          {dataObj.data.gallery.length > 9 && (
            <ul
              role="list"
              className="grid md:grid-cols-3 grid-cols-1 sm:mx-auto xl:gap-5 gap-0 md:items-center"
            >
              {dataObj.data.gallery.slice(0, -1).map((item, index) => (
                // <li key={item.key} className="">
                  <div className="xl:w-52 w-full h-64 xl:h-52 lg:w-36 lg:h-36 sm:px-0 px-4">
                    <img
                      src={item.image}
                      alt=""
                      className="pointer-events-none group-hover:opacity-75  sm:w-48 w-full h-60 sm:h-48 object-center object-cover"
                    />
                  </div>
                // </li>
              ))}
            </ul>
          )}

          {dataObj.data.gallery.length <= 9 && (
            <ul
              role="list"
              className="grid md:grid-cols-3 grid-cols-1 xl:gap-4 gap-0 md:items-center"
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
            <div className="flex items-center aspect-w-full lg:aspect-h- xl:aspect-h-[647px] xl:mb-4 xl:pr-8">
              <img
                src={
                  dataObj.data.gallery[dataObj.data.gallery.length - 1].image
                }
                alt=""
                className="pointer-events-none lg:pt-3 xl:pr-0 lg:pr-9 xl:pt-0 sm:px-0 px-4 object-cover object-center group-hover:opacity-75 max-h-[250px] md:max-h-[500px] xl:max-h-[647px] h-full w-full"
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
      {/* <div
        ref={ref}
        id={dataObj.key}
        className="group relative flex flex-col py-12 justify-center items-center h-full"
      >
        <h1
          className={`text-36px text-${themeColor.name}-500 font-bold mb-6 text-center leading-10 md:text-left text-md sm:text-60px`}
        >
          {dataObj.data.heading}
        </h1>
        <div className="flex flex-col md:flex-row">
          {/* Images for mobile view */}
      {/* <div className="p-4 md:hidden">
            {dataObj.data.gallery({ length: 9 }).map((_, index) => (
              <div key={index} className="p-4">
                {/* Your small images here */}
      {/* <img
                  src={item.image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-[190px] mb-4"
                />
              </div>
            ))}
          </div>  */}
      {/* Images for desktop view */}
      {/* <div className="p-4 md:w-650px md:flex-shrink-0 hidden sm:block">
            <div className="grid grid-cols-3 gap-2">
              {dataObj.data.gallery.map((item, index) => (
                <div key={item.key} className="p-4">
                 
                  <img
                    src={item.image}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-[190px] h-[190px] "
                  />
                </div>
              ))}
            </div>
          </div> */}

      {/* <div className="md:flex-shrink-0">
            {dataObj.data.gallery.length > 9 && (
              <div className="pt-8 md:pl-0">
               
                <img
                  src={
                    dataObj.data.gallery[dataObj.data.gallery.length - 1].image
                  }
                  alt="Big Image"
                  className="object-cover max-w-full max-h-full md:w-[650px] md:h-[650px] ml-7 w-[260px] h-[190px]"
                />
              </div>
            )}
          </div>
        </div> */}

      {/* </div> */}
    </>
  );
});
export default GalleryTemp1;
