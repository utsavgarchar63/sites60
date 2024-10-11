import { Fragment, useState, forwardRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
const navigation = [
  { name: "Home", href: "#", current: false },
  { name: "About", href: "#", current: false },
  { name: "Features", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const HeaderTemp8 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam, siteId, siteKey } =
    props;
  console.log(ref, "refref");
  const gotoUrl = (link) => {
    if (fromPage != "edit") {
      trackInfo();
      // Track Event
      let properties = {
        site_id: siteKey,
        created_time: new Date(),
      };
      MixpanelEvent.track("Header Button Clicked", properties);
    }
    window.open(link, "_blank");
  };
  const trackInfo = async () => {
    const res = await fetch("/api/track", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: siteId,
        type: "clicks",
      }),
    });
    const data = await res.json();
  };
  return (
    <div ref={ref} className={classNames(" group h-auto ", fontFam?.name)}>
      <div
        className={classNames(
          fromPage == "edit" ? " group-hover:bg-sky-50" : " group-hover:none",
          "relative"
          // `bg-${themeColor.name}-50`
        )}
      >
        <Disclosure as="nav" className="bg-customblack font-Poppins">
          {({ open }) => (
            <>
              <div
                className="mx-auto max-w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32  py-5 2xl:py-10
        "
              >
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="p-2 inline-flex items-center justify-center text-customt32 hover:text-customt64 focus:outline-none focus:ring focus:ring-customt64">
                      {open ? (
                        <XMarkIcon className="w-8 h-8" />
                      ) : (
                        <Bars3Icon className="w-8 h-8" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <h3 className="font-bold text-2xl lg:text-4xl xl:text-4xl 2xl:text-6xl text-customt32">
                        {dataObj?.data?.companyName}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="hidden sm:flex space-x-4">
                      {dataObj?.data?.navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? "text-customt32" : "text-customt32",
                            "rounded-md px-3 py-2 text-md lg:text-lg xl:text-xl 2xl:text-2xl font-light"
                          )}
                          aria-current={item?.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-5 px-2 pb-3 pt-2 min-h-screen">
                  {dataObj?.data?.navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-white hover:text-customblack",
                        "block rounded-md px-3 py-2 text-base font-medium text-center "
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
              {fromPage == "edit" && (
                <div className="absolute right-1 top-1 z-20 mt-2 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md ">
                  {/* <span
                className="cursor-pointer p-1"
                onClick={() => {
                    saveChanges("up", dataObj.key);
                }}
                >
                <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span>
                <span
                className="cursor-pointer p-1"
                onClick={() => {
                    saveChanges("down", dataObj.key);
                }}
                >
                <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span> */}
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("edit", dataObj.key);
                    }}
                  >
                    <PencilIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("delete", dataObj?.key);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                </div>
              )}
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
});
export default HeaderTemp8;
