import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  fontFam,
  ArrowPathIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { forwardRef } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join("");
}
{
  /**dont remove here */
}
const cardData = [
  {
    image: "/tt71.png",
    image1: "/tt7.png",
    title: "Antoinette",
    description:
      "“ Kiaesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat ”",
  },
  {
    image: "/tt73.png",
    image1: "/tt7.png",
    title: "Charles",
    description:
      "“ Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat ”",
  },
  {
    image: "/tt72.png",
    image1: "/tt7.png",
    title: "Mary J. Gasser",
    description:
      "“ Riaesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat ”",
  },
];

const TestimonialTemp7 = forwardRef((props, ref) => {
  // export default function Testimonials7({
  //   fromPage,
  //   dataObj,
  //   saveChanges,
  //   fontFam,
  //   themeColor,
  // })

  // {

  let { fromPage, dataObj, saveChanges, fontFam, themeColor } = props;
  return (
    <>
      <div ref={ref} id={dataObj.key} className={`bg-white group  relative`}>
        <div className="p-10 xl:p-20">
          <div className="text-center mb-10">
            <p className="font-bold text-herot7 text-2xl">Testimonials</p>
            <p className="text-4xl font-customblack font-bold">
              Sadis elit noumy erimond
            </p>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-24   justify-center items-center font-Poppins mt-16 xl:mt-24">
            {dataObj.data.testimonials.map((card, index) => (
              <div
                key={index}
                className="relative  bg-white border border-customt31 rounded-2xl shadow-md p-10 "
              >
                <div className="  rounded-full text-white flex items-center justify-center ">
                  <img src={card.image} alt="Image" className="w-20 h-20" />
                </div>
                <h2 className="text-center text-2xl font-bold mt-6 ml-4 text-herot7">
                  {card.title}
                </h2>
                <p className="text-center text-customt31 text-lg  mt-4 ml-4 mr-4 mb-4">
                  {card.content}
                </p>
                <div className="flex items-center justify-center ">
                  <img
                    src={cardData[index]?.image1}
                    alt=""
                    className="w-10 h-6"
                  />
                </div>
              </div>
            ))}
          </div>
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
export default TestimonialTemp7;
