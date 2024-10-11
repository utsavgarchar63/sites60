import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TrashIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UploadImage from "./UploadImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditTestimonial({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
  generateAIContent,
  aiLoading,
  showWhichContent,
}) {
  const router = useRouter();

  const schema = z.object({
    title: z
      .string()
      // .min(3, { message: "Min 3 characters" })
      .max(300, { message: "Max 300 characters" }),
    subtitle: z
      .string()
      // .min(3, { message: "Min 3 characters" })
      .max(1000, { message: "Max 1000 characters" }),
    testimonials: z.array(
      z.object({
        name: z
          .string()
          // .min(3, { message: "Min 3 characters" })
          .max(100, { message: "Max 100 characters" }),
        designation: z
          .string()
          // .min(3, { message: "Min 3 characters" })
          .max(100, { message: "Max 100 characters" }),
        content: z
          .string()
          // .min(0, { message: "Min 10 characters" })
          .max(2000, { message: "Max 2000 characters" }),
        // image: z.string().url({ message: "Invalid Image Uploaded" }),
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

  const notify = (label) => toast(label);

  const resetClick = () => {
    changeClick();
  };

  const getAIContent = () => {
    generateAIContent(dataObj.key, "testimonials");
  };

  useEffect(() => {
    if (saveClicked == true) {
      resetClick();
      handleSubmit(onSubmit)();
    }
  }, [saveClicked]);

  const onSubmit = async (submitData) => {
    console.log("Save Changes>>>>>>", submitData);
    updateData();
  };

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
    let list = dataObj.data.testimonials;
    console.log("List:", list);

    if (type == "name") {
      list[index].name = value;
    } else if (type == "designation") {
      list[index].designation = value;
    } else if (type == "content") {
      list[index].content = value;
    } else if (type == "image") {
      list[index].image = value;
    } else if (type == "delete") {
      list.splice(index, 1);
    } else if (type == "add") {
      list.push({
        name: "John Doe",
        designation: "Founder of John Doe Inc",
        content:
          "With this product I would have been lost in the woods like woody allen",
        image:
          "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
      });
    }

    editSection(dataObj.key, "testimonials", list);
  };

  const uploadImage = async (file) => {
    setLoader(true);

    var formData = new FormData();

    if (file) {
      console.log("Appended>>>>");
      formData.append("media", file);
    }

    try {
      const res = await fetch("/api/uploadMedia", {
        method: "POST",
        body: formData,
      });
      //Await for data for any desirable next steps
      const data = await res.json();
      setLoader(false);
      console.log("Data>>>>", data);
      if (data.errors) {
        notify(data.errors[0].msg);
      } else {
        if (data.status == 422 || data.status == 400 || data.status == 500) {
          notify("All our servers are busy. Please try after sometime.");
        } else {
          editSection(dataObj.key, "image", data.media);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />
        {showWhichContent == "aicontent" && (
          <div className="mt-2">
            {aiLoading == false && (
              <button
                onClick={() => getAIContent()}
                type="button"
                className="w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        <form className="mt-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            {showWhichContent == "subheading" && (
              <div
                className={`relative appearance-none block w-full px-3 py-2  sm:text-sm ${
                  errors.subtitle
                    ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                }`}
              >
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                >
                  Section Sub title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    autoComplete="name"
                    {...register("subtitle", {
                      required: true,
                    })}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                    value={dataObj.data.subtitle}
                    onChange={(e) =>
                      editSection(dataObj.key, "subtitle", e.target.value)
                    }
                  />
                </div>
                {errors.subtitle && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.subtitle.message}
                  </p>
                )}
              </div>
            )}

            {showWhichContent == "carousel" && (
              <div className="mt-2 w-full py-2 ">
                <div>
                  <div className="mt-2 flex justify-center mx-auto text-left ">
                    <ul
                      role="list"
                      className="w-full relative grid grid-cols-1"
                    >
                      {dataObj.data.testimonials.map((item, index) => (
                        <li key={index} className="py-3">
                          <div className="flex items-center space-x-4 justify-start w-full ">
                            <div className="isolate -space-y-px rounded-md shadow-sm w-full ">
                              <div
                                className={`appearance-none relative w-full px-3 py-2 border rounded-md rounded-b-none shadow-sm text-sm ${
                                  errors.testimonials?.[index]?.name
                                    ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                                  Name
                                </label>
                                <input
                                  {...register(`testimonials.${index}.name`)}
                                  type="text"
                                  onChange={(e) => {
                                    changeListValue(
                                      index,
                                      e.target.value,
                                      "name"
                                    );
                                  }}
                                  value={item.name}
                                  placeholder="New Label"
                                  className="block w-full border-0 p-1.5 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm outline-none"
                                />
                                <span className="invalid-feedback text-red-500 text-xs">
                                  {errors.testimonials?.[index]?.name?.message}
                                </span>
                              </div>
                              <div
                                className={`appearance-none relative w-full px-3 py-2 border shadow-sm placeholder-gray-400  text-sm ${
                                  errors.testimonials?.[index]?.designation
                                    ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                              >
                                <label
                                  htmlFor="designation"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                                >
                                  Designation
                                </label>
                                <input
                                  type="text"
                                  {...register(
                                    `testimonials.${index}.designation`
                                  )}
                                  onChange={(e) => {
                                    changeListValue(
                                      index,
                                      e.target.value,
                                      "designation"
                                    );
                                  }}
                                  value={item.designation}
                                  placeholder="New Label"
                                  className="block w-full border-0 p-1.5 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm outline-none"
                                />
                                <span className="invalid-feedback text-red-500 text-xs">
                                  {
                                    errors.testimonials?.[index]?.designation
                                      ?.message
                                  }
                                </span>
                              </div>

                              <div
                                className={`appearance-none relative w-full px-3 py-2 border shadow-sm placeholder-gray-400  text-sm ${
                                  errors.testimonials?.[index]?.content
                                    ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                              >
                                <label
                                  htmlFor="content"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                                >
                                  Testimonial
                                </label>
                                <input
                                  {...register(`testimonials.${index}.content`)}
                                  type="text"
                                  onChange={(e) => {
                                    changeListValue(
                                      index,
                                      e.target.value,
                                      "content"
                                    );
                                  }}
                                  value={item.content}
                                  placeholder="New Label"
                                  className="block w-full border-0 p-1.5 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm outline-none"
                                />
                                <span className="invalid-feedback text-red-500 text-xs">
                                  {
                                    errors.testimonials?.[index]?.content
                                      ?.message
                                  }
                                </span>
                              </div>
                              <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-3 focus-within:ring-0 focus-within:ring-orange-500 ">
                                <label
                                  htmlFor="name"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400 "
                                >
                                  Company Logo
                                </label>

                                <UploadImage
                                  size={`small-round`}
                                  index={index}
                                  imageUrl={item.image}
                                  imageChanged={imageChanged}
                                  section={dataObj?.section_id}
                                />
                                <span className="invalid-feedback text-red-500 text-xs">
                                  {errors.testimonials?.[index]?.image?.message}
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

                  {dataObj.data.testimonials.length < 12 && (
                    <div
                      onClick={() => {
                        changeListValue(0, "", "add");
                      }}
                      className="cursor-pointer mt-6 flex items-center space-x-4 justify-center w-full mb-20"
                    >
                      <a className="flex w-60 items-center justify-center space-x-1 rounded-md  border border-orange-500 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm">
                        <PlusCircleIcon className="h-5 w-5 font-medium" />
                        <span>Add New Testimonial</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
