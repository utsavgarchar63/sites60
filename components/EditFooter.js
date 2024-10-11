import { useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Bars4Icon,
  TrashIcon,
  PlusCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { optional } from "zod";
import UploadImage from "./UploadImage";

const platforms = [
  {
    id: 1,
    name: "Facebook",
    online: true,
    icon: "https://www.svgrepo.com/show/330401/facebook.svg",
  },
  {
    id: 2,
    name: "Instagram",
    online: true,
    icon: "https://www.svgrepo.com/show/333552/instagram.svg",
  },
  {
    id: 3,
    name: "Twitter",
    online: true,
    icon: "https://www.svgrepo.com/show/349909/twitter.svg",
  },
  {
    id: 4,
    name: "LinkedIn",
    online: true,
    icon: "https://www.svgrepo.com/show/144550/linkedin.svg",
  },
  {
    id: 5,
    name: "Pinterest",
    online: true,
    icon: "https://www.svgrepo.com/show/119056/pinterest.svg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditFooter({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
}) {
  const schema = z.object({
    company: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(100, { message: "Max 100 characters" }),
    tagline: z.string().max(300, { message: "Max 300 characters" }).optional(),
    platforms: z.array(
      z.object({
        // name: z.string().min(3, { message: "Min 2 characters" }),
        href: z.string().url({ message: "Invalid URL" }),
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

  const imageChanged = (type, image) => {
    if (type == "delete") {
      editSection(dataObj.key, "logo", undefined);
    } else {
      editSection(dataObj.key, "logo", image);
    }
  };

  const resetClick = () => {
    changeClick();
  };

  useEffect(() => {
    if (saveClicked == true) {
      resetClick();
      handleSubmit(onSubmit)();
    }
  }, [saveClicked]);

  const getDropdownValue = (id) => {
    return platforms.filter((e) => e.name == id)[0];
  };

  const changeListValue = (index, value, type) => {
    console.log("index>>>>", index);
    console.log("value>>>>", value);
    console.log("type>>>>", type);
    let list = dataObj.data.social;

    if (type == "platform") {
      // Check if platform is already selected
      let matchIndex = dataObj.data.social.findIndex((e) => e.name == value);

      if (matchIndex == -1) {
        list[index].name = value;
      }
    } else if (type == "link") {
      list[index].href = value;
    } else if (type == "delete") {
      list.splice(index, 1);
    } else if (type == "add") {
      list.push({
        name: "Twitter",
        href: "https://smartsites.com",
      });
    }

    editSection(dataObj.key, "social", list);
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
        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`relative appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
              errors.company
                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          >
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
            >
              Company Name
            </label>
            <div className="mt-1">
              <input
                type="text"
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

          <div
            className={`relative appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
              errors.tagline
                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          >
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
            >
              Tagline
            </label>
            <div className="mt-1">
              <input
                type="text"
                autoComplete="name"
                {...register("tagline", {
                  required: true,
                })}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                value={dataObj.data.tagline}
                onChange={(e) =>
                  editSection(dataObj.key, "tagline", e.target.value)
                }
              />
            </div>
            {errors.tagline && (
              <p className="mt-2 text-xs text-red-500">
                {errors.tagline.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Logo
            </label>
            <UploadImage
              size={`small-round`}
              imageUrl={dataObj.data.logo}
              imageChanged={imageChanged}
            />
          </div>

          <div className="mt-2 w-full py-2">
            <div>
              <div className="mt-2 flex justify-center mx-auto text-left">
                <ul role="list" className="w-full">
                  {dataObj.data.social.map((item, index) => (
                    <li key={item.name} className="py-1">
                      <div className="flex items-center space-x-4 justify-center w-full">
                        {/* <Bars4Icon
                          className="block h-6 w-6 border-none text-gray-400"
                          aria-hidden="true"
                        /> */}
                        <div className=" w-full py-2">
                          <Listbox
                            value={getDropdownValue(item.name)}
                            onChange={(e) =>
                              changeListValue(index, e.name, "platform")
                            }
                          >
                            {({ open }) => (
                              <>
                                <div className="relative rounded-md rounded-b-none border border-gray-300 px-3 py-2 shadow-sm focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
                                  <Listbox.Label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400">
                                    Social Media Platform
                                  </Listbox.Label>
                                  <Listbox.Button className="block w-full p-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
                                    <span className="flex items-center">
                                      <span
                                        aria-label={
                                          getDropdownValue(item.name).online
                                            ? "Online"
                                            : "Offline"
                                        }
                                        className={classNames(
                                          getDropdownValue(item.name).online
                                            ? "bg-green-400"
                                            : "bg-gray-200",
                                          "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                        )}
                                      />
                                      <span className="ml-3 block truncate">
                                        {getDropdownValue(item.name).name}
                                      </span>
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {platforms.map((person) => (
                                        <Listbox.Option
                                          key={person.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-orange-500"
                                                : "text-gray-900",
                                              "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={person}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <div className="flex items-center">
                                                <span
                                                  className={classNames(
                                                    person.online
                                                      ? "bg-green-400"
                                                      : "bg-gray-200",
                                                    "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                                  )}
                                                  aria-hidden="true"
                                                />
                                                <span
                                                  className={classNames(
                                                    selected
                                                      ? "font-semibold"
                                                      : "font-normal",
                                                    "ml-3 block truncate"
                                                  )}
                                                >
                                                  {person.name}
                                                  <span className="sr-only">
                                                    {" "}
                                                    is{" "}
                                                    {person.online
                                                      ? "online"
                                                      : "offline"}
                                                  </span>
                                                </span>
                                              </div>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-orange-500",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>

                          <div
                            className={`appearance-none relative w-full px-3 py-2 border shadow-sm rounded-md rounded-t-none placeholder-gray-400  sm:text-sm ${
                              errors.platforms?.[index]?.href
                                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                          >
                            <label
                              htmlFor="name"
                              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                            >
                              Link
                            </label>
                            <input
                              type="text"
                              {...register(`platforms.${index}.href`)}
                              onChange={(e) => {
                                changeListValue(index, e.target.value, "link");
                              }}
                              value={item.href}
                              placeholder="Paste platform link here"
                              className="block w-full border-0 p-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                            />

                            <span className="invalid-feedback text-xs text-red-500">
                              {errors.platforms?.[index]?.href?.message}
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

              {dataObj.data.social.length < 5 && (
                <div
                  onClick={() => {
                    changeListValue(0, "", "add");
                  }}
                  className="cursor-pointer mt-6 flex items-center space-x-4 justify-center w-full mb-20"
                >
                  <a className="flex w-96 items-center justify-center space-x-1 rounded-md shadow border border-indigo-200 bg-indigo-200 px-4 py-2 text-sm font-medium text-orange-500 shadow-sm">
                    <PlusCircleIcon className="h-5 w-5 text-orange-500 font-medium" />
                    <span>Add New Platform</span>
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
