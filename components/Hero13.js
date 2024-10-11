import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useRef, useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hero13 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  console.log(dataObj , "<< dataObj");

  useEffect(() => {
    
    const handleImageLoad = () => {
      setImageLoaded(true);
    };
    if (imageRef.current) {
      imageRef.current.addEventListener("load", handleImageLoad);
    }

    
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleImageLoad);
      }
    };

  }, []);

  // Calculate the aspect ratio of the image
  const aspectRatio = imageRef.current
    ? imageRef.current.naturalWidth / imageRef.current.naturalHeight
    : 1;

  // Calculate the wrapper div's height and width based on the aspect ratio
  const maxHeight = 400; // Set your desired maximum height here
  const maxWidth = maxHeight * aspectRatio;

  return (
    <div ref={ref} className={`group px-4 sm:px-0`}>
      <div
       id={dataObj.key}
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative",
          fontFam?.name
        )}
      >
        <div className="relative isolate overflow-hidden bg-white">
          <img
            src={dataObj.data.image}
            alt=""
            className="absolute inset-0 -z-10 sm:h-full sm:w-full object-cover object-center"
          />
          <div className="px-6 lg:px-8 relative">
            <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
              <div className="text-center ">
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  {dataObj.data.title}
                </h1>
              </div>
            </div>
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
                saveChanges("generateai", dataObj.key, "hero");
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
    </div>
  );
});
export default Hero13;
