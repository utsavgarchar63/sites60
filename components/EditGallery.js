import { useEffect } from "react";
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

import UploadImage from "./UploadImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditGallery({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
  showWhichContent,
}) {
  const schema = z.object({
    heading: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(600, { message: "Max 300 characters" }),
    subHeading: z
      .string()
      //  .min(3, { message: "Min 3 characters" })
      .max(900, { message: "Max 900 characters" })
      .optional(),

    gallery: z.array(
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
    console.log("Type>>>", type);
    console.log("Image>>>", image);
    console.log("ImageChanged....");
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
    let list = dataObj.data.gallery;
    console.log("Data:", dataObj.data);

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

    editSection(dataObj.key, "gallery", list);
  };

  const onSubmit = async (submitData) => {
    console.log("Save Changes>>>>>>", submitData);

    console.log("Heeeerrrrrrrrrrrrr");
    updateData();
  };

  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />
        {/* <h1 className="p-2">
          Section Id:{" "}
          
          {JSON.stringify(errors)}
          <span className=" font-bold">
            {dataObj?.section_id}-{dataObj?.key}
          </span>
        </h1> */}
        <form className="mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {showWhichContent == "heading" && (
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
                Gallery Section Heading
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
          )}

          {showWhichContent == "subheading" && (
            <>
              {dataObj.data.subHeadingShow && (
                <>
                  <div
                    className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                      errors.subHeading
                        ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                  >
                    <label
                      htmlFor="subHeading"
                      className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                    >
                      Gallery Section Sub Heading
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        autoComplete="subHeading"
                        {...register("subHeading", {})}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                        value={dataObj.data.subHeading}
                        onChange={(e) =>
                          editSection(dataObj.key, "subHeading", e.target.value)
                        }
                      />
                    </div>
                    {errors.subHeading && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.subHeading.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          {showWhichContent == "carousel" && (
            <div className="mt-2 w-full py-2">
              <div>
                <div className="mt-2 flex justify-center mx-auto text-left">
                  <ul role="list" className="relative w-full grid grid-cols-1">
                    {dataObj.data.gallery.map((item, index) => (
                      <li key={index} className="py-3">
                        <div className="flex items-center space-x-4 justify-start w-full">
                          {/* <Bars4Icon
                            className="block h-6 w-6 border-none text-gray-400"
                            aria-hidden="true"
                          /> */}

                          <div className="isolate -space-y-px rounded-md shadow-sm w-full">
                            {dataObj.data.galleryHeadingShow && (
                              <>
                                <div
                                  className={`appearance-none relative w-full px-3 py-2 border rounded-md rounded-b-none shadow-sm sm:text-sm ${
                                    errors.gallery?.[index]?.heading
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
                                    {...register(`gallery.${index}.heading`)}
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
                                    {errors.gallery?.[index]?.heading?.message}
                                  </span>
                                </div>
                              </>
                            )}

                            {dataObj.data.gallerySubHeadingShow && (
                              <>
                                <div
                                  className={`appearance-none relative w-full px-3 py-2 border shadow-sm placeholder-gray-400  sm:text-sm ${
                                    errors.gallery?.[index]?.subHeading
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
                                    {...register(`gallery.${index}.subHeading`)}
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
                                    {
                                      errors.gallery?.[index]?.subHeading
                                        ?.message
                                    }
                                  </span>
                                </div>
                              </>
                            )}

                            <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-4 focus-within:z-10 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
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
                                Gallery Image
                              </label>
                              <div
                                className={`appearance-none relative w-full h-12 md:h-14 px-3 py-2 my-4 border rounded-md rounded-b-none shadow-sm text-sm ${
                                  errors.features?.[index]?.title
                                    ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
                                }`}
                              >
                                <label
                                  htmlFor="name"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                                >
                                  Feature Heading
                                </label>
                                <input
                                  type="text"
                                  {...register(`features.${index}.heading`)}
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
                                  {errors.features?.[index]?.title?.message}
                                </span>
                              </div>
                              <UploadImage
                                size={`small-round`}
                                index={index}
                                imageUrl={item.image}
                                imageChanged={imageChanged}
                                section={dataObj?.section_id}
                              />
                              <span className="invalid-feedback text-red-500 text-xs">
                                {errors.gallery?.[index]?.image?.message}
                              </span>
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

                {dataObj.data.gallery.length < dataObj.data.maxElements && (
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
          )}
          {dataObj.data.gallery.length < 12 && (
            <div
              onClick={() => {
                changeListValue(0, "", "add");
              }}
              className="cursor-pointer mt-6 flex items-center justify-center w-full mb-20"
            >
              <a className="flex w-60 items-center justify-center space-x-1 rounded-md  border border-orange-500 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm">
                <PlusCircleIcon className="h-5 w-5  font-medium" />
                <span>Add New Gallery</span>
              </a>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
