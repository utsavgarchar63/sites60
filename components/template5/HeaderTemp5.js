import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useState, forwardRef } from "react";
import { Popover,  } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ArrowUpIcon,
  ArrowDownIcon,
  PencilIcon,
  TrashIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MixpanelEvent } from "../../lib/trackEventFrontend";
const navigation = [
  { name: "Home", href: "#", current: false },
  { name: "About", href: "#", current: false },
  { name: "Features", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeaderTemp5 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam, siteId, siteKey } =
    props;
  const gotoUrl = (link) => {
    if (fromPage != "edit") {
      trackInfo();
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
  const [navbar, setNavbar] = useState(false);
  return (
    <div ref={ref} className={classNames(" group h-auto ", fontFam?.name)}>
      <Disclosure as="nav" className=" text-customt5 font-Poppins">
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
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Disclosure.Button className="p-2 inline-flex items-center justify-center text-black hover:text-customt64 focus:outline-none focus:ring focus:ring-customt64">
                      {open ? (
                        <XMarkIcon className="w-8 h-8" />
                      ) : (
                        <Bars3Icon className="w-8 h-8" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <h3 className="font-bold text-lg lg:text-2xl xl:text-3xl ">
                        SiteName
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? " " : "",
                              "rounded-md px-8 py-2 text-sm md:text-xl 2xl:text-2xl font-normal text-customt5"
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
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-5 px-2 pb-3 pt-2 min-h-screen">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-white text-black" : "text-black  ",
                        "block rounded-md px-3 py-2 text-sm md:text-2xl xl:text-2xl font-medium text-center text-customt5 "
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
export default HeaderTemp5;
