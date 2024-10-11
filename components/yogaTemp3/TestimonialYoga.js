import React from "react";

import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentDuplicateIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useRef, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

const TestimonialYoga = forwardRef((props, ref) => {
  const [count, setCount] = useState(1);
  let {
    fromPage,
    dataObj,
    saveChanges = () => {},
    themeColorPrimary, themeColorSecondary, themeColorTertiary,
    fontFam,
  } = props;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
              className={`group bg-${themeColorPrimary.name}-50 bg-cover object-cover object-center sm:w-full w-full pt-20 pb-24 px-4 md:px-20 lg:px-56 h-[900px] sm:h-full bg-opacity-100`}
              style={{ backgroundImage: `url('/yogatemp3/Group 241.png')` }}
            >
              <div className="flex justify-center items-center border-8 border-white rounded-lg border-opacity-95 pt-12 pb-8">
                <div
                  onClick={() => {
                    handleSaveChanges("edit", dataObj?.key, "carousel");
                  }}
                  className="w-72 sm:w-[500px] md:w-[550px]  lg:w-full   items-center justify-center  px-6 h-full"
                >
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    className="w-full max-w-3xl m-auto"
                    renderArrowPrev={(clickHandler, hasPrev) => {
                      return (
                        <div
                          className={`${
                            hasPrev ? "absolute" : "hidden"
                          } top-28 left-0 flex justify-center items-center p-3 opacity-50 hover:opacity-100 cursor-pointer z-20`}
                          onClick={clickHandler}
                        >
                          <ArrowLeftCircleIcon className="w-9 h-9 text-white" />
                        </div>
                      );
                    }}
                    renderArrowNext={(clickHandler, hasNext) => {
                      return (
                        <div
                          className={`${
                            hasNext ? "absolute" : "hidden"
                          } top-28 right-0 flex justify-center items-center p-3 opacity-50 hover:opacity-100 cursor-pointer z-20`}
                          onClick={clickHandler}
                        >
                          <ArrowRightCircleIcon className="w-9 h-9 text-white" />
                        </div>
                      );
                    }}
                  >
                    {dataObj?.data?.testimonials.map((item, index) => {
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-64 object-cover"
                          />
                          <div className="p-4 text-center">
                            <h2
                              className={classNames(
                                "text-xl text-yogatext3 font-bold",
                                fontFam?.name
                              )}
                            >
                              {item.name}
                            </h2>
                            <p
                              className={classNames(
                                "text-yogatext3 font-semibold",
                                fontFam?.name
                              )}
                            >
                              {item.designation}
                            </p>
                            <p
                              className={classNames(
                                "mt-2 text-yogatext3 mb-4 lg:mb-8",
                                fontFam?.name
                              )}
                            >
                              {item.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>

              {fromPage == "edit" && (
                <div className="sm:absolute absolute-none right-1 top-1 mt-2 z-20 bg-gray-800  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => handleSaveChanges("up", dataObj.key)}
                  >
                    <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => handleSaveChanges("down", dataObj.key)}
                  >
                    <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      // handleSaveChanges("edit", dataObj?.key);
                      setCount(count + 1);
                    }}
                  >
                    <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() =>
                      handleSaveChanges("generateai", dataObj.key, "hero")
                    }
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

export default TestimonialYoga;
