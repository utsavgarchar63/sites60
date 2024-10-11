// import { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// const navigation = [
//   { name: "Home", href: "#" },
//   { name: "About", href: "#" },
//   { name: "Portfolio", href: "#" },
//   { name: "Contact", href: "#" },
// ];

// export default function HeaderInsuranceAgent() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <>
//       <div className="bg-gray-900">
//         <header className="absolute inset-x-0 top-0 z-50">
//           <nav
//             className="flex items-center justify-between p-6 lg:px-25 lg:py-10 px-10"
//             aria-label="Global"
//           >
//             <div className="flex ">
//               <h3 className="font-bold text-[24px] lg:text-2xl xl:text-3xl text-white">
//                 Sitename
//               </h3>
//             </div>
//             <div className="hidden lg:flex lg:gap-x-20">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-lg font-light text-[#FFFFFF]"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>
//             <div className="flex lg:hidden">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center p-2 text-secondarycolor"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//               </button>
//             </div>
//           </nav>
//           <Dialog
//             as="div"
//             className="lg:hidden"
//             open={mobileMenuOpen}
//             onClose={setMobileMenuOpen}
//           >
//             <div className="fixed inset-0 z-50" />
//             <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm">
//               <div className="flex items-center justify-between">
//                 <a href="#" className="-m-1.5 p-1.5">
//                   <h3 className="font-bold text-[32px] text-white">Sitename</h3>
//                 </a>
//                 <button
//                   type="button"
//                   className="rounded-md p-2 text-gray-400"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   <span className="sr-only">Close menu</span>
//                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>
//               </div>
//               <div className="mt-6 flow-root">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="block px-3 py-2 text-base font-light text-secondarycolor hover:bg-gray-800"
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </Dialog.Panel>
//           </Dialog>
//         </header>

//         <div className="relative isolate overflow-hidden pt-14 h-[95vh]">
//           <img
//             src="/insuranceAgentTemp/Group.png"
//             alt=""
//             className="absolute inset-0 -z-10 h-full w-full object-cover"
//           />
//           <div
//             className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//             aria-hidden="true"
//           >
//             <div
//               className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//               style={{
//                 clipPath:
//                   "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//               }}
//             />
//           </div>
//           <div className="mx-auto max-w-full px-6 sm:px-24 py-32 sm:py-48">
//             <div className="md:text-center md:mt-40 sm:text-left">
//               <h1 className="text-[42px] sm:text-[76px] font-bold tracking-tight text-white sm:text-7xl">
//                 Improving the quality of life through the use of insurance.
//               </h1>
//             </div>
//           </div>
//           <div
//             className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//             aria-hidden="true"
//           >
//             <div
//               className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
//               style={{
//                 clipPath:
//                   "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import { GiMeditation } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";

// import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  ArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useRef, useEffect, useState } from "react";
const HeroInsuranceAgent = forwardRef((props, ref) => {
  const navigation = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Contact", href: "#" },
  ];
  const [count, setCount] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let {
    fromPage,
    dataObj,
    saveChanges,
    themeColorPrimary,
    themeColorSecondary,
    themeColorTertiary,
    fontFam,
  } = props;
  console.log(dataObj, "props");
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <div key={i}>
          <div
            className="group relative   "
            // style={{ backgroundImage: `url('/yogatemp3/Rectangle 234.png')` }}
          >
            <div className="bg-gray-900">
              <header className="absolute inset-x-0 top-0 z-50">
                <nav
                  className="flex items-center justify-between p-6 lg:px-25 lg:py-10 px-10"
                  aria-label="Global"
                >
                  <div className="flex ">
                    <h3 className="font-bold text-[24px] lg:text-2xl xl:text-3xl text-white">
                      Sitename
                    </h3>
                  </div>
                  <div className="hidden lg:flex lg:gap-x-20">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg font-light text-[#FFFFFF]"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="flex lg:hidden">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 text-secondarycolor"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </nav>
                <Dialog
                  as="div"
                  className="lg:hidden"
                  open={mobileMenuOpen}
                  onClose={setMobileMenuOpen}
                >
                  <div className="fixed inset-0 z-50" />
                  <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm">
                    <div className="flex items-center justify-between">
                      <a href="#" className="-m-1.5 p-1.5">
                        <h3 className="font-bold text-[32px] text-white">
                          Sitename
                        </h3>
                      </a>
                      <button
                        type="button"
                        className="rounded-md p-2 text-gray-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-6 flow-root">
                      <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 text-base font-light text-secondarycolor hover:bg-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Dialog>
              </header>

              <div className="relative isolate overflow-hidden pt-14 h-[95vh]">
                <img
                  src="/insuranceAgentTemp/Group.png"
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
                <div className="mx-auto max-w-full px-6 sm:px-24 py-32 sm:py-48">
                  <div className="md:text-center md:mt-40 sm:text-left">
                    <h1 className="text-[42px] sm:text-[76px] font-bold tracking-tight text-white sm:text-7xl">
                      Improving the quality of life through the use of
                      insurance.
                    </h1>
                  </div>
                </div>
                <div
                  className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {fromPage == "edit" && (
            <div className="sm:absolute absolute-none right-1 top-1 mt-2 z-20 bg-gray-800 group-hover:flex   hidden py-1 px-2 space-x-2 rounded-md">
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
                  // saveChanges("add", dataObj?.key);
                  setCount(count + 1);
                  console.log("Count:", count);
                }}
              >
                <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-100" />
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
                  setCount(count - 1);
                }}
              >
                <TrashIcon className="w-5 h-5 mr-2 text-gray-100" />
              </span>
            </div>
          )}
        </div>
      );
    }
    return components;
  };
  return <> {renderComponents()}</>;
});

export default HeroInsuranceAgent;
