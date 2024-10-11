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
} from "@heroicons/react/24/outline";

import UploadImage from "./UploadImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditClient({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
}) {
  console.log("Data Object>>>>", dataObj);
  const schema = z.object({
    heading: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(300, { message: "Max 300 characters" }),

    client: z.array(
      z.object({
        // image: z
        //   .string()
        //   .url({ message: "Invalid Gallery Image" }),
        // heading: z
        //   .string()
        //   .min(3, { message: "Min 3 characters" })
        //   .max(500, { message: "Max 500 characters" }),
        // subHeading: z
        //   .string()
        //   .min(2, { message: "Min 2 characters" })
        //   .max(500, { message: "Max 500 characters" }),
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

  useEffect(() => {
    if (saveClicked == true) {
      resetClick();
      handleSubmit(onSubmit)();
    }
  }, [saveClicked]);

  const imageChanged = (type, image, index) => {
    console.log("Index>>>", index);

    let img = "";

    if (type != "delete") {
      img = image;
    }

    changeListValue(index, img, "image");
  };

  const changeListValue = (index, value, type) => {
    console.log("index>>>>", index);
    console.log("value>>>>", value);
    console.log("type>>>>", type);
    let list = dataObj.data.client;

    if (type == "heading") {
      list[index].heading = value;
    } else if (type == "subHeading") {
      list[index].subHeading = value;
    } else if (type == "image") {
      list[index].image = value;
    } else if (type == "delete") {
      list.splice(index, 1);
    } else if (type == "add") {
      list.push({
        heading: "Product Heading",
        subHeading: "Sub Heading",
        image:
          "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
      });
    }

    editSection(dataObj.key, "client", list);
  };

  const onSubmit = async (submitData) => {
    console.log("Save Changes>>>>>>", submitData);
    updateData();
  };

  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />
        <h1 className="p-2">
          Section Id:{" "}
          <span className=" font-bold">
            {dataObj?.section_id}-{dataObj?.key}
          </span>
        </h1>
        <form className="mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
              errors.heading
                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          >
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
            >
              client Section Heading
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
                value={dataObj.data.heading}
                onChange={(e) =>
                  editSection(dataObj.key, "heading", e.target.value)
                }
              />
            </div>
            {errors.heading && (
              <p className="mt-2 text-xs text-red-500">
                {errors.heading.message}
              </p>
            )}
          </div>

          <div className="mt-2 w-full py-2">
            <div>
              <div className="mt-2 flex justify-center mx-auto text-left">
                <ul role="list" className="w-full">
                  {dataObj.data.client.map((item, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-center space-x-4 justify-start w-full">
                        {/* <Bars4Icon
                            className="block h-6 w-6 border-none text-gray-400"
                            aria-hidden="true"
                          /> */}
                        <div className="isolate -space-y-px rounded-md shadow-sm w-full">
                          <div
                            className={`appearance-none relative w-full px-3 py-2 border rounded-md rounded-b-none shadow-sm sm:text-sm ${
                              errors.client?.[index]?.heading
                                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                          >
                            <label
                              htmlFor="name"
                              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                            >
                              Product Heading
                            </label>
                            <input
                              type="text"
                              {...register(`client.${index}.heading`)}
                              onChange={(e) => {
                                changeListValue(
                                  index,
                                  e.target.value,
                                  "heading"
                                );
                              }}
                              value={item.heading}
                              placeholder="New Label"
                              className="block w-full border-0 p-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                            />
                            <span className="invalid-feedback text-xs text-red-500">
                              {errors.client?.[index]?.heading?.message}
                            </span>
                          </div>
                          <div
                            className={`appearance-none relative w-full px-3 py-2 border shadow-sm placeholder-gray-400  sm:text-sm ${
                              errors.client?.[index]?.subHeading
                                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                          >
                            <label
                              htmlFor="name"
                              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                            >
                              Product SubHeading
                            </label>
                            <input
                              type="text"
                              {...register(`client.${index}.subHeading`)}
                              onChange={(e) => {
                                changeListValue(
                                  index,
                                  e.target.value,
                                  "subHeading"
                                );
                              }}
                              value={item.subHeading}
                              placeholder="New Label"
                              className="block w-full border-0 p-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                            />
                            <span className="invalid-feedback text-xs text-red-500">
                              {errors.client?.[index]?.subHeading?.message}
                            </span>
                          </div>
                          <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
                            <label
                              htmlFor="name"
                              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                            >
                              Feature Image
                            </label>

                            <UploadImage
                              size={`small-round`}
                              index={index}
                              imageUrl={item.image}
                              imageChanged={imageChanged}
                            />

                            <span className="invalid-feedback text-red-500 text-xs">
                              {errors.client?.[index]?.image?.message}
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            changeListValue(index, "", "delete");
                          }}
                          className="cursor-pointer"
                        >
                          <a className="inline-flex items-center rounded-full border border-transparent bg-red-500 px-1 py-1 text-sm font-medium leading-5 text-white shadow-sm">
                            <TrashIcon className="h-4 w-4 text-white font-medium" />
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {dataObj.data.client.length < 12 && (
                <div
                  onClick={() => {
                    changeListValue(0, "", "add");
                  }}
                  className="cursor-pointer mt-6 flex items-center justify-start w-full mb-20"
                >
                  <a className="flex w-96 items-center justify-center space-x-1 rounded-md shadow border border-indigo-200 bg-indigo-200 px-4 py-2 text-sm font-medium text-orange-500 shadow-sm">
                    <PlusCircleIcon className="h-5 w-5 text-orange-500 font-medium" />
                    <span>Add New Item</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
