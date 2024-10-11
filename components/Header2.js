import { Fragment ,forwardRef} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MixpanelEvent } from "../lib/trackEventFrontend";

import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header2 = forwardRef( (   props,ref ) =>{
  let {
  fromPage,
  dataObj,
  saveChanges,
  themeColor,
  fontFam,
  siteId,
  siteKey,
} = props;
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
    console.log("Track Clicks Data>>>>", data);
  };

  return (
    <>
      <div ref={ref} className="min-h-full relative group">
        <Disclosure as="nav" className={classNames(themeColor.bgColor, fontFam?.name)}>
          {({ open }) => (
            <>
              <div
                className={classNames(
                  fromPage == "edit"
                    ? " group-hover:bg-gray-100/20"
                    : " group-hover:none",
                  "mx-auto max-w-7xl px-4 sm:px-4 lg:px-4 "
                )}
              >
                <div className="flex h-16 items-center py-6 justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-auto rounded-full"
                        src={dataObj.data.logo}
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {dataObj.data.navigation.map((item,index) => (
                          <a
                            key={item.name}
                            href={`#${item.href}`}
                            className={classNames(
                              item.current
                                ? `bg-${themeColor.name}-500 text-white`
                                : `text-white hover:bg-${themeColor.name}-500 hover:bg-opacity-75`,
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6 space-x-4">
                      {dataObj.data.btn1_show == true && (
                        <a
                          onClick={() => gotoUrl(dataObj.data.btn1_link)}
                          className={classNames(
                            "cursor-pointer inline-block rounded-md border border-transparent bg-gray-800/10 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                          )}
                        >
                          {dataObj.data.btn1_text}
                        </a>
                      )}

                      {dataObj.data.btn2_show == true && (
                        <a
                          onClick={() => gotoUrl(dataObj.data.btn2_link)}
                          className={classNames(
                            "cursor-pointer inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium ",
                            `text-${themeColor.name}-500 hover:bg-${themeColor.name}-50`
                          )}
                        >
                          {dataObj.data.btn2_text}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className={classNames(
                        "inline-flex items-center justify-center rounded-md p-2 text-gray-200 bg-gray-800/20 bg-opacity-50 hover:text-white focus:outline-none"
                      )}
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {dataObj.data.navigation.map((item,index) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? `bg-${themeColor.name}-500 text-white`
                          : `text-white hover:bg-${themeColor.name}-400 hover:bg-opacity-75`,
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div
                  className={`border-t border-${themeColor.name}-500 pt-4 pb-3`}
                >
                  <div className="flex items-center px-5">
                    <div className="ml-4 flex items-center justify-between w-full md:ml-6">
                      <a
                        href={dataObj.data.btn1_link}
                        className={classNames(
                          "inline-block bg-gray-800/10 rounded-md border border-transparent py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                        )}
                      >
                        {dataObj.data.btn1_text}
                      </a>
                      <a
                        href={dataObj.data.btn2_link}
                        className={classNames(
                          "inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium ",
                          `text-${themeColor.name}-500 hover:bg-${themeColor.name}-50`
                        )}
                      >
                        {dataObj.data.btn2_text}
                      </a>
                    </div>
                  </div>
                  {/* <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div> */}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 z-20 mt-2 bg-gray-800 group-hover:flex  hidden py-1 px-2 space-x-2 rounded-md ">
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
    </>
  );
})
export default Header2;