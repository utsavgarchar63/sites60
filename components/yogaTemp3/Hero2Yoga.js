import React from "react";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useRef, useEffect, useState } from "react";
import ModalEditText from "../ModalEditText";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hero2Yoga = forwardRef((props, ref) => {
  let {
    fromPage,
    dataObj,
    saveChanges = () => {},
    themeColor,
    themeColorPrimary,
    themeColorSecondary,
    themeColorTertiary,
    fontFam,
  } = props;

  const handleSaveChanges = (action, key, type) => {
    if (typeof saveChanges === "function") {
      saveChanges(action, key, type);
    }
  };
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const [showModalEditText, setShowModalEditText] = useState(false);
  const [count, setCount] = useState(1);

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

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>
          <div
            className={`group relative bg-${themeColorPrimary?.name}-50 bg-cover object-cover object-center pt-5 sm:pt-16 w-full h-full sm:pb-20 lg:h-[650px] sm:h-full bg-opacity-100`}
            style={{ backgroundImage: `url('/Group 237.png')` }}
          >
            <div className="container mx-auto flex flex-col items-center justify-center my-20">
              <div className="text-center">
                <h1
                  className={`text-xl sm:text-2xl font-bold sm:mb-6 ${fontFam?.name} text-${themeColorSecondary?.name}-900 `}
                  //text-yogatext2
                  onClick={() => {
                    handleSaveChanges("edit", dataObj?.key, "heading");
                  }}
                >
                  {dataObj?.data?.title}
                  {/* {dataObj?.data?.title ? dataObj?.data?.title : "Title"} */}
                </h1>
                <h2
                  onClick={() => {
                    handleSaveChanges("edit", dataObj?.key, "subheading");
                  }}
                  className={`text-lg lg:text-4xl md:text-4xl sm:px-0 px-4 lg:w-[800px] font-bold mb-4 sm:mb-12 ${fontFam?.name} text-${themeColorSecondary?.name}-800 `}
                >
                  {
                    dataObj?.data?.subtitle
                      ? dataObj?.data?.subtitle
                      : "Subtitle"
                    //text-yogatext
                  }
                </h2>
              </div>

              <img
                src={dataObj?.data?.image}
                alt="Your Image"
                className="w-[700px] h-80 lg:w-[859px] object-cover sm:px-0 px-4 md:-w-[700px] md:h-[225px] rounded-md"
                onClick={() => handleSaveChanges("edit", dataObj?.key, "image")}
              />

              <div
                className={classNames(
                  "text-center sm:px-0 px-4 lg:w-[800px] mt-4 sm:mt-8 sm:mb-0 mb-4",
                  fontFam?.name
                )}
                onClick={() => {
                  handleSaveChanges("edit", dataObj?.key, "subheading");
                }}
              >
                <p
                  className={
                    `sm:text-lg text-sm ${fontFam?.name} text-${themeColorSecondary?.name}-700`
                    //text-yogatext
                  }
                >
                  {dataObj?.data?.subtitle
                    ? dataObj?.data?.subtitle
                    : "SubTitle"}
                </p>
              </div>
            </div>

            {fromPage == "edit" && (
              <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
                <span
                  className="cursor-pointer p-1"
                  onClick={() => handleSaveChanges("up", dataObj?.key)}
                >
                  <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span>
                <span
                  className="cursor-pointer p-1"
                  onClick={() => handleSaveChanges("down", dataObj?.key)}
                >
                  <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span>
                <span
                  className="cursor-pointer p-1"
                  onClick={() => {
                    saveChanges("addSection", dataObj?.key);
                    setCount(count + 1);
                    console.log("Adding...", dataObj?.key + 1);
                  }}
                >
                  <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span>
                <span
                  className="cursor-pointer p-1"
                  onClick={() =>
                    handleSaveChanges("generateai", dataObj?.key, "hero")
                  }
                >
                  <ArrowPathIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span>

                <span
                  className="cursor-pointer p-1"
                  onClick={() => {
                    saveChanges("delete", dataObj.key);
                    setCount(count - 1);
                  }}
                >
                  <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
                </span>
              </div>
            )}
          </div>
          <ModalEditText
            showEditText={showModalEditText}
            closeEditText={() => setShowModalEditText(false)}
            sectionName={"subHeadEdit"}
          />
        </div>
      );
    }
    return components;
  };
  return <> {renderComponents()}</>;
});

export default Hero2Yoga;
