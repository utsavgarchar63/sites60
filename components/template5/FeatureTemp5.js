
import {
    ArrowDownIcon,ArrowPathIcon,
    TrashIcon,
    PencilIcon,
    ArrowUpIcon,
    InboxIcon,
  } from "@heroicons/react/24/outline";
  
  import { featherIconsList } from "../../lib/genericData";
  
  import { useState, useEffect, forwardRef } from "react";
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  const featuresData = [
    {
      name: "Push to deploy",
      description: "Velit commodi magnam maiores quia aliquam quasi ipsum",
      imageurl: "/ft5.png",
    },
    {
      name: "SSL certificates",
      description: "Accusantium rerum suscipit ass umenda quibusdam",
      imageurl: "/ft51.png",
    },
    {
      name: "Simple queues",
      description: "Rerum a sequi sit quos sit veniam ad laboriosam illum",
      imageurl: "/ft53.png",
    },
    {
      name: "Advanced security",
      description: "Explicabo dolores facere neque quis aliquid natus inven",
      imageurl: "/ft54.png",
    },
    {
      name: "Advanced security",
      description: "Cum a sequi sit quos sit veniam ad laboriosam illum",
      imageurl: "/ft55.png",
    },
    {
      name: "Advanced security",
      description: "Explicabo dolores facere neque quis aliquid natus inven",
      imageurl: "/ft56.png",
    },
  ];
  
  const FeatureTemp5 = forwardRef((props, ref) => {
    let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;
  
    const iconsList = featherIconsList();
  
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
        <div
        ref={ref}
        id={dataObj.key}
        className={classNames(
          "group relative",
        //   themeColor.bgColor,
          fontFam?.name
        )}
      >
        <div
          className={classNames(
            fromPage == "edit"
              ? " group-hover:bg-gray-300/20"
              : " group-hover:none",
            ""
          )}
        >
      <div className="  font-Poppins">
        <div className=" p-6 md:p-16 xl:p-20 ">
          <dl className="grid max-w-xl grid-cols-1  gap-x-24 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {dataObj.data.features.map((feature,i) => (
              <div
                key={feature.name}
                className="relative pl-4 xl:pl-20 border px-12 py-6 xl:p-12 border-customt51"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 mt-7  rounded-lg  pl-14">
                    <img
                      src={featuresData[i]?.imageurl}
                      className="w-8 h-9 xl:w-full xl:h-auto  text-white"
                      aria-hidden="true"
                    />
                  </div>
                </dt>
                <dd className="pl-24 xl:pl-32 text-md sm:tex-lg md:text-xl lg:text-2xl xl:text-3xl leading-7 text-customt5">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
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
                saveChanges("generateai", dataObj.key , "features");
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
  }
  );
export default FeatureTemp5;