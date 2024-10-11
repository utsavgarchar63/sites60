import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImage from "./UploadImage";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { Listbox, Transition, Fragment, Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditContact({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
  sectionsList,
  showWhichContent,
}) {
  const [sectionsDropdown, setSectionsDropdown] = useState([]);
  const schema = z.object({
    heading: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(300, { message: "Max 300 characters" }),
    // addressHeading: z
    //   .string()
    //     .min(3, { message: "Min 3 characters" })
    //   .max(300, { message: "Max 300 characters" }),
    company: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(1000, { message: "Max 1000 characters" }),
    buttonText: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(100, { message: "Max 100 characters" }),
    addressContact: z.array(z.object({})),
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const boolChanged = (key, type, checked) => {
    if (type == "name_show") {
      editSection(key, "name_show", !checked);
    } else if (type == "email_show") {
      editSection(key, "email_show", !checked);
    } else if (type == "phone_show") {
      editSection(key, "phone_show", !checked);
    } else if (type == "message_show") {
      editSection(key, "message_show", !checked);
    }
  };

  const onSubmit = async (submitData) => {
    updateData();
  };

  const changeListValue = (index, value, type) => {
    let list = dataObj.data.addressContact;

    if (type == "text") {
      list[index].text = value;
    } else if (type == "heading") {
      list[index].heading = value;
    } else if (type == "subHeading") {
      list[index].subHeading = value;
    } else if (type == "image") {
      list[index].image = value;
    } else if (type == "delete") {
      list.splice(index, 1);
    } else if (type == "add") {
      list.push({ text: "Add: address" });
    }

    editSection(dataObj.key, "gallery", list);
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
        <form className="mt-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                Contact Section Heading
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
                Contact Section SubHeading
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
          )}

          {showWhichContent == "button" && (
            <div
              className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                errors.buttonText
                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              }`}
            >
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
              >
                Contact Section Submit Button
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  maxLength={100}
                  autoComplete="name"
                  {...register("buttonText", {
                    required: true,
                  })}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                  value={dataObj.data.buttonText}
                  onChange={(e) =>
                    editSection(dataObj.key, "buttonText", e.target.value)
                  }
                />
              </div>
              {errors.buttonText && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.buttonText.message}
                </p>
              )}
            </div>
          )}

          {showWhichContent == "form" && (
            <>
              <div className="w-full  px-4 rounded-md">
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex flex-grow flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Show Name Field
                    </Switch.Label>
                  </span>
                  <span className="text-xs text-gray-400 px-2">
                    Not Visible
                  </span>
                  <Switch
                    checked={dataObj.data.name_show}
                    onChange={(e) =>
                      boolChanged(
                        dataObj.key,
                        "name_show",
                        dataObj.data.name_show
                      )
                    }
                    className={classNames(
                      dataObj.data.name_show ? "bg-orange-500" : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        dataObj.data.name_show
                          ? "translate-x-5"
                          : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <span className="text-xs text-gray-400 px-2">Visible</span>
                </Switch.Group>
              </div>

              <div className="w-full  px-4 rounded-md">
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex flex-grow flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Show Email Field
                    </Switch.Label>
                  </span>
                  <span className="text-xs text-gray-400 px-2">
                    Not Visible
                  </span>
                  <Switch
                    checked={dataObj.data.email_show}
                    onChange={(e) =>
                      boolChanged(
                        dataObj.key,
                        "email_show",
                        dataObj.data.email_show
                      )
                    }
                    className={classNames(
                      dataObj.data.email_show ? "bg-orange-500" : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        dataObj.data.email_show
                          ? "translate-x-5"
                          : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <span className="text-xs text-gray-400 px-2">Visible</span>
                </Switch.Group>
              </div>

              <div className="w-full  px-4 rounded-md">
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex flex-grow flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Show Phone Field
                    </Switch.Label>
                  </span>
                  <span className="text-xs text-gray-400 px-2">
                    Not Visible
                  </span>
                  <Switch
                    checked={dataObj.data.phone_show}
                    onChange={(e) =>
                      boolChanged(
                        dataObj.key,
                        "phone_show",
                        dataObj.data.phone_show
                      )
                    }
                    className={classNames(
                      dataObj.data.phone_show ? "bg-orange-500" : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        dataObj.data.phone_show
                          ? "translate-x-5"
                          : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <span className="text-xs text-gray-400 px-2">Visible</span>
                </Switch.Group>
              </div>

              <div className="w-full  px-4 rounded-md">
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex flex-grow flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Show Message Field
                    </Switch.Label>
                  </span>
                  <span className="text-xs text-gray-400 px-2">
                    Not Visible
                  </span>
                  <Switch
                    checked={dataObj.data.message_show}
                    onChange={(e) =>
                      boolChanged(
                        dataObj.key,
                        "message_show",
                        dataObj.data.message_show
                      )
                    }
                    className={classNames(
                      dataObj.data.message_show
                        ? "bg-orange-500"
                        : "bg-gray-200",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        dataObj.data.message_show
                          ? "translate-x-5"
                          : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <span className="text-xs text-gray-400 px-2">Visible</span>
                </Switch.Group>
              </div>
            </>
          )}

          {showWhichContent == "address" && (
            <>
              {dataObj?.data?.addressContact && (
                <>
                  {dataObj.data.addressContact.map((item, index) => (
                    <div
                      key={index}
                      className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                        errors.addressContact
                          ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
                      }`}
                    >
                      <label
                        htmlFor="addressContact"
                        className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                      >
                        Address Section Heading
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...register(`addressContact.${index}.text`, {
                            required: true,
                          })}
                          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                          maxLength={50}
                          value={item.text}
                          onChange={(e) => {
                            changeListValue(index, "text", e.target.value);
                          }}
                        />
                      </div>

                      {errors.addressContact && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.addressContact?.[index]?.text?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </>
              )}

              <div
                onClick={() => {
                  changeListValue(0, "", "add");
                }}
                className="cursor-pointer mt-6 flex items-center justify-start w-full mb-20"
              >
                <a className="flex w-96 items-center justify-center space-x-1 rounded-md shadow border border-indigo-200 bg-indigo-200 px-4 py-2 text-sm font-medium text-orange-400 shadow-sm">
                  <PlusCircleIcon className="h-5 w-5 text-orange-400 font-medium" />
                  <span>Add Address Line</span>
                </a>
              </div>
            </>
          )}

          {showWhichContent == "company" && (
            <div
              className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                errors.company
                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
              }`}
            >
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
              >
                Footer Section
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  maxLength={100}
                  autoComplete="name"
                  {...register("company", {
                    required: true,
                  })}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                  value={dataObj.data.company}
                  onChange={(e) =>
                    editSection(dataObj.key, "company", e.target.value)
                  }
                />
              </div>

              {errors.company && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.company.message}
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
