import React from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  fontFam,
  ArrowPathIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { forwardRef } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join("");
}
const Testimonial2Temp1 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlideInterval = 5000;

    const autoSlide = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % dataObj.data.testimonials.length
      );
    }, autoSlideInterval);

    return () => clearInterval(autoSlide);
  }, [dataObj.data.testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % dataObj.data.testimonials.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + dataObj.data.testimonials.length) %
        dataObj.data.testimonials.length
    );
  };

  // export const Testimonial2Temp1 = () => {
  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className="group relative py-10 sm:py-24 bg-customgray overflow-hidden"
      >
        <div className="flex flex-col items-center sm:space-y-0 sm:flex-row sm:justify-cente">
          {/* Previous Button */}
          <button onClick={prevSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="0.4"
              stroke="currentColor"
              className="sm:w-20 sm:h-20 w-14 h-14 ml-10 sm:ml-20 mr-14 sm:mr-10 text-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>

          <Carousel
            selectedItem={currentIndex}
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={false}
            swipeable={false}
            useKeyboardArrows={false}
          >
            {dataObj.data.testimonials.map((item, index) => (
              <div className="grid grid-cols-1 md:grid-cols-1 h-64 gap-0 sm:gap-10">
                <div
                  key={index}
                  className="xl:w-full xl:h-52 grid sm:grid-cols-8 items-center justify-center text-center sm:text-left"
                >
                  <div className="flex flex-col xl:w-32 xl:h-44 lg:w-28 lg:h-28 w-24 h-28 mx-auto items-center justify-center text-center sm:text-left">
                    <img
                      src={item.image}
                      alt="User Profile"
                      className="object-cover object-center sm:w-32 sm:h-32 w-20 h-20 mt-4 mb-0 mx-auto"
                    />
                    <p className="font-semibold text-sm text-left font-poppins text-temp1text mt-2 space-x-10">
                      {item.name}
                    </p>
                  </div>

                  <div className="sm:items-end items-center lg:w-[500px] text-center sm:text-left xl:w-[940px] xl:pl-40">
                    <p className="sm:pt-8 text-custom-gray sm:ml-4 text-opacity-80 sm:p-8 sm:px-0 px-6 font-normal text-sm sm:text-2xl leading-7 font-poppins text-left ml-0">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          {/* Next Button */}
          <div>
            <button onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="0.4"
                stroke="currentColor"
                className="w-14 h-14 sm:w-20 sm:h-20  sm:mr-28 sm:ml-10 text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  hidden py-1 px-2 space-x-2 rounded-md">
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
export default Testimonial2Temp1;
