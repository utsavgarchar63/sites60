import { Fragment, forwardRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MixpanelEvent } from "../lib/trackEventFrontend";

 
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header3 = forwardRef((props, ref) => {
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
    console.log("Track Clicks Data>>>>", data);
  };

  return (
    <>
      <div  ref={ref} className="min-h-full relative group">
        <Disclosure
          as="nav"
          className={classNames("bg-white shadow-sm ", fontFam?.name)}
        >
          {({ open }) => (
            <>
              <div
                className={classNames(
                  fromPage == "edit"
                    ? " group-hover:bg-gray-200/40"
                    : " group-hover:none",
                  "mx-auto max-w-7xl px-4 sm:px-4 lg:px-4 "
                )}
              >
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="h-10 w-auto rounded-full lg:hidden"
                        src={dataObj.data.logo}
                        alt="Your Company"
                      />
                      <img
                        className="h-10 w-auto rounded-full lg:block"
                        src={dataObj.data.logo}
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {dataObj.data.navigation.map((item, index) => (
                        <a
                          key={item.name}
                          href={`#${item.href}`}
                          className={classNames(
                            item.current
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <div className="ml-4 flex items-center md:ml-6 space-x-4">
                      {dataObj.data.btn1_show == true && (
                        <a
                          onClick={() => gotoUrl(dataObj.data.btn1_link)}
                          className={classNames(
                            "cursor-pointer inline-block rounded-md border border-transparent bg-gray-800/10 py-2 px-4 text-base font-medium text-gray-600 hover:bg-opacity-75"
                          )}
                        >
                          {dataObj.data.btn1_text}
                        </a>
                      )}

                      {dataObj.data.btn2_show == true && (
                        <a
                          onClick={() => gotoUrl(dataObj.data.btn2_link)}
                          className={classNames(
                            "cursor-pointer inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium text-white",
                            ` bg-${themeColor.name}-500`
                          )}
                        >
                          {dataObj.data.btn2_text}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800/20 p-2 text-gray-400 hover:bg-gray-100 hover:bg-gray-800/20 focus:outline-none">
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

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {dataObj.data.navigation.map((item, index) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="ml-4 flex items-center justify-between w-full md:ml-6">
                      <a
                        href={dataObj.data.btn1_link}
                        className={classNames(
                          "inline-block rounded-md border border-transparent bg-gray-800/10 py-2 px-4 text-base font-medium text-gray-600 hover:bg-opacity-75"
                        )}
                      >
                        {dataObj.data.btn1_text}
                      </a>
                      <a
                        href={dataObj.data.btn2_link}
                        className={classNames(
                          "inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium text-gray-500 ",
                          `text-white bg-${themeColor.name}-500`
                        )}
                      >
                        {dataObj.data.btn2_text}
                      </a>
                    </div>
                  </div>
                  {/* <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
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
          <div className="absolute right-1 top-1 z-20 mt-2 bg-gray-800 group-hover:flex   hidden py-1 px-2 space-x-2 rounded-md ">
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
});
export default Header3;
