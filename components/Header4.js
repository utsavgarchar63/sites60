import { Fragment, forwardRef } from "react";
import { Popover, Transition } from "@headlessui/react";
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
import { MixpanelEvent } from "../lib/trackEventFrontend";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header4 = forwardRef((props, ref) => {
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
    <div  ref={ref} >
      <header className={classNames(" group h-auto ", fontFam?.name)}>
        <Popover
          className={classNames(
            fromPage == "edit" ? " group-hover:bg-white" : " group-hover:none",
            "relative bg-white "
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 sm:justify-between sm:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src={dataObj.data.logo}
                    alt=""
                  />
                </a>
              </div>
              <div className="-my-2 -mr-2 md:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                {dataObj.data.navigation.map((item) => (
                  <a
                    key={item.name}
                    href={`#${item.href}`}
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </Popover.Group>
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-4">
                {dataObj.data.btn1_show == true && (
                  <a
                    onClick={() => gotoUrl(dataObj.data.btn1_link)}
                    className="bg-gray-500/10 px-4 py-2 rounded-md shadow-sm cursor-pointer whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    {dataObj.data.btn1_text}
                  </a>
                )}

                {dataObj.data.btn2_show == true && (
                  <a
                    onClick={() => gotoUrl(dataObj.data.btn2_link)}
                    className={classNames(
                      "cursor-pointer inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium text-gray-50 ",
                      `text-white bg-${themeColor.name}-500`
                    )}
                  >
                    {dataObj.data.btn2_text}
                  </a>
                )}
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
              style={{ zIndex: "99999" }}
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {dataObj.data.navigation.map((item, index) => (
                        <a
                          key={item.name}
                          href={`#${item.href}`}
                          className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="space-y-2 pt-2 pb-4 px-5">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8"></div>
                  <div>
                    <div className="md:hidden items-center justify-between flex flex-1 lg:w-0">
                      {dataObj.data.btn1_show == true && (
                        <a
                          onClick={() => gotoUrl(dataObj.data.btn1_link)}
                          className="bg-gray-500/20 px-4 py-2 rounded-md shadow-sm
                        cursor-pointer whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                          {dataObj.data.btn1_text}
                        </a>
                      )}

                      {dataObj.data.btn2_show == true && (
                        <a
                          onClick={() => gotoUrl(dataObj.data.btn2_link)}
                          className={classNames(
                            "cursor-pointer inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium text-gray-50 ",
                            `text-white bg-${themeColor.name}-500`
                          )}
                        >
                          {dataObj.data.btn2_text}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>

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
        </Popover>
      </header>
    </div>
  );
});
export default Header4;
