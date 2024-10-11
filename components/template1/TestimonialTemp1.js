import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeBracketIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TestimonialTemp1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges } = props;

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className="group relative bg-customgray p-6 xl:p-20"
      >
        <div className="relative bg-customgray opacity-100 font-light text-gray-700">
          {dataObj.data.testimonials.slice(0, 1).map((item, index) => (
            <div className="sm:flex flex-cols-1 sm:space-y-0 space-y-5 bg-customgray lg:space-x-8 xl:space-x-20">
              <div className="sm:w-1/2 lg:h-[300px] xl:h-[386px] grid grid-cols-1 sm:grid-cols-3 justify-start items-start lg:p-5 xl:p-10 bg-white space-y-4 sm:space-x-4 w-full h-64">
                <img
                  src={item.image}
                  alt="Left Image"
                  className="xl:w-32 xl:h-32 lg:w-24 lg:h-24 w-20 sm:mt-4  mt-6 h-20  object-cover rounded-full mx-auto sm:mb-0 sm:col-span-1 max-w-screen-sm"
                />
                <div className="text-custom-gray sm:px-0 px-6 font-poppins sm:col-span-2">
                  <p className="text-sm sm:text-lg text-center lg:text-left xl:text-left leading-1 font-poppins text-opacity-75 text-gray-600">
                    {item.content}
                  </p>
                </div>
              </div>

              <div className="sm:w-1/2 lg:h-[300px] xl:h-[386px] grid grid-cols-1 sm:grid-cols-3 justify-start items-start lg:p-5 xl:p-10 bg-white space-y-4 sm:space-x-4 w-full h-64">
                <img
                  src={item.image}
                  alt="Left Image"
                  className="xl:w-32 xl:h-32 lg:w-24 lg:h-24 w-20 h-20 sm:mt-4 mt-6 object-cover rounded-full mx-auto sm:mb-4 sm:col-span-1 max-w-screen-sm"
                />
                <div className="text-custom-gray sm:px-0 px-6 font-poppins sm:col-span-2">
                  <p className="text-sm sm:text-lg text-center lg:text-left xl:text-left leading-1 font-poppins text-opacity-75 text-gray-600">
                    {item.content}
                  </p>
                </div>
              </div>
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
    </>
  );
});
export default TestimonialTemp1;
