import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {forwardRef} from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Testimonials4 = forwardRef((props, ref) => {

  let { fromPage, dataObj, saveChanges, themeColor } = props;
// export default function Testimonials3({ fromPage, dataObj, saveChanges, themeColor }) {
  return (
    <div ref={ref} id={dataObj.key} className={`group relative`}>
    <Carousel>
      {dataObj.data.testimonials.map((item, index) => (
        <div
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            "bg-white sm:py-0 py-4 sm:px-0 px-4"
          )}
        >
          <section className={classNames("px-4 sm:px-0", themeColor.bgColor)}>
            <div className="mx-auto max-w-7xl md:grid md:grid-cols-1 md:px-6 lg:px-8">
              <div className="py-12 px-4 sm:px-6 md:flex md:flex-col md:border-r md:border-gray-300 md:py-16 md:pl-0 md:pr-10 lg:pr-16">
                <blockquote className="mt-6 md:flex md:flex-grow md:flex-col text-left mx-auto">
                  <div className="relative text-lg font-medium text-white md:flex-grow">
                    <svg
                      className="absolute top-0 -left-5 h-8 w-8 -translate-x-3 -translate-y-2 transform text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative">{item.content}</p>
                  </div>
                  <footer className="mt-8">
                    <div className="flex items-start">
                      <div className="inline-flex flex-shrink-0 rounded-full border-2 border-white">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-white">
                          {item.name}
                        </div>
                        <div className="text-base font-medium text-gray-300">
                          {item.designation}
                        </div>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
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
  );
});
export default Testimonials4;
