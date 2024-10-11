import {forwardRef} from "react";
import {
  ArrowDownIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

const platforms = [
  {
    id: 1,
    name: "Facebook",
    online: true,
    icon: "https://www.svgrepo.com/show/330401/facebook.svg",
  },
  {
    id: 2,
    name: "Instagram",
    online: true,
    icon: "https://www.svgrepo.com/show/333552/instagram.svg",
  },
  {
    id: 3,
    name: "Twitter",
    online: true,
    icon: "https://www.svgrepo.com/show/349909/twitter.svg",
  },
  {
    id: 4,
    name: "LinkedIn",
    online: true,
    icon: "https://www.svgrepo.com/show/144550/linkedin.svg",
  },
  {
    id: 5,
    name: "Pinterest",
    online: true,
    icon: "https://www.svgrepo.com/show/119056/pinterest.svg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



  const Footer2 = forwardRef((props, ref) => {
    let { fromPage, dataObj, saveChanges, themeColor, fontFam } = props;

  const getIcon = (platform) => {
    return platforms.filter((e) => e.name == platform)[0].icon;
  };


  return (
    <footer
    ref={ref}
    id={dataObj.key}
    className={classNames(
      "group relative",
      themeColor.bgColor,
      dataObj.data.key,
      fontFam?.name
    )}
  >
    <div
      className={classNames(
        fromPage == "edit"
          ? "group-hover:bg-gray-300/20"
          : "group-hover:none",
        "mx-auto max-w-7xl overflow-hidden py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      )}
    >
      <div className="mt-8 flex justify-center space-x-6">
        {dataObj.data.social.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-200 hover:text-gray-200 footer-2 bg-white px-2 py-2 shadow-lg rounded-lg"
          >
            <span className="sr-only">{item.name}</span>
            <img src={getIcon(item.name)} className="h-6 w-6" aria-hidden="true" />
          </a>
        ))}
      </div>
      <p className="mt-8 text-center text-base text-gray-200">{dataObj.data.company}</p>
    </div>
  
  
      {fromPage == "edit" && (
        <div className="absolute right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex group-hover:block hidden py-1 px-2 space-x-2 rounded-md">
          {/* <span
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
          </span> */}
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
              saveChanges("delete", dataObj.key);
            }}
          >
            <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
          </span>
        </div>
      )}
    </footer>
  );
})
export default  Footer2
