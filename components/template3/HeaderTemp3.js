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
const HeaderTemp3 = forwardRef((props, ref) => {
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
      <Disclosure as="nav" className="bg-customblue font-Poppins">
        <nav
          className={classNames(
            fromPage == "edit" ? " group-hover:bg-sky-50" : " group-hover:none",
            "relative"
            // `bg-${themeColor.name}-50`
          )}
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-full px-6 lg:px-20 py-5 lg:py-10">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
                    <Disclosure.Button className="  relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-8 w-8"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-8 w-8"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center xl:items-stretch xl:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <h3 className="font-bold text-lg lg:text-2xl xl:text-3xl text-customt3">
                      {dataObj?.data?.companyName}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="hidden xl:ml-6 xl:block">
                      <div className="flex space-x-4">
                      {dataObj.data.navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? " text-customt31"
                                : "text-customt31",
                              "rounded-md px-2 2xl:px-8 py-2 text-sm xl:text-xl 2xl:text-2xl font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="xl:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 max-h-screen">
                {dataObj.data.navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-customblue text-customt31"
                          : "text-customt31 hover:bg-gray-700 hover:text-customt31",
                        "block rounded-md px-3 py-2 text-sm md:text-xl xl:text-2xl  font-medium text-center "
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </nav>
      </Disclosure>
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
              saveChanges("delete", dataObj.key);
            }}
          >
            <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
          </span>
        </div>
      )}
    </div>
  );
});
export default HeaderTemp3;
