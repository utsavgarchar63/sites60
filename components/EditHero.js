import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImage from "./UploadImage";

export default function EditHero({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
  generateAIContent,
  aiLoading,
  size,
  className,
  showWhichContent,
  textCount
}) {
  const router = useRouter();
  const schema = z.object({
    heading: z
      .string()
      .min(0, { message: "" })
      .max(300, { message: "Max 300 characters" }),
    subHeading: z
      .string()
      .min(0, { message: "" })
      .max(1000, { message: "Max 1000 characters" }),
  });
  console.log(textCount, "textCount");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const notify = (label) => toast(label);

  const imageChanged = (type, image) => {
    if (type == "delete") {
      editSection(dataObj.key, "image", undefined);
    } else {
      editSection(dataObj.key, "image", image);
    }
  };

  const resetClick = () => {
    changeClick();
  };

  const getAIContent = () => {
    generateAIContent(dataObj.key, "hero");
  };

  useEffect(() => {
    if (saveClicked == true) {
      resetClick();
      handleSubmit(onSubmit)();
    }
  }, [saveClicked]);

  const onSubmit = async (submitData) => {
    updateData();
  };

  return (

    <div>
      <ToastContainer autoClose={3000} />

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
            <button
              type="button"
              className="w-full bg-orange-400 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              <svg
                className="animate-spin ml-3 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating AI Content...
            </button>
          )}
        </div>
      )}

      <form className="mt-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {showWhichContent == "heading" && (
          <div
            className={`appearance-none relative w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.heading
              ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              }`}
          >
            <label
              htmlFor="email"
              className="absolute -top-2 left-2 text-xs font-medium text-gray-400 bg-white px-1"
            >
              Heading
            </label>
            <div className="">
              <input
                type="text"
                autoComplete="name"
                {...register("heading", {
                  required: true,
                })}
                className="block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 outline-none sm:text-sm"
                value={dataObj.data[textCount]}
                onChange={(e) =>
                  editSection(dataObj.key, textCount, e.target.value)
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
            className={`appearance-none relative w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.subHeading
              ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              }`}
          >
            <label
              htmlFor="email"
              className="absolute -top-2 left-2 text-xs font-medium text-gray-400 bg-white px-1"
            >
              Sub Heading
            </label>
            <div className="mt-1">
              <input
                type="text"
                autoComplete="name"
                {...register("subHeading", {
                  required: true,
                })}
                className="block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                value={dataObj.data[textCount]}
                onChange={(e) =>
                  editSection(dataObj.key, textCount, e.target.value)
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

        {showWhichContent == "image" && (
          <div className="sm:col-span-3">
            {/* <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Edit Image
              </label> */}
            <UploadImage
              size={`small-round`}
              imageUrl={dataObj.data.image}
              imageChanged={imageChanged}
              section={dataObj.section_id}
              className={`h-${size} w-${size} ${className}`}
            />
          </div>
        )}
      </form>
    </div>

  );
}
