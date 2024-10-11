import { forwardRef } from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const FooterTemp8 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  return (
    <footer
      ref={ref}
      id={dataObj.key}
      className={classNames(
        " font-Poppins bg-ft6 text-customt32",
        "group relative"
      )}
    >
      <div className="mx-auto max-w-full px-6 py-12  lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className=" text-md sm:text-md md:text-lg lg:text-lg  xl:text-xl 2xl:text-2xl text-center sm:text-center md:text-center lg:text-center xl:text-left 2xl:text-left px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-2 sm:py-4 md:py-8 lg:py-12 xl:py-16 2xl:py-20  leading-5 text-gray-500">
            {dataObj.data.company}
          </p>
        
        </div>
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
  );
});
export default FooterTemp8;
