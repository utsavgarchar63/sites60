import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/20/solid";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import UploadImage from "./UploadImage";

const publishList = [
  {
    id: 1,
    name: "Unpublished",
    online: false,
    icon: "https://www.svgrepo.com/show/330401/facebook.svg",
  },
  {
    id: 2,
    name: "Published",
    online: true,
    icon: "https://www.svgrepo.com/show/333552/instagram.svg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditPublish({
  dataObj,
  editInfo,
  saveClicked,
  changeClick,
  updateData,
}) {
  const notify = (label) => toast(label);

  const schema = z.object({
    title: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(200, { message: "Max 200 characters" }),
    description: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(2000, { message: "Max 2000 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [selected, setSelected] = useState(publishList[0]);

  useEffect(() => {
    console.log("Data>>>>", dataObj);
    if (dataObj.status == "Published") {
      setSelected(publishList[1]);
    }
  }, []);

  const onSubmit = async (submitData) => {
    console.log("Save Changes");
    updateData();
  };

  const resetClick = () => {
    changeClick();
  };

  const downloadQR = async () => {
    const canvas = await html2canvas(document.getElementById("canvas"));
    var imgData = canvas.toDataURL("image/png");
    var doc = new jsPDF("p", "mm");
    doc.addImage(imgData, "PNG", 10, 10);
    doc.save("sample-file.pdf");
  };

  useEffect(() => {
    if (saveClicked == true) {
      resetClick();
      handleSubmit(onSubmit)();
    }
  }, [saveClicked]);

  const copyToClipboard = () => {
    let url = process.env.LIVE_URL + "/smartsite/" + dataObj.key;

    var textField = document.createElement("textarea");
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    notify("Smartsite Link Copied to Clipboard");
  };

  const changeListValue = (value, type) => {
    if (dataObj.hasOwnProperty("is_paid")) {
      if (!dataObj.is_paid) {
        notify("Please make payment to publish the website");
        return;
      }
    } else {
      notify("Please make payment to publish the website");
      return;
    }
    setSelected(publishList.filter((e) => e.name == value)[0]);
    editInfo("status", value);
  };

  const imageChanged = (type, image) => {
    if (type == "delete") {
      editInfo("favicon", undefined);
    } else {
      editInfo("favicon", image);
    }
  };

  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />
        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
              errors.title
                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
            }`}
          >
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                autoComplete="name"
                {...register("title", {
                  required: true,
                })}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                value={dataObj.title}
                onChange={(e) => editInfo("title", e.target.value)}
              />
            </div>
            {errors.title && (
              <p className="mt-2 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div
            className={`relative appearance-none block w-full px-2 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
              errors.description
                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
            }`}
          >
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400"
            >
              Description
            </label>
            <div className="mt-1">
              <input
                type="text"
                autoComplete="name"
                {...register("description", {
                  required: true,
                })}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                value={dataObj.description}
                onChange={(e) => editInfo("description", e.target.value)}
              />
            </div>
            {errors.description && (
              <p className="mt-2 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center w-full space-x-2">
            <Listbox
              value={selected}
              onChange={(e) => changeListValue(e.name, "status")}
            >
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-400 z-10">
                      Status
                    </Listbox.Label>
                    <Listbox.Button className="relative w-56 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 sm:text-sm">
                      <span className="flex items-center">
                        <span
                          aria-label={selected.online ? "Online" : "Offline"}
                          className={classNames(
                            selected.online ? "bg-green-400" : "bg-gray-200",
                            "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                          )}
                        />
                        <span className="ml-3 block truncate">
                          {selected.name}
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
                        {publishList.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-orange-400"
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
                                      is {person.online ? "online" : "offline"}
                                    </span>
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-orange-400",
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

            <button
              type="button"
              className=" inline-flex items-center w-full justify-center rounded-md border border-transparent bg-orange-400 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 sm:text-sm"
              onClick={() => copyToClipboard()}
            >
              <svg
                className="pr-2 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
              Copy Link
            </button>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Favicon
            </label>
            <UploadImage
              size={`small-round`}
              imageUrl={dataObj.favicon}
              imageChanged={imageChanged}
            />
          </div>

          <h2 className="flex text-sm font-medium text-gray-700 space-x-3">
            QR Code
          </h2>

          <div id="target">
            <QRCodeCanvas
              value={`${process.env.LIVE_URL}/smartsite/${dataObj.key}`}
              id="canvas"
            />
          </div>
          <button
            onClick={() => downloadQR()}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            <CloudArrowDownIcon
              className="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            Print QR
          </button>
        </form>
      </div>
    </>
  );
}
