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
const Testimonial2Temp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges } = props;

  return (
    <div ref={ref} id={dataObj.key} className="group relative bg-white lg:p-14 xl:p-20">
      <div className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:p-0 p-6  gap-6 lg:gap-14  xl:gap-20">
          {dataObj.data.testimonials.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="bg-temp4bggreen sm:h-[400px] py-8 xl:py-10 border-custom-border rounded-lg"
            >
              <img
                src={item.image}
                alt={`Testimonial ${index + 1}`}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover mx-auto mb-4 sm:mb-0 rounded-full"
              />
              <p className="text-custom-gray tracking-tight text-opacity-75 px-6 xl:px-10 mb-2 sm:mb-0 leading-5 xl:leading-8 sm:my-6 text-sm md:text-lg xl:text-xl font-poppins text-center">
                {item.content}
              </p>
              <hr className="my-3 sm:my-5 border-t-2 border-opacity-80 font-poppins mx-auto  mb-2 sm:mb-4 w-12 sm:w-16 border-gray-500" />
              <h1 className="text-temp4text sm:my-0 my-2 text-xs sm:text-lg font-poppins font-semibold text-center">
                {item.name}
              </h1>
              <p className="text-temp4text sm:py-1 text-xs sm:text-xs font-poppins text-center">
                {item.designation}
              </p>
            </div>
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
  );
});
export default Testimonial2Temp4;
