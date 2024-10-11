import {
  AcademicCapIcon,
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  BanknotesIcon,
  BoltIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  EyeDropperIcon,
  FolderIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { featherIconsList } from "../../lib/genericData";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TestimonialTemp8 = forwardRef((props, ref) => {
  // export default function Testimonial5({
  //   fromPage,
  //   dataObj,
  //   saveChanges,
  //   themeColor,
  //   fontFam,
  // }) {

  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

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
        className={` grid  group relative bg-white `}
      >
        <div className="px-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20 font-Poppins bg-customblack">
          <h1 className="text-lg pt-12 sm:mt-12 md:pt-0 2xl:pt-0 sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-7xl mb-20 w-[70%] text-customt32">
            {dataObj.data.title}{" "}
          </h1>
          <div className="grid pb-10 sm:p-0 xl:pb-0 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-10 xl:gap-20">
            {dataObj.data.testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-customtbg rounded-md shadow-md grid xl:grid-cols-2"
              >
                <div className="w-full h-auto order-last sm:order-last lg:order-last xl:order-first 2xl:order-first">
                  <div className="p-14">
                    <img
                      src={item.image}
                      alt=""
                      className="w-[60px] h-[40px] mb-10"
                    />
                    <p className="text-sm md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl mb-10 text-customt32">
                      {item.content}
                    </p>
                    <p className="text-customt8 text-md md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
                      {item.name}
                    </p>
                  </div>
                </div>
                <div className="w-full h-auto">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {fromPage == "edit" && (
          <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex   hidden py-1 px-2 space-x-2 rounded-md">
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
export default TestimonialTemp8;
