import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Styles } from "@hubspot/api-client/lib/codegen/cms/blogs/blog_posts";
import { forwardRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeroTemp7 = forwardRef((props, ref) => {
  let { fromPage, dataObj, saveChanges, size, className } = props;

  return (
    <div ref={ref} id={dataObj.key} className={`group px-4 sm:px-0`}>
      <div
        className={classNames(
          fromPage == "edit"
            ? " group-hover:bg-gray-300/20"
            : " group-hover:none",
          "relative overflow-auto py-10"
        )}
      >
        <div className="font-Poppins">
          <main>
            <div>
              <div className="relative ">
                <div className="mx-auto max-w-full ">
                  <div className="relative shadow-md sm:overflow-hidden ">
                    <div className="w-full h-auto sm:h-[750px]">
                      <img
                        className="w-full h-full xl:h-full object-cover bg-center object-top"
                        src={dataObj.data.image}
                        alt="People working on laptops"
                      />
                      <div
                        className={classNames(
                          "absolute inset-0 mix-blend-multiply  "
                        )}
                      />
                    </div>
                    <div className=" sm:absolute top-0  sm:py-24 lg:py-36 lg:pl-8 h-full right-0  xl:mr-0 2xl:mr-14 ">
                      <div className="sm:max-w-[345px]  lg:max-w-md xl:max-w-lg  2xl:max-w-3xl px-10 py-10  md:px-10 lg:py-24 lg:mt-32 md:mt-32 lg:-mr-10 xl:mt-0 xl:mr-5 xl:px-16 2xl:px-20  overflow-y-hidden shadow-2xl bg-herot7 md:py-32  xl:py-32 2xl:py-40 ">
                        <h1 className="  text-left md:text-lg lg:text-xl xl:text-4xl 2xl:text-5xl   2xl:pr-20 font-extrabold  break-normal ">
                          <span className={`block text-customt32 h-full `}>
                            {dataObj.data.title}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
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
export default HeroTemp7;
