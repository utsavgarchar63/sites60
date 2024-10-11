import React, { useState } from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Testimonial2Yoga = forwardRef((props, ref) => {
  const [count, setCount] = useState(1);

  let { fromPage, dataObj, fontFam, saveChanges, themeColorPrimary, themeColorSecondary, themeColorTertiary = () => {} } = props;

  const handleSaveChanges = (action, key, type) => {
    if (typeof saveChanges === "function") {
      saveChanges(action, key, type);
    }
  };

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>
          <>
            <div
              ref={ref}
              id={dataObj?.key}
              className={`group relative bg-${themeColorPrimary.name}-50 py-8 sm:py-20`}
            >
              <div className="grid grid-cols-1 justify-center text-center sm:px-0 px-4 gap-4">
                <h1
                  className={`lg:text-2xl  text-xl text-opacity-90 text-${themeColorSecondary.name}-900 font-bold ${fontFam?.name}`
                  }
                  onClick={() => {
                    handleSaveChanges("edit", dataObj?.key, "heading");
                  }}
                >
                  {dataObj?.data?.title ? dataObj?.data?.title : "Title"}
                </h1>
                <h2
                  className={`text-xl md:3xl lg:text-5xl font-bold text-${themeColorSecondary.name}-800 mb-4 sm:mb-16" ${fontFam?.name}`}
                  onClick={() => {
                    handleSaveChanges("edit", dataObj?.key, "subheading");
                  }}
                >
                  {dataObj?.data?.subtitle ? dataObj?.data?.subtitle : ""}
                </h2>
              </div>

              <div
                className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 sm:px-20 sm:w-full gap-4"
                onClick={() =>
                  handleSaveChanges("edit", dataObj?.key, "carousel")
                }
              >
                {dataObj?.data?.testimonials.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
               lg:h-[400px]              
              border border-gray-300
              
            `}
                  >
                    <div className="p-10 sm:p-8">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-6"
                      />
                      <h3
                        className={`lg:text-2xl md:text-xl text-lg font-bold text-${themeColorSecondary.name}-800 text-opacity-90 mb-4 text-center ${fontFam?.name}`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`
                          text-${themeColorSecondary.name}-800 font-medium text-sm  md:text-base lg:text-lg text-center text-ellipsis line-clamp-6 ${fontFam?.name}`}
                      >
                        {item.content}
                      </p>
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
                      // saveChanges("add", dataObj?.key);
                      setCount(count + 1);
                    }}
                  >
                    <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
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
                      handleSaveChanges("delete", dataObj.key);
                      setCount(count - 1);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                </div>
              )}
            </div>
          </>
        </div>
      );
    }
    return components;
  };

  return <>{renderComponents()}</>;
});

export default Testimonial2Yoga;
