import React from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { forwardRef } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TestimonialTemp4 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor } = props;

  function truncateText(text, maxLength) {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  }

  return (
    <>
      <div className="group relative">
        <div className="grid-1 py-0 xl:py-20 bg-temp4bg h-[450px] lg:h-[460px] xl:h-[670px]">
          <div className="text-center">
            <h2 className="text-24px lg:text-3xl xl:text-6xl xl:py-20 px-3 lg:pt-20 xl:pt-24 sm:pb-0 pb-6 pt-8 items-center justify-center leading-tight font-bold font-poppins text-white text-center">
              {dataObj.data.title}
            </h2>
          </div>
        </div>
        <div className="grid-1 bg-temp4bggreen h-[450px] lg:h-[370px] xl:h-[400px]"></div>

        <div className="flex justify-center">
          <div className=" border-gray-200">
            <div className="z-10 w-80 sm:w-11/12 xl:h-[600px] absolute top-28 lg:top-48 xl:top-96 left-0 right-0 mx-auto rounded-md bg-white grid grid-cols-1 md:grid-cols-2">
              {dataObj.data.testimonials.map((item, index) => (
                <div
                  key={index}
                  className={`text-center relative  ${
                    index % 2 === 0
                      ? "border-r border-opacity-30 border-gray-300"
                      : ""
                  } ${
                    index < dataObj.data.testimonials.length - 2
                      ? "border-b border-opacity-40 border-gray-300"
                      : ""
                  }`}
                  style={{ margin: 0, padding: 0 }}
                >
                  <div className="w-full sm:my-6 px-4 sm:px-8 h-48 h sm:h-60 flex flex-col items-center justify-center">
                    <img
                      src={item.image}
                      alt={`Testimonial ${index + 1}`}
                      className="rounded-full object-cover mb-5 w-16 h-16 sm:w-28 sm:h-28"
                    />
                    <p className="text-custom-gray text-opacity-80 sm:px-8 w-full leading-5 sm:leading-8 text-xs sm:text-lg font-poppins items-center justify-center text-center">
                      {truncateText(item.content, 20)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex   hidden py-1 px-2 space-x-2 rounded-md">
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
export default TestimonialTemp4;
