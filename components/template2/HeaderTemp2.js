import { Fragment, useState, useEffect, useRef } from "react";
import { forwardRef } from "react";
import Link from "next/link";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { MixpanelEvent } from "../../lib/trackEventFrontend";
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "About", href: "#", current: false },
  { name: "Features", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// export const HeaderTemp2 = () => {
const HeaderTemp2 = forwardRef((props, ref) => {
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
    console.log("Track Clicks Data>>>>", data);
  };
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <div
        ref={ref}
        className={classNames(
          " group bg-customblack text-white h-auto sm:px-10 py-3 ",
          fontFam?.name
        )}
      >
        <nav
          className={classNames(
            fromPage == "edit" ? " group-hover:none" : " group-hover:none",
            "relative",
            `bg-customblack`
          )}
        >
          <div className="justify-between mx-auto lg:max-w-full md:items-center md:flex sm:px-10 px-4">
            <div>
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <a href="javascript:void(0)">
                  <h2 className="text-3xl font-bold text-white">
                    {dataObj?.data?.companyName}
                  </h2>
                </a>
                <div className="md:hidden">
                  <button
                    className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
              >
                <ul className="items-center justify-center font-light space-y-8 md:flex md:space-x-16 md:space-y-0">
                  {dataObj?.data?.navigation.map((item, index) => (
                    <li
                      key={item.name}
                      className={`text-${
                        index === 0
                          ? "white text-opacity-100 font-light font-poppins"
                          : "white text-opacity-180 font-thin font-poppins"
                      } hover:text-gray-200 text-md sm:text-xl`}
                    >
                      <a href={`#${item.href}`}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 z-20 mt-2 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md ">
            <span
              className="cursor-pointer p-1"
              onClick={() => {
                saveChanges("edit", dataObj?.key);
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
      </div>
    </>
  );
});
export default HeaderTemp2;
