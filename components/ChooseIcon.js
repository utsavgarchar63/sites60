import { useState, useEffect, Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { createApi } from "unsplash-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrashIcon } from "@heroicons/react/24/outline";
import * as Icons from "react-feather";

import { featherIconsList } from "../lib/genericData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChooseIcon({ index, currentIcon, changedIcon }) {
  const [imagePopup, setImagePopup] = useState(false);
  const [query, setQuery] = useState("all");
  const notify = (label) => toast(label);

  const iconsList = featherIconsList();

  let circleIcon = iconsList.filter((e) => e.icon == "core/menu")[0];
  const [selIcon, setSelIcon] = useState(undefined);

  function handleQuery(query) {
    setQuery(query);
  }

  useEffect(() => {
    if (currentIcon) {
      console.log("Cuurent Icon>>>>", currentIcon);
      let newIcon = iconsList.filter((e) => e.icon == currentIcon)[0];
      console.log("newIcon Icon>>>>", newIcon);

      setSelIcon(newIcon);
    }
  }, [currentIcon]);

  const closeUnsplash = (img) => {
    changedIcon(index, img.icon);
    setImagePopup(false);
  };

  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />

        {selIcon && <selIcon.shape onClick={() => setImagePopup(true)} />}

        <Transition.Root show={imagePopup} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setImagePopup}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                    <div>
                      <div className="mt-3 text-left sm:mt-1">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Select Icons
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="border-t border-gray-200 px-4 pt-2 pb-4 sm:px-0">
                            <dl className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-1 justify-center text-left">
                              <div className="">
                                <input
                                  type="text"
                                  value={query}
                                  onChange={(e) => handleQuery(e.target.value)}
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm outline-none"
                                />
                              </div>

                              <ul
                                role="list"
                                className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-8 sm:gap-x-2 lg:grid-cols-10 xl:gap-x-8"
                              >
                                {iconsList.map((item) => (
                                  <li key={item.icon} className="relative">
                                    <div className="group aspect-w-3 aspect-h-3 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-gray-100">
                                      <item.shape
                                        name={item.icon}
                                        onClick={() => closeUnsplash(item)}
                                        className="p-4 cursor-pointer object-cover
                                      group-hover:opacity-75"
                                      />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700   sm:text-sm"
                        onClick={() => setTablesModalOpen(false)}
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
