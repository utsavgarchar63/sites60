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
import {forwardRef} from "react";
import { featherIconsList } from "../lib/genericData";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Testimonials8 = forwardRef((props, ref) => {
// export default function Testimonial5({
//   fromPage,
//   dataObj,
//   saveChanges,
//   themeColor,
//   fontFam,
// }) {


let {
  fromPage,
  dataObj,
  saveChanges,
  themeColor,
  fontFam,
} = props;

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
      <div  ref={ref} id={dataObj.key} className={` grid  group relative bg-white `}>
        <div className="text-center bg-white">
          <h2
            className={`text-3xl my-6 font-bold text-${themeColor.name}-500  sm:text-4xl`}
          >
            {dataObj.data.title}
          </h2>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-1 text-sm font-bold text-black-500 ">
                {dataObj.data.subtitle}
              </span>
            </div>
          </div>
          {/* <p className="mx-auto mt-3 max-w-2xl  text-xl  sm:mt-4">
            </p> */}
        </div>
        <div className="grid grid-cols-3 gap-7 my-10 mx-10">
          {dataObj.data.testimonials.map((item, index) => (
            <div
              className={classNames(
                fromPage == "edit"
                  ? " group-hover:bg-gray-300/20"
                  : " group-hover:none",
                " sm:py-0 py-4 sm:px-0 px-4"
              )}
            >
              <div className="relative  ">
                <div className="absolute inset-0">
                  <div className="h-1/3  sm:h-2/3" />
                </div>
                <div className="relative mx-auto max-w-7xl">
                  <div className="grid grid-cols-1">
                    <div key={item.name} className="  ">
                      <div>
                        <img
                          className="h-22 w-full object-cover"
                          src={item.image}
                          alt="image"
                        />
                      </div>
                      <div className={`bg-${themeColor.name}-500 p-4`}>
                        <div >
                          <h2 className={`text-white ${fontFam?.name}`}>{item.content}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
export default Testimonials8;
