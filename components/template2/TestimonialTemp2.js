import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TestimonialTemp2 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges } = props;
  return (
    <>
      <div ref={ref} id={dataObj.key} className={`group relative`}>
        <div
          className={classNames(
            fromPage == "edit" ? " " : " group-hover:none",
            "overflow-hidden bg-custombgorange lg:h-[495px]"
          )}
        >
          <div className=" w-full flex flex-col items-center justify-center py-6 sm:py-14">
            <div class="py-10">
              <div class="relative h-44 w-80 p-4 sm:w-[859px] sm:h-[225px] sm:px-2 py-2 sm:py-12 rounded-lg border border-gray-100 bg-white shadow-lg">
                <div class="absolute left-1/2 justify-center bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-100 bg-white"></div>
                <div class="px-8">
                  <h1 class="sm:text-sm sm:mb-2 text-xs font-bold text-center font-poppins text-temp2text">
                    {dataObj?.data?.testimonials[0]?.designation}
                  </h1>
                  <div className="flex justify-center items-center ">
                    <img
                      src="/Group 111.svg"
                      alt="Image 3"
                      className="sm:w-8 w-4 h-4 sm:h-10 sm:mr-4"
                    />

                    <div>
                      <p className="text-gray-900 font-base font-poppins text-center sm:leading-6 leading-tight text-xs sm:text-lg mt-2">
                        {dataObj?.data?.testimonials[0]?.content}
                      </p>
                    </div>

                    <img
                      src="/Group 111.svg"
                      alt="Image 3"
                      className="sm:w-8 w-4 h-4 sm:h-10 mt-4 sm:ml-6 transform rotate-[5deg] scale-x-[-1]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                {dataObj.data?.testimonials
                  .slice(0, 3)
                  .map((testimonial, index) => (
                    <img
                      key={index}
                      src={testimonial?.image}
                      alt={`Image ${index + 1}`}
                      className={`sm:w-14 w-10 h-10 sm:h-14 object-cover object-center rounded-full ${
                        index < 2 ? "mr-4" : ""
                      }`}
                    />
                  ))}
              </div>
              <div>
                <p className=" text-xs sm:text-16px leading-6 pt-2 font-poppins font-thin text-opacity-90 text-white text-center">
                  {dataObj?.data?.testimonials[0]?.name}
                </p>
              </div>
            </div>
          </div>

          {fromPage == "edit" && (
            <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
              <span
                className="cursor-pointer p-1"
                onClick={() => {
                  saveChanges("up", dataObj?.key);
                }}
              >
                <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
              </span>
              <span
                className="cursor-pointer p-1"
                onClick={() => {
                  saveChanges("down", dataObj?.key);
                }}
              >
                <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
              </span>
              <span
                className="cursor-pointer p-1"
                onClick={() => {
                  saveChanges("edit", dataObj?.key);
                }}
              >
                <PencilIcon className="w-5 h-5 mr-2 text-gray-100" />
              </span>
              <span
                className="cursor-pointer p-1"
                onClick={() => {
                  saveChanges("generateai", dataObj?.key, "testimonials");
                }}
              >
                <ArrowPathIcon className="w-5 h-5 mr-2 text-gray-100" />
              </span>

              <span
                className="cursor-pointer p-1"
                onClick={() => {
                  saveChanges("delete", dataObj?.key);
                }}
              >
                <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
});
export default TestimonialTemp2;
