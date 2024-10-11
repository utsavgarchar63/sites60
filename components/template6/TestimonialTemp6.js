import {
  AcademicCapIcon,
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowPathIcon,
  BanknotesIcon,
  BoltIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  EyeDropperIcon,
  FolderIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import { featherIconsList } from "../../lib/genericData";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TestimonialTemp6 = forwardRef((props, ref) => {
  // export default function Testimonial5({ fromPage, dataObj, saveChanges, themeColor, fontFam }) {

  let { fromPage, dataObj, saveChanges, fontFam, themeColor } = props;

  const iconsList = featherIconsList();
  let themeColorName = themeColor.name;

  const FeatherIcon = ({ name }) => {
    const [selIcon, setSelIcon] = useState(undefined);

    useEffect(() => {
      let newIcon = iconsList.filter((e) => e.icon == name)[0];

      setSelIcon(newIcon);
    }, [name]);

    if (selIcon != undefined) {
      return <selIcon.shape className="w-8 h-8" />;
    }
  };

  return (
    <>
      <div
        ref={ref}
        id={dataObj.key}
        className={`group relative bg-gray-100 py-4 sm:py-14`}
      >
        <div
          className={classNames(
            fromPage == "edit"
              ? "group-hover:bg-gray-300/20"
              : "group-hover:none",
            "px-4 sm:px-0"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12  max-w-full ">
            {dataObj.data.testimonials.map((testimonial, index) => (
              <div key={index} className=" mx-auto  relative text-white">
                <div className="container mx-auto  ">
                  <div className="triangle-isosceles text-2xl  ">
                    <p className="p-4"> {testimonial.description}</p>
                  </div>
                </div>
                <div className="relative flex items-center ">
                  <img
                    src={testimonial.image}
                    className="w-16 h-16 bg-blue-500 rounded-full inline-block mr-6"
                  />
                  <div className="inline-block">
                    <p className="text-texth6 text-2xl">{testimonial.name}</p>
                    <p className="text-customt31 text-2xl">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                saveChanges("generateai", dataObj.key, "testimonials");
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
export default TestimonialTemp6;
