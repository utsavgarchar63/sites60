import { forwardRef } from "react";
import {
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { MixpanelEvent } from "../lib/trackEventFrontend";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

const Header1 = forwardRef((props, ref) => {
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

  return (
    <header
      ref={ref}
      className={classNames(
        " group h-auto ",
        themeColor?.bgColor,
        fontFam?.name
      )}
    >
      <nav
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-100/20"
            : " group-hover:none",
          "relative mx-auto px-4 sm:px-4 lg:px-4 "
        )}
        aria-label="Top"
      >
        <div
          className={classNames(
            "flex w-full items-center justify-between py-6 lg:border-none",
            `border-b border-${themeColor?.name}-400`
          )}
        >
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto rounded-full"
                src={dataObj?.data.logo}
                alt=""
              />
            </a>
            <a href="javascript:void(0)">
              <h2 className="text-xl font-bold text-gray-700 ml-6">
                {dataObj?.data?.companyName}
              </h2>
            </a>
            <div className={classNames("ml-10 hidden lg:block space-x-8")}>
              {dataObj?.data?.navigation.map((link, index) => (
                <Link href={`#${link.href}`} scroll={false}>
                  <span
                    className={`text-base font-medium text-white hover:text-${themeColor?.name}-50`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 lg:block">
            {dataObj?.data?.btn1_show == true && (
              <a
                onClick={() => gotoUrl(dataObj?.data.btn1_link)}
                className={classNames(
                  "cursor-pointer inline-block rounded-md border border-transparent py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                )}
              >
                {dataObj?.data.btn1_text}
              </a>
            )}
            {dataObj?.data?.btn2_show == true && (
              <a
                onClick={() => gotoUrl(dataObj?.data.btn2_link)}
                className={classNames(
                  "cursor-pointer  inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium ",
                  `text-${themeColor?.name}-500 hover:bg-${themeColor?.name}-50`
                )}
              >
                {dataObj?.data.btn2_text}
              </a>
            )}
          </div>
        </div>
        <div
          className={`flex flex-wrap justify-center space-x-6 py-4 lg:hidden block`}
        >
          {dataObj?.data?.navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-base font-medium text-white hover:text-${themeColor?.name}-50`}
            >
              {link.name}
            </a>
          ))}
        </div>
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
      </nav>
    </header>
  );
});

export default Header1;
