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

const Testimonials2 = forwardRef((props, ref) => {
  // export default function Testimonials2({ fromPage, dataObj, saveChanges, themeColor }) {
  let { fromPage, dataObj, saveChanges, themeColor } = props;
  return (
    <div ref={ref} id={dataObj.key} className={`group relative`}>
      <Carousel>
        {dataObj.data.testimonials.map((item, index) => (
          <section className="overflow-hidden bg-white py-10">
            <div
              className={classNames(
                fromPage == "edit"
                  ? " group-hover:bg-gray-300/20"
                  : " group-hover:none",
                "relative mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:py-20"
              )}
            >
              <svg
                className="absolute top-full left-0 translate-x-80 -translate-y-24 transform lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={784}
                  height={404}
                  fill="url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)"
                />
              </svg>

              <svg
                className="absolute right-full top-1/2 hidden translate-x-1/2 -translate-y-1/2 transform lg:block"
                width={404}
                height={784}
                fill="none"
                viewBox="0 0 404 784"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="56409614-3d62-4985-9a10-7ca758a8f4f0"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={784}
                  fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)"
                />
              </svg>

              <div className="relative lg:flex lg:items-center">
                <div className="hidden lg:block lg:flex-shrink-0">
                  <img
                    className="object-cover rounded-full xl:h-80 xl:w-80"
                    src={item.image}
                    alt=""
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>

                <div className="relative lg:ml-10">
                  <svg
                    className="absolute top-0 left-0 h-36 w-36 -translate-x-8 -translate-y-24 transform text-indigo-200 opacity-50"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 144 144"
                    aria-hidden="true"
                  >
                    <path
                      strokeWidth={2}
                      d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
                    />
                  </svg>
                  <blockquote className="relative">
                    <div className="text-2xl font-medium leading-9 text-gray-900">
                      <p>{item.content}</p>
                    </div>
                    <footer className="mt-8">
                      <div className="flex">
                        <div className="flex-shrink-0 lg:hidden">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4 lg:ml-0">
                          <div className="text-base font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div
                            className={`text-base font-medium text-${themeColor.name}-400`}
                          >
                            {item.designation}
                          </div>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </section>
        ))}
      </Carousel>

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
export default Testimonials2;
