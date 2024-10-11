import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ModalEditText from "../ModalEditText";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import ModalEditImage from "../ModalEditImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeroYoga = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, themeColorPrimary, themeColorSecondary, themeColorTertiary, fontFam, setSections } =
    props;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [count, setCount] = useState(1);
  const imageRef = useRef(null);
  const searchParams = useSearchParams();

  const [showModalEditText, setShowModalEditText] = useState(false);

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
    const newObj = {
      data: {
        image:
          "https://images.unsplash.com/photo-1488228469209-c141f8bcd723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTg3MDIxNDZ8&ixlib=rb-4.0.3&q=80&w=1080",
        title: "About Us",
      },
      section_id: "heroYoga",
    };
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>

          <div ref={ref} className={`group bg-${themeColorPrimary.name}-50 px-4 sm:px-0`}>
            <div
              id={dataObj?.key}
              className={classNames(
                fromPage === "edit"
                  ? " group-hover:bg-gray-300/20"
                  : " group-hover:none",
                "relative",
                fontFam?.name
              )}
            >
              <div className={`relative isolate h-72 w-full object-cover sm:h-[639px] sm:w-full overflow-hidden bg-${themeColorPrimary.name}-50`}>
                <img
                  ref={imageRef}
                  src={dataObj?.data?.image}
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full sm:h-full sm:w-full object-cover object-center"
                  onClick={
                    fromPage === "edit"
                      ? () => saveChanges("edit", dataObj?.key, "image")
                      : "undefined"
                  }
                />
                <div className="px-6 sm:px-6 lg:px-8 relative">
                  <div className="mx-auto max-w-4xl py-8 sm:py-14 lg:py-20">
                    <div className="text-center group">
                      <h1
                        className="text-xl font-bold sm:w-full tracking-tight sm:leading-tight text-white sm:text-6xl relative"
                        onClick={
                          fromPage === "edit"
                            ? () =>
                              saveChanges("edit", dataObj?.key, "heading")
                            : undefined
                        }
                      >
                        {dataObj?.data.title ? dataObj?.data.title : "Title"}

                      </h1>
                    </div>
                  </div>
                </div>
                {/* <span
              className="cursor-pointer p-1 absolute flex top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={fromPage === "edit" ? () => saveChanges("edit", dataObj?.key, "image") : undefined}

            >
              <PencilSquareIcon className="w-6 h-6 text-gray-100 mr-2" /> 
              <span className="text-white">Edit Image</span>
              
            </span> */}
              </div>

              {fromPage === "edit" && (
                <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex  group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("up", dataObj?.key);
                    }}
                  >
                    <ArrowUpIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("down", dataObj?.key);
                    }}
                  >
                    <ArrowDownIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      setCount(count + 1);
                      console.log("Components:", components);
                      // setSections(newObj);
                    }}
                  >
                    <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
                  </span>
                  <span
                    className="cursor-pointer p-1"
                    onClick={() => {
                      saveChanges("generateai", dataObj?.key, dataObj);
                    }}
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
          </div>
          <ModalEditText
            showEditText={showModalEditText}
            closeEditText={() => setShowModalEditText(false)}
            sectionName={"headingEdit"}
            editTextContent={dataObj?.data.title}
          />
          <ModalEditImage
            showEditText={showModalEditText}
            closeEditText={() => setShowModalEditText(false)}
            sectionName={"headingEdit"}
            editTextContent={dataObj?.data.title}
          />

        </div>
      );
    }
    return components;
  };

  return <>{renderComponents()}</>;
});

export default HeroYoga;
