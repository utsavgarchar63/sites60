import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  UserIcon,
  UserCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
  PhoneArrowUpRightIcon,
  TableCellsIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "My Websites", href: "/", icon:ComputerDesktopIcon, current: true },
  {
    name: "Templates",
    href: "/templates",
    icon: CircleStackIcon,
    current: false,
  },
  // { name: "Templates", href: "/templates", icon: CircleStackIcon, current: false },
  { name: "Settings", href: "#", icon: WrenchScrewdriverIcon, current: false },
  { name: "Support", href: "#", icon: PhoneIcon, current: false },
  { name: "Billing", href: "/billing", icon: CreditCardIcon, current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile", goto: "profile" },
  { name: "Billing", href: "/", goto: "billing" },
  { name: "Sign out", href: "#", goto: "signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const router = useRouter();

  let supportLink = "https://share.hsforms.com/1p-xTdiWlTmiMkfgHLtZqewdwkih";

  if (process.env.NEXT_PUBLIC_ENV == "production") {
    supportLink = "https://share.hsforms.com/1vccfZ1TfTO2U6yQLfYAN4we0hm9";
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [daysLeft, setDaysLeft] = useState(0)
  const [showDaysLeft, setShowDaysLeft] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

   const getInfo = async () => {
     const res = await fetch("/api/getUserInfo", {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });

     const data = await res.json();
     console.log("Layout Data>>>>", data);

     const userInfo = data.userInfo;

     if (userInfo) {

      //  if (userInfo.is_paid_user == false)
      //  {
      //     setShowDaysLeft(true)
      //  }

      //  var diffDays = parseInt(
      //    (new Date(userInfo.trial_expires) - new Date()) / (1000 * 60 * 60 * 24),
      //    10
      //  );

      //  if (diffDays < 0)
      //  {
      //     setDaysLeft("Expired");
      //  }
      //  else if (diffDays == 0)
      //  {
      //     setDaysLeft("Last Day");
      //  }
      //  else if (diffDays == 1)
      //  {
      //     setDaysLeft("One Day Left");
      //  }
      //  else
      //  {
      //     setDaysLeft(diffDays + " days Left");
      //  }

      //  let days = dateDiffInDays(new Date(), userInfo.trial_expires);


     }
   };


   for (let i = 0; i < navigation.length; i++) {

    if (navigation[i].href == router.asPath)
    {
          navigation[i].current = true;
    }
    else
    {
          navigation[i].current = false;
    }

  }
  // if (router.asPath == "/" || router.asPath == "") {
  //   for (let i = 0; i < navigation.length; i++) {
  //     if (i == 0) {
  //       navigation[0].current = true;
  //     } else {
  //       navigation[i].current = false;
  //     }
  //   }
  // }  else if (router.asPath == "/templates") {
  //   for (let i = 0; i < navigation.length; i++) {
  //     if (i == 1) {
  //       navigation[1].current = true;
  //     } else {
  //       navigation[i].current = false;
  //     }
  //   }
  // } else if (router.asPath == "/settings") {
  //   for (let i = 0; i < navigation.length; i++) {
  //     if (i == 2) {
  //       navigation[2].current = true;
  //     } else {
  //       navigation[i].current = false;
  //     }
  //   }
  // } else if (router.asPath == "/support") {
  //   for (let i = 0; i < navigation.length; i++) {
  //     if (i == 3) {
  //       navigation[3].current = true;
  //     } else {
  //       navigation[i].current = false;
  //     }
  //   }
  // } else if (router.asPath == "/profile") {
  //   for (let i = 0; i < navigation.length; i++) {
  //     if (i == 4) {
  //       navigation[4].current = true;
  //     } else {
  //       navigation[i].current = false;
  //     }
  //   }
  // } else if (router.asPath == "/billing") {
  //   for (let i = 0; i < navigation.length; i++) {
  //     if (i == 5) {
  //       navigation[5].current = true;
  //     } else {
  //       navigation[i].current = false;
  //     }
  //   }
  // }

  function dropdownClick(type) {
    if (type == "signout") {
      console.log("Logout Dude");
      signOut();
      window.location.href = "/login";
    } else {
      router.push("/" + type);
    }
  }

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="logo-white.svg"
                    alt="Your Company"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-28 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        {/* <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-indigo-600 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="w-full"
              src="logo-white.svg"
              alt="Your Company"
            />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-indigo-400 "
                      :  "hover:bg-gray-100 hover:text-gray-900",
                    "group flex text-white items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-white group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div> */}
        <div className="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
          <div className="flex w-full flex-col items-center pt-4 pb-6  md:h-screen">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-auto w-28"
                src="logo-white.svg"
                alt="Your Company"
              />
            </div>
            <div className="mt-4 w-full flex-1 space-y-1 px-0">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                    'group flex w-full flex-col items-center rounded-sm p-3 text-xs font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white',
                      'h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:pl-28">
        {showAlert == true && (
          <div className="rounded-md bg-blue-50 p-4 z-40">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon
                  className="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  A new software update is available. See what’s new in version
                  2.0.4.
                </p>
                <p className="mt-3 text-sm md:mt-0 md:ml-6">
                  <a
                    href="#"
                    className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                  >
                    Details
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              {/* <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form> */}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {showDaysLeft == true && (
                <a
                  href="/billing"
                  className="mr-2 cursor-pointer inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800"
                >
                  Trial - {daysLeft}
                </a>
              )}
              {/* <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            onClick={() => dropdownClick(item.goto)}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main>
          <div className="">
            <div className="max-w-full">
              {/* Replace with your content */}
              {children}
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}