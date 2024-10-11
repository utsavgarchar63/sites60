import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  XMarkIcon,
  CreditCardIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  Bars3Icon,
  UserIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "My Websites", href: "/", icon: ComputerDesktopIcon, current: true },
  { name: "Support", href: "#", icon: PhoneIcon, current: false },
  { name: "Domains", href: "/user-domain", icon: PhoneIcon, current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile", goto: "profile" },
  { name: "Manage Billing", href: `billing`, goto: `stripe-billing` },
  { name: "Sign out", href: "/login", goto: "signout" },
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

  const [daysLeft, setDaysLeft] = useState(0);
  const [showDaysLeft, setShowDaysLeft] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const res = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const userInfo = data.userInfo;

    if (userInfo) {
      setUser(userInfo)
    }
  };

  for (let i = 0; i < navigation.length; i++) {
    if (navigation[i].href == router.asPath) {
      navigation[i].current = true;
    } else {
      navigation[i].current = false;
    }
  }

  function dropdownClick(type) {
    if (type == "signout") {
      console.log("Logout Dude");
      signOut();
      window.location.href = "/login";
    } else if (type == "stripe-billing") {
      window.location.href = `https://billing.stripe.com/p/login/${process.env.STRIPE_BILLING_KEY}`;
    } else {
      router.push("/" + type);
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ sidebarOpen }) => (
            <>
              <div className="mx-auto max-w-full px-4 sm:px-4 lg:px-4 relative">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <a href="/" className="curosor-pointer">
                        <img
                          className="h-9 w-auto"
                          src="main-logo.png"
                          alt="Your Company"
                        />
                      </a>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-orange-500 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-2 py-1 text-sm"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="ml-4 flex items-center md:ml-6 absolute md:right-4 right-14 top-4">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={user?.profile_pic ? user?.profile_pic : "/images/profile.png"} alt="Profile" />
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
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {sidebarOpen ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-orange-500 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                {/* <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div> */}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="max-w-full p-0">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
