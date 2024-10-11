import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Disclosure, Popover } from "@headlessui/react";

import {
  ArchiveBoxIcon,
  Bars3Icon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
  PlusCircleIcon,
  CircleStackIcon,
  TruckIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];
const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];
const sidebarNavigation = [
  { name: "Students", href: "#", icon: UserCircleIcon, current: false },
  { name: "Instructors", href: "#", icon: CircleStackIcon, current: false },
  { name: "Vehicles", href: "#", icon: TruckIcon, current: true },
  { name: "Management", href: "#", icon: BuildingOffice2Icon, current: false },
  // { name: "Spam", href: "#", icon: NoSymbolIcon, current: false },
  // { name: "Drafts", href: "#", icon: PencilSquareIcon, current: false },
];
const sidebarNavigation1 = [
  { name: "LP Process", href: "#", icon: UserCircleIcon, current: false },
  { name: "Scheduling", href: "#", icon: CircleStackIcon, current: false },
  { name: "Collections", href: "#", icon: TruckIcon, current: false },
  // { name: "Spam", href: "#", icon: NoSymbolIcon, current: false },
  // { name: "Drafts", href: "#", icon: PencilSquareIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

const products = [
  {
    name: "Analytics",
    description: "Know your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data is safe",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels",
    href: "#",
    icon: ArrowPathIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen flex-col">
        {/* Top nav*/}
        <header className="relative flex h-16  flex-shrink-0 items-center bg-white">
          {/* Picker area */}
          <div className="mx-auto md:hidden">
            <div className="relative">
              <label htmlFor="inbox-select" className="sr-only">
                Choose inbox
              </label>
              <select
                id="inbox-select"
                className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600"
                defaultValue={
                  sidebarNavigation.find((item) => item.current).name
                }
              >
                {sidebarNavigation.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Menu button area */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop nav area */}
          <div className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-between md:pl-28">
            <div className="min-w-0 flex-1 px-8">
              <div>
                <div className="flex space-x-14  relative md:max-w-[640px] md:min-w-[640px] border border-slate-200">
                  <div>
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <select
                        id="section"
                        name="section"
                        autoComplete="section"
                        className="bg-indigo-100 h-full border-0 focus:ring-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none sm:text-sm"
                      >
                        <option>Students</option>
                        <option>Instructors</option>
                        <option>Vehicles</option>
                      </select>
                    </div>

                    <input
                      id="desktop-search"
                      type="search"
                      placeholder="Ex:Student Name (or) #ddc667345"
                      className="block min-w-[[600px]] border-transparent pl-36 focus:border-transparent focus:ring-0 sm:text-sm"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center justify-center pl-28 text-gray-400">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-around rounded-sm bg-indigo-600 py-2 px-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <PlusCircleIcon className=" h-5 w-5" aria-hidden="true" />
                      &nbsp;Add&nbsp;New
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
              <div className="flex items-center space-x-8">
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                  <Popover className="relative">
                    <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                      <span className="inline-flex">
                        <a
                          href="#"
                          className="relative -mx-1 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">View notifications</span>
                          {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                          <svg
                            className="h-6 w-6 "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M18,13.18V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v3.18A3,3,0,0,0,4,16v2a1,1,0,0,0,1,1H8.14a4,4,0,0,0,7.72,0H19a1,1,0,0,0,1-1V16A3,3,0,0,0,18,13.18ZM8,10a4,4,0,0,1,8,0v3H8Zm4,10a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,20Zm6-3H6V16a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"></path>
                          </svg>
                          <span className="absolute top-0 right-0">
                            <svg
                              className="-ml-1 mr-1.5 h-2 w-2 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx={4} cy={4} r={3} />
                            </svg>
                          </span>
                        </a>
                      </span>
                      {/* <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" /> */}
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                          <div className="group relative flex items-center justify-center text-center gap-x-6 rounded-lg p-4 text-sm leading-6 bg-gray-100">
                            {/* <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                              </div> */}
                            <div className="flex-auto">
                              <a
                                href="#"
                                className="block font-semibold text-gray-900"
                              >
                                Notifications
                                <span className="ml-3 bg-green-100 text-green-500 rounded-md px-2 py-1">
                                  4
                                </span>
                              </a>
                              {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
                            </div>
                          </div>
                          {products.map((item) => (
                            <div
                              key={item.name}
                              className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                            >
                              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-100 group-hover:bg-white">
                                <item.icon
                                  className="h-5 w-5 text-gray-600 group-hover:text-yellow-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="flex-auto">
                                <a
                                  href={item.href}
                                  className="block font-semibold text-gray-900"
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-600">
                                  {item.description}
                                </p>
                              </div>
                              <div className="flex">
                                <svg
                                  className="-ml-1 mr-1.5 h-2 w-2 text-red-400"
                                  fill="currentColor"
                                  viewBox="0 0 8 8"
                                >
                                  <circle cx={4} cy={4} r={3} />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                          {callsToAction.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                            >
                              <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                              {item.name}
                            </a>
                          ))}
                        </div> */}
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </Popover.Group>

                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign Out
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 md:hidden"
              onClose={setMobileMenuOpen}
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
                <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-600 sm:bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                  enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                  enterTo="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                  leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leaveTo="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                >
                  <Dialog.Panel
                    className="fixed inset-0 z-40 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-sm sm:shadow-lg"
                    aria-label="Global"
                  >
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                      <a href="#">
                        <img
                          className="block h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=500"
                          alt="Your Company"
                        />
                      </a>
                      <button
                        type="button"
                        className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="max-w-8xl mx-auto mt-2 px-4 sm:px-6">
                      <div className="relative text-gray-400 focus-within:text-gray-500">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search all inboxes
                        </label>
                        <input
                          id="mobile-search"
                          type="search"
                          placeholder="Search all inboxes"
                          className="block w-full rounded-md border-gray-300 pl-10 outline-none"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                      {navigation.map((item) => (
                        <Fragment key={item.name}>
                          <a
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                          >
                            {item.name}
                          </a>
                          {item.children.map((child) => (
                            <a
                              key={child.name}
                              href={child.href}
                              className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
                            >
                              {child.name}
                            </a>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                      <div className="max-w-8xl mx-auto flex items-center px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="truncate text-base font-medium text-gray-800">
                            {user.name}
                          </div>
                          <div className="truncate text-sm font-medium text-gray-500">
                            {user.email}
                          </div>
                        </div>
                        <a
                          href="#"
                          className="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>
                      <div className="max-w-8xl mx-auto mt-3 space-y-1 px-2 sm:px-4">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </header>

        {/* Bottom section */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Narrow sidebar*/}
          {/* <nav aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-700">
            <div className="relative flex w-full flex-col space-y-3">

              {sidebarNavigation.map((item) => (

                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-indigo-500 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                    'group flex w-full flex-col items-center p-3 text-xs font-bold'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-white' : 'text-white group-hover:text-white',
                      'h-8 w-8'
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-1 text-xxxs w-full text-center">{item.name}</span>
                </a>
              ))}
            </div>
          </nav> */}

          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-28 md:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-800">
              <div className="flex flex-shrink-0 items-center justify-start text-center">
                {/* <img
              className="w-full"
              src="logo-white.svg"
              alt="Your Company"
            /> */}
                <h2 className="w-full h-auto text-xl sm:text-4xl text-white font-extrabold border border-gray-700 py-3">
                  DDC
                </h2>
              </div>
              <div className=" flex flex-grow flex-col">
                <nav className="pb-4 pt-4">
                  <div className="text-xs font-semibold leading-6 text-gray-400  text-center">
                    Dashboards{" "}
                  </div>

                  {sidebarNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-500 text-gray-100"
                          : "text-gray-100 hover:bg-gray-700 hover:text-gray-100",
                        "group flex w-full flex-col items-center px-3 py-1.5 text-xs font-bold"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-100"
                            : "text-gray-100 group-hover:text-gray-100",
                          "h-8 w-8"
                        )}
                        aria-hidden="true"
                      />
                      <span className="mt-1 text-xxxs w-full text-center">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-600" />
                  </div>
                </div>
                <nav className="flex-1">
                  <div className="text-xs font-semibold leading-6 text-gray-400 text-center">
                    Processes
                  </div>
                  {sidebarNavigation1.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-500 text-gray-100"
                          : "text-gray-100 hover:bg-gray-700 hover:text-gray-100",
                        "group flex w-full flex-col items-center px-3 py-1.5 text-xs font-bold"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-100"
                            : "text-gray-100 group-hover:text-white",
                          "h-8 w-8"
                        )}
                        aria-hidden="true"
                      />
                      <span className="mt-1 text-xxxs w-full text-center">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main area */}
          <main className="w-full flex-1 border-t border-gray-200 lg:flex pl-28 bg-gray-100">
            {/* Primary column */}

            {children}

            {/* Secondary column (hidden on smaller screens) */}
            {/* <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
              <div className="relative flex h-full w-80 flex-col overflow-y-auto border-r border-gray-200 bg-white shadow-lg">
                <div className="group relative flex items-center justify-end gap-x-6 rounded-lg text-sm leading-6 bg-white">
                    <div className=" mt-1 mr-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gray-100 group-hover:bg-white cursor-pointer">
                        <XMarkIcon className="h-5 w-5 text-gray-700 group-hover:text-slate-800 font-bold" aria-hidden="true" />
                    </div>
                </div>
                <div className="p-4">
                    {products.map((item) => (
                            <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-slate-100"
                            >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-100 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-700 group-hover:text-yellow-500" aria-hidden="true" />
                            </div>
                            <div className="flex-auto">
                                <a href={item.href} className="block font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                            </div>
                            </div>
                        ))}
                    </div>
              </div>
            </aside> */}
          </main>
        </div>
      </div>
    </>
  );
}
