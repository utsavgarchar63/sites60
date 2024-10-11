
import {
  AcademicCapIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,  ArrowPathIcon,
  BanknotesIcon, BoltIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, EyeDropperIcon, FolderIcon, GlobeAltIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../lib/genericData";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import {forwardRef} from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Testimonials6 = forwardRef((props, ref) => {
// export default function Testimonial5({ fromPage, dataObj, saveChanges, themeColor, fontFam }) {


  
let {
  fromPage,
  dataObj,
  saveChanges,
  fontFam,
  themeColor,
} = props;


   const iconsList = featherIconsList();
  let themeColorName = themeColor.name;

  const FeatherIcon = ({name}) => {


    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {

      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon)


    }, [name]);

    if (selIcon != undefined) {
      return (

          <selIcon.shape className="w-8 h-8" />

      );
    }
   };



  return (
    <>
   <div ref={ref} id={dataObj.key} className={`group relative bg-gray-100 py-4 sm:py-14`}>
  <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
    {dataObj.data.testimonials.map((item, index) => (
      <div
        className={classNames(
          fromPage == "edit"
            ? "group-hover:bg-gray-300/20"
            : "group-hover:none",
          "px-4 sm:px-0"
        )}
      >
        <section className="isolate overflow-hidden px-6 lg:px-8">
          <div className="relative mx-auto max-w-2xl">
            <figure className="grid grid-cols-1 items-center justify-center gap-x-6 gap-y-8 sm:gap-x-36">
              <div className="relative col-span-2 lg:col-start-1 lg:row-start-1">
                <div className="text-xl font-normal text-gray-600 sm:text-xl text-left sm:max-w-lg max-w-full">
                  {item.content}
                </div>
              </div>
              <div className="col-end-1 w-16 lg:row-span-1 lg:w-24 md:mt-4">
                <img
                  className="rounded-sm bg-indigo-50 md:w-36 w-24 md:h-24 h-24 object-cover"
                  src={item.image}
                  alt=""
                />
                <figcaption className="text-base lg:col-start-1 lg:row-start-1">
                  <div className={`font-semibold text-${themeColor.name}-500`}>{item.name}</div>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>
      </div>
    ))}
  </Carousel>



    {fromPage == "edit" && (
            <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
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

  </>
  );
});
export default Testimonials6;
