import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  fontFam,  ArrowPathIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {forwardRef} from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join("");
}
{
  /**dont remove here */
}

const Testimonials7 = forwardRef((props, ref) => {

// export default function Testimonials7({
//   fromPage,
//   dataObj,
//   saveChanges,
//   fontFam,
//   themeColor,
// })

// {

let {
    fromPage,
    dataObj,
    saveChanges,
    fontFam,
    themeColor,
  } = props;

  
  return (
    <div   ref={ref} id={dataObj.key} className={`bg-white group  relative`}>
      <div className="grid grid-cols-3 gap-7 mx-6 ">
        {dataObj.data.testimonials.map((item, index) => (
          <div className={classNames(fromPage == "edit")}>
            <div>
              <div>
                <div className="mx-auto  pt-10 ">
                  <article className="">
                    <div className="border-2 border-gray-400 ">
                      <p
                        className={`mt-1 leading-8 ${fontFam?.name} text-center text-sm font-bold text-black-500 flex align-center border-1`}
                      >
                        {item.content}
                      </p>
                    </div>
                    <div className="relative mt-4 flex my-5 items-center x-5 gap-x-2">
                      <img
                        src={item.image}
                        alt=""
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-bold ">
                          <a className={`text-${themeColor.name}-500 `}>
                            <span className={`  absolute inset-0`} />
                            {item.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{item.designation}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fromPage == "edit" && (
        <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  hidden py-1 px-2 space-x-2 rounded-md">
          <span
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
          </span>
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
                saveChanges("generateai", dataObj.key , "testimonials");
              }}
            >
              <ArrowPathIcon className="w-5 h-5 mr-2 text-gray-100" />
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
export default Testimonials7;
