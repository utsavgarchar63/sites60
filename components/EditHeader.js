import { useState, useEffect, Fragment } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImage from "./UploadImage";
import {
  Bars4Icon,
  PlusCircleIcon,
  TrashIcon,
  ChevronUpDownIcon,
  ChevronUpUpIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Listbox, Transition, Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditHeader({
  dataObj,
  editSection,
  saveClicked,
  changeClick,
  updateData,
  sectionsList,
  showWhichContent,
}) {
  console.log(dataObj, "<<< dataObj");

  const [sectionsDropdown, setSectionsDropdown] = useState([]);

  const schema = z.object({
    btn1_text: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(40, { message: "Max 40 characters" }),
    btn1_link: z.string().url({ message: "Invalid Link for Button 1" }),
    btn2_text: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(40, { message: "Max 40 characters" }),
    btn2_link: z.string().url({ message: "Invalid Link for Button 2" }),
    navigation: z.array(
      z.object({
        name: z
          .string()
          .min(3, { message: "Min 2 characters for Navigation Link" })
          .max(40, { message: "Max 40 characters for Navigation Link" }),
      })
    ),
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

  useEffect(() => {
    if (sectionsList) {
      let filterList = sectionsList.filter(
        (e) => !e.section_id.includes("header")
      );

      setSectionsDropdown(filterList);
      console.log("Before>>>>", sectionsList);
      console.log("After>>>>", filterList);
    }
  }, [sectionsList]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const getDropdownValue = (id) => {
    let fil = sectionsDropdown.filter((e) => e.key == id);

    let innerIndex = 0;
    for (const iterator of fil) {
      innerIndex++;

      let newObj = iterator;
      newObj.label = iterator.section_id + " " + iterator.key;
    }

    if (fil.length == 1) {
      return fil[0];
    } else {
      return { key: "none", label: "None" };
    }
  };

  const changeListValue = (index, value, type) => {
    let list = dataObj.data.navigation;

    if (type == "name") {
      list[index].name = value;
    } else if (type == "href") {
      list[index].href = value;
    } else if (type == "delete") {
      list.splice(index, 1);
    } else if (type == "add") {
      list.push({
        name: "New Link",
        href: "https://smartsites.com",
      });
    }

    editSection(dataObj.key, "navigation", list);
  };

  const imageChanged = (type, image) => {
    if (type == "delete") {
      editSection(dataObj.key, "logo", undefined);
    } else {
      editSection(dataObj.key, "logo", image);
    }
  };

  const boolChanged = (key, type, checked) => {
    if (type == "btn1_show") {
      editSection(key, "btn1_show", !checked);
    } else {
      editSection(key, "btn2_show", !checked);
    }
  };

  const onSubmit = async (submitData) => {
    console.log("Save Changes>>>>>>", submitData);
    updateData();
  };

  if (
    dataObj?.section_id == "header6" ||
    dataObj?.section_id == "header1" ||
    dataObj?.section_id == "header5"
  ) {
    console.log("heeeeeeeeeeeeeerrrrrrrrrrrrrr11");
  }
  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />
        {/* <h1 className="p-2">
          {" "}
          Section Id:{" "}
          <span className="  font-bold">
            {dataObj?.section_id}-{dataObj?.key}
          </span>
        </h1> */}

        <form className="mt-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {showWhichContent == "headerlinks" && (
            <>
              {(dataObj?.section_id == "header6" ||
                dataObj?.section_id == "header1" ||
                dataObj?.section_id == "header5") && (
                  <div
                    className={`appearance-none relative w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm`}
                  >
                    <label
                      htmlFor="companyName"
                      className="absolute -top-2 left-2 text-xs font-medium text-gray-400 bg-white px-1"
                    >
                      Company Name
                    </label>
                    <div className="">
                      <input
                        type="text"
                        autoComplete="companyName"
                        {...register("companyName", {
                          required: true,
                        })}
                        className="block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                        value={dataObj.data.companyName}
                        onChange={(e) =>
                          editSection(dataObj.key, "companyName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              {(dataObj?.section_id == "header1" ||
                dataObj?.section_id == "header2" ||
                dataObj?.section_id == "header3" ||
                dataObj?.section_id == "header4") && (
                  <>
                    <div className="flex space-x-2 w-full">
                      <div
                        className={`relative appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  text-xs ${errors.btn1_text
                          ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          }`}
                      >
                        <label
                          htmlFor="name"
                          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                        >
                          Button 1 label
                        </label>
                        <input
                          type="text"
                          autoComplete="name"
                          {...register("btn1_text", {
                            required: true,
                          })}
                          className="block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                          value={dataObj.data.btn1_text}
                          onChange={(e) =>
                            editSection(dataObj.key, "btn1_text", e.target.value)
                          }
                        />
                        {errors.btn1_text && (
                          <small className="mt-2 text-xs text-red-500">
                            {errors.btn1_text.message}
                          </small>
                        )}
                      </div>

                      <div
                        className={`relative appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-xs ${errors.btn1_link
                          ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          }`}
                      >
                        <label
                          htmlFor="email"
                          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                        >
                          Button 1 URL
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            autoComplete="name"
                            {...register("btn1_link", {
                              required: true,
                            })}
                            className="block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                            value={dataObj.data.btn1_link}
                            onChange={(e) =>
                              editSection(
                                dataObj.key,
                                "btn1_link",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {errors.btn1_link && (
                          <small className="mt-2 text-xs text-red-500">
                            {errors.btn1_link.message}
                          </small>
                        )}
                      </div>
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
                            Show Button
                          </Switch.Label>
                        </span>
                        <span className="text-xs text-gray-400 px-2">
                          Not Visible
                        </span>
                        <Switch
                          checked={dataObj.data.btn1_show}
                          onChange={(e) =>
                            boolChanged(
                              dataObj.key,
                              "btn1_show",
                              dataObj.data.btn1_show
                            )
                          }
                          className={classNames(
                            dataObj.data.btn1_show
                              ? "bg-orange-500"
                              : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              dataObj.data.btn1_show
                                ? "translate-x-5"
                                : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                        <span className="text-xs text-gray-400 px-2">
                          Visible
                        </span>
                      </Switch.Group>
                    </div>

                    <div className="flex space-x-2 w-full">
                      <div
                        className={`relative appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-xs ${errors.btn2_text
                          ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          }`}
                      >
                        <label
                          htmlFor="email"
                          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                        >
                          Button 2 label
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            autoComplete="name"
                            {...register("btn2_text", {
                              required: true,
                            })}
                            className="block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-xs outline-none"
                            value={dataObj.data.btn2_text}
                            onChange={(e) =>
                              editSection(
                                dataObj.key,
                                "btn2_text",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {errors.btn2_text && (
                          <small className="mt-2 text-xs text-red-500">
                            {errors.btn2_text.message}
                          </small>
                        )}
                      </div>

                      <div
                        className={`relative appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  text-xs ${errors.btn2_link
                          ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          }`}
                      >
                        <label
                          htmlFor="email"
                          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
                        >
                          Button 2 URL
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            autoComplete="name"
                            {...register("btn2_link", {
                              required: true,
                            })}
                            className="block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                            value={dataObj.data.btn2_link}
                            onChange={(e) =>
                              editSection(
                                dataObj.key,
                                "btn2_link",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {errors.btn2_link && (
                          <small className="mt-2 text-xs text-red-500">
                            {errors.btn2_link.message}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 w-full  px-4 py-2 rounded-md">
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
                            Show Button
                          </Switch.Label>
                        </span>
                        <span className="text-xs text-gray-400 px-2">
                          Not Visible
                        </span>
                        <Switch
                          checked={dataObj.data.btn2_show}
                          onChange={(e) =>
                            boolChanged(
                              dataObj.key,
                              "btn2_show",
                              dataObj.data.btn2_show
                            )
                          }
                          className={classNames(
                            dataObj.data.btn2_show
                              ? "bg-orange-500"
                              : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              dataObj.data.btn2_show
                                ? "translate-x-5"
                                : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                        <span className="text-xs text-gray-400 px-2">
                          Visible
                        </span>
                      </Switch.Group>
                    </div>
                  </>
                )}

              <div className="mt-2 w-full py-2">
                <div>
                  <div className="mt-2 flex justify-center mx-auto text-left">
                    <ul role="list" className="w-full">
                      {dataObj.data.navigation.map((item, index) => (
                        <li key={index} className="py-3">
                          <div className="flex items-center space-x-4 justify-start w-full">
                            <div className="isolate -space-y-px rounded-md shadow-sm w-full">
                              <div
                                className={`relative appearance-none block w-full px-3 py-2 border rounded-md rounded-b-none shadow-sm  text-xs ${errors.btn2_link
                                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  }`}
                              >
                                {/* <div className="relative rounded-md rounded-b-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"> */}
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
                                  Text
                                </label>
                                <input
                                  {...register(`navigation.${index}.name`)}
                                  type="text"
                                  onChange={(e) => {
                                    changeListValue(
                                      index,
                                      e.target.value,
                                      "name"
                                    );
                                  }}
                                  value={item.name}
                                  className="block bg-white w-full border-0 p-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                                  placeholder="New Label"
                                />

                                <span className="invalid-feedback text-red-500 text-xs">
                                  {errors.navigation?.[index]?.name?.message}
                                </span>
                              </div>

                              <div
                                className={`relative appearance-none block w-full px-3 py-2 border rounded-md rounded-t-none shadow-sm  text-xs ${errors.btn2_link
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
                                <Listbox
                                  value={getDropdownValue(item.href)}
                                  onChange={(e) =>
                                    changeListValue(index, e.key, "href")
                                  }
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-1 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                          <span className="block truncate">
                                            {getDropdownValue(item.href).label}
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
                                          <Listbox.Options className="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {sectionsDropdown.map(
                                              (person, index) => (
                                                <Listbox.Option
                                                  key={person.key}
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
                                                  <span className="font-normal block truncate">
                                                    {person.section_id} -
                                                    {person.key}
                                                  </span>
                                                </Listbox.Option>
                                              )
                                            )}
                                          </Listbox.Options>
                                        </Transition>
                                      </div>
                                    </>
                                  )}
                                </Listbox>
                                <span className="text-red-500 text-xs">
                                  {errors.navigation?.[index]?.href?.message}
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

                  {dataObj.data.navigation.length < 4 && (
                    <div
                      onClick={() => {
                        changeListValue(0, "", "add");
                      }}
                      className="cursor-pointer mt-6 flex items-center justify-center w-full mb-20"
                    >
                      <a className="flex w-60 items-center justify-center space-x-1 rounded-md  border border-orange-500 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm">
                        <PlusCircleIcon className="h-5 w-5  font-medium" />
                        <span>Add New Item</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {showWhichContent == "image" && (
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
          )}
        </form>
      </div>
    </>
  );
}
