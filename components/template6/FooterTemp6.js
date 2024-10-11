import { forwardRef } from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

// const platforms = [
//   {
//     id: 1,
//     name: "Facebook",
//     online: true,
//     icon: "https://www.svgrepo.com/show/330401/facebook.svg",
//   },
//   {
//     id: 2,
//     name: "Instagram",
//     online: true,
//     icon: "https://www.svgrepo.com/show/333552/instagram.svg",
//   },
//   {
//     id: 3,
//     name: "Twitter",
//     online: true,
//     icon: "https://www.svgrepo.com/show/349909/twitter.svg",
//   },
//   {
//     id: 4,
//     name: "LinkedIn",
//     online: true,
//     icon: "https://www.svgrepo.com/show/144550/linkedin.svg",
//   },
//   {
//     id: 5,
//     name: "Pinterest",
//     online: true,
//     icon: "https://www.svgrepo.com/show/119056/pinterest.svg",
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FooterTemp6 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  // const getIcon = (platform) => {
  //   return platforms.filter((e) => e.name == platform)[0].icon;
  // };

  return (
    <>
      <footer
        ref={ref}
        id={dataObj.key}
        className={classNames(
          "group relative",
          themeColor.bgColor,
          dataObj.data.key,
          fontFam?.name
        )}
      >
        <div
          className={classNames(
            fromPage == "edit"
              ? "group-hover:bg-gray-300/20"
              : "group-hover:none",
            "mx-auto max-w-7xl overflow-hidden py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
          )}
        >
          <div className="w-full border-t border-customt31 font-Poppins" />
          <footer className="bg-white p-4 xl:p-20 font-Poppins">
            <div className="mx-auto max-w-full px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
              <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-center text-lg xl:text-2xl leading-5 text-gray-500">
                  {dataObj.data.company}
                </p>
              </div>
            </div>
          </footer>
        </div>
        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
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
      </footer>
    </>
  );
});
export default FooterTemp6;
