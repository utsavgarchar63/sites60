import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Bars4Icon,
  TrashIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import ChooseIcon from "./ChooseIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditFeature({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
  generateAIContent,
  aiLoading,
  showWhichContent,
}) {
  const schema = z.object({
    heading: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(300, { message: "Max 300 characters" }),
    subHeading: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(1000, { message: "Max 1000 characters" }),
    features: z.array(
      z.object({
        title: z
          .string()
          .min(3, { message: "Min 3 characters" })
          .max(300, { message: "Max 300 characters" }),
        description: z
          .string()
          .min(10, { message: "Min 10 characters" })
          .max(1000, { message: "Max 1000 characters" }),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const resetClick = () => {
    changeClick();
  };

  const getAIContent = () => {
    generateAIContent(dataObj.key, "features");
  };

  useEffect(() => {
    if (saveClicked == true) {
      resetClick();
      handleSubmit(onSubmit)();
    }
  }, [saveClicked]);

  const changedIcon = (index, icon) => {
    changeListValue(index, icon, "icon");
  };

  const changeListValue = (index, value, type) => {
    console.log("index>>>>", index);
    console.log("value>>>>", value);
    console.log("type>>>>", type);
    let list = dataObj.data.features;

    if (type == "title") {
      list[index].title = value;
    } else if (type == "description") {
      list[index].description = value;
    } else if (type == "icon") {
      list[index].icon = value;
    } else if (type == "delete") {
      list.splice(index, 1);
    } else if (type == "add") {
      list.push({
        title: "New Feature",
        description: "New Feature is so awesome dude",
        icon: "core/activity",
      });
    }

    editSection(dataObj.key, "features", list);
  };

  const onSubmit = async (submitData) => {
    updateData();
  };

  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />
        {/* <h1 className="p-2">
          Section Id:{" "}
          <span className=" font-bold">
            {dataObj?.section_id}-{dataObj?.key}
          </span>
        </h1> */}

        {showWhichContent == "aicontent" && (
          <div className="mt-2">
            {aiLoading == false && (
              <button
                onClick={() => getAIContent()}
                type="button"
                className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              >
                Generate AI Content
              </button>
            )}

            {aiLoading == true && (
              <div class="flex items-center justify-center h-screen absolute ">
                <div
                  class="inline-flex bg-white items-center px-8 py-6 font-semibold leading-6 text-md shadow rounded-md text-gray-700  transition ease-in-out duration-150 cursor-not-allowed"
                  disabled
                >
                  <svg
                    class="animate-spin -ml-1 mr-3 h-8 w-8 text-orange-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Content using AI...
                </div>
              </div>
            )}
          </div>
        )}
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {showWhichContent == "heading" && (
            <div
              className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                errors.heading
                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              }`}
            >
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
              >
                Section heading
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  autoComplete="name"
                  {...register("heading", {
                    required: true,
                  })}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                  maxLength={50}
                  value={dataObj.data.title}
                  onChange={(e) =>
                    editSection(dataObj.key, "title", e.target.value)
                  }
                />
              </div>
              {errors.heading && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.heading.message}
                </p>
              )}
            </div>
          )}

          {showWhichContent == "subheading" && (
            <div
              className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                errors.subHeading
                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              }`}
            >
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
              >
                Section sub heading
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  maxLength={100}
                  autoComplete="name"
                  {...register("subHeading", {
                    required: true,
                  })}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                  value={dataObj.data.subtitle}
                  onChange={(e) =>
                    editSection(dataObj.key, "subtitle", e.target.value)
                  }
                />
              </div>
              {errors.subHeading && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.subHeading.message}
                </p>
              )}
            </div>
          )}

          {showWhichContent == "carousel" && (
            <div className="mt-2 w-full py-2">
              <div>
                <div className="mt-2 flex justify-center mx-auto text-left">
                  <ul role="list" className="w-full grid grid-cols-1">
                    {dataObj.data.features.map((item, index) => (
                      <li key={index} className="py-3">
                        <div className="flex items-center space-x-4 justify-start w-full ">
                          {/* <Bars4Icon
                            className="block h-6 w-6 border-none text-gray-400"
                            aria-hidden="true"
                          /> */}
                          <div className="isolate -space-y-px rounded-md shadow-sm w-full ">
                            <div
                              className={`appearance-none relative w-full px-3 py-2 border rounded-md rounded-b-none shadow-sm sm:text-sm ${
                                errors.features?.[index]?.title
                                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
                              }`}
                            >
                              <div
                                onClick={() => {
                                  changeListValue(index, "", "delete");
                                }}
                                className="cursor-pointer"
                              >
                                <XMarkIcon className="text-red-500 bg-white border border-red-500 rounded-sm absolute w-4 h-4 -right-1 -top-1" />
                              </div>
                              <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                              >
                                Feature Heading
                              </label>
                              <input
                                type="text"
                                {...register(`features.${index}.title`)}
                                onChange={(e) => {
                                  changeListValue(
                                    index,
                                    e.target.value,
                                    "title"
                                  );
                                }}
                                value={item.title}
                                placeholder="New Label"
                                className="block w-full border-0 p-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                              />
                              <span className="invalid-feedback text-xs text-red-500">
                                {errors.features?.[index]?.title?.message}
                              </span>
                            </div>
                            <div
                              className={`appearance-none relative w-full px-3 py-2 border shadow-sm placeholder-gray-400  sm:text-sm ${
                                errors.features?.[index]?.description
                                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
                              }`}
                            >
                              <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                              >
                                Feature Description
                              </label>
                              <input
                                type="text"
                                {...register(`features.${index}.description`)}
                                onChange={(e) => {
                                  changeListValue(
                                    index,
                                    e.target.value,
                                    "description"
                                  );
                                }}
                                value={item.description}
                                placeholder="New Label"
                                className="block w-full border-0 p-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                              />
                              <span className="invalid-feedback text-xs text-red-500">
                                {errors.features?.[index]?.description?.message}
                              </span>
                            </div>
                            <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
                              <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                              >
                                Feature Links
                              </label>

                              <ChooseIcon
                                index={index}
                                currentIcon={item.icon}
                                changedIcon={changedIcon}
                              />
                            </div>
                          </div>

                          {/* <div
                            onClick={() => {
                              changeListValue(index, "", "delete");
                            }}
                            className="cursor-pointer"
                          >
                            <a className="inline-flex items-center rounded-full border border-transparent bg-red-500 px-1 py-1 text-sm font-medium leading-5 text-white shadow-sm">
                              <TrashIcon className="h-4 w-4 text-white font-medium" />
                            </a>
                          </div> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {dataObj.data.features.length < 8 && (
                  <div
                    onClick={() => {
                      changeListValue(0, "", "add");
                    }}
                    className="cursor-pointer mt-6 flex items-center justify-center w-full mb-20"
                  >
                    <a className="flex w-60 items-center justify-center space-x-1 rounded-md  border border-orange-500 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm">
                      <PlusCircleIcon className="h-5 w-5  font-medium" />
                      <span>Add New Feature</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
