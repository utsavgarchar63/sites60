import { Fragment, useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { Transition, Menu, Dialog } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { featherIconsList } from "../lib/genericData";
import Loader from "../components/Loader";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

import moment from "moment";
// import Loader from "../components/Loader";
import {
  PlusIcon,
  EllipsisVerticalIcon,
  DocumentDuplicateIcon,
  CalendarDaysIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightIcon,
  CloudArrowDownIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  DocumentPlusIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusSmallIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const frequencies = [
  { value: "yearly", label: "Yearly", priceSuffix: "/year" },
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
];
const tiersData = [
  {
    name: "Free Plan",
    id: "tier-freelancer",
    href: "#",
    price: "Free Plan",
    description: "",
    features: [
      "Access to All Templates",
      "Drag & Drop Website Builder",
      "AI Website Builder (Limits Apply)",
      "AI Content Writer (Limited)",
      "Sites60 Branding",
    ],
    featured: false,
    cta: "Current Plan",
  },

  {
    name: "Business Plan",
    id: "tier-enterprise",
    href: "#",
    price: { yearly: "$60", monthly: "$6" },
    description: "",
    features: [
      "Access to All Templates",
      "Drag & Drop Website Builder",
      "AI Website Builder (No Limits)",
      "AI Content Writer (ChatGPT Powered)",
      "Connect your own Domain",
    ],
    featured: true,
    cta: "Buy Now",
  },
];
let allProducts = [];
let selectedFrequency = "yearly";

export default function Index() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const notify = (label) => toast(label);
  const [smartsitesList, setSmartsitesList] = useState([]);

  const [open, setOpen] = useState(false);
  const [openPayPopUp, setOpenPayPopUp] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [frequency, setFrequency] = useState(frequencies[0]);
  const [curSiteid, setCurSiteid] = useState(null);
  const [tiers, setTiers] = useState(tiersData);
  const [pricingss, setPricingss] = useState("price_1NEsEfSBvfNCKIA7EtAVjqU2");
  const [aiLoading, setAiLoading] = useState(false);

  //qrcode download
  const [title, setTitle] = useState("");

  const [qrCodeValue, setQRCodeValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  const qrCodeRef = useRef(null);

  const generateQRCode = () => {
    const randomValue = Math.random().toString(36).substring(7);
    setQRCodeValue(randomValue);
  };

  const handleDownloadQR = (title) => {
    setTitle(title);
    generateQRCode();
  };
  const handleDownloadQROpen = (title, key) => {
    setSelectedKey(key);
    setTitle(title);
    setOpen1(true);
    generateQRCode();
  };

  const finalDownload = () => {
    const doc = new jsPDF();
    const canvas = qrCodeRef.current.querySelector("canvas");
    const qrCodeImage = canvas.toDataURL("image/png");
    doc.addImage(qrCodeImage, "PNG", 10, 10, 50, 50);
    doc.save(title + ".pdf");
  };

  async function openPricingPopup(sitekey) {
    setCurSiteid(sitekey);

    try {
      const res = await fetch("/api/plans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const pricingData = await res.json();

      if (pricingData.data && pricingData.data.length > 0) {
        setOpenPayPopUp(true);
        allProducts = pricingData.data;

        updateDialogPricing();
      }
    } catch (error) {
      notify("Opps! Something went wrong");
    }
  }

  async function buyNowFun() {
    let selectedCurrency = "USD";

    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (timeZone == "Asia/Calcutta" || timeZone == "Asia/Kolkata") {
        selectedCurrency = "INR";
      }
    } catch (error) {
      console.log("Time zone issue");
    }

    let pricings = "";

    const filteredProducts = allProducts.filter(
      ({ currency, frequency }) =>
        currency == selectedCurrency && frequency === selectedFrequency
    );
    const stripeProductIds = filteredProducts.map(
      ({ stripe_product_id }) => stripe_product_id
    );

    if (stripeProductIds.length > 0) {
      pricings = stripeProductIds[0];
    }

    const res = await fetch(
      "/api/stripe?plan_id=" + pricings + "&smartsite_id=" + curSiteid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.errors) {
      notify(data.errors[0].msg);
    } else {
      if (data.status == 422 || data.status == 400 || data.status == 500) {
        notify("All our servers are busy. Please try after sometime.");
      } else {
        router.push(data.redirect_url);
      }
    }
  }
  useEffect(() => {
    getInfo();
  }, []);

  const [brandInfo, setBrandInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(brandInfo, loading, error, "brandInfo");

  useEffect(() => {
    async function fetchBrandInfo() {
      try {
        const res = await fetch("/api/onboard");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setBrandInfo(data.data); // Assuming `data.data` contains the brand info
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBrandInfo();
  }, []);

  const getInfo = async (sendList) => {
    const res = await fetch("/api/smartsite", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.list && data.list.length > 0) {
      let newList = [];

      data.list.forEach((element) => {
        if (element.is_paid) {
          newList.push(element);
        } else {
          const today = new Date();
          const trialExpiresDate = new Date(element.trial_expires);
          if (trialExpiresDate > today) {
            newList.push(element);
          }
        }
      });
      if (sendList) {
        return newList;
      } else {
        setSmartsitesList([]);
        setSmartsitesList(newList);
      }
    } else {
      setSmartsitesList([]);
      return [];
    }
  };

  const [deleteId, setDeleteId] = useState(null);

  const openDeleteSmartsite = async (key) => {
    setDeleteId(key);
    setOpen(true);
  };
  const deleteSmartsite = async (key) => {
    const formData = new FormData();
    formData.append("key", key);
    setOpen(false);
    const res = await fetch("/api/smartsite", {
      method: "DELETE",
      body: formData,
    });

    const data = await res.json();

    if (data.errors) {
      notify(data.errors[0].msg);
    } else {
      if (data.status == 422 || data.status == 400 || data.status == 500) {
        notify("All our servers are busy. Please try after sometime.");
      } else if (data.success == false) {
        notify("All our servers are busy. Please try after sometime.");
      } else {
        notify("Smartsite Deleted");
        getInfo();
      }
    }
  };

  const generateAIContent = async (key) => {
    setAiLoading(true);

    try {
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve, 120000)
      );

      const res = await Promise.race([
        fetch("/api/reGenerateAIContent?type=allsections&siteKey=" + key),
        timeoutPromise, // Reject the promise if the timeout is reached
      ]);

      const resData = await res.json();
      setAiLoading(false);
      if (resData.success) {
        notify("Content updated successfully!");
      } else {
        notify("All our servers are busy. Please try after sometime");
      }
    } catch (error) {
      notify("All our servers are busy. Please try after sometime");
    }
  };

  const gotoPage = (key) => {
    router.push("/edit-smartsite/" + key);
  };

  const createSmartsite = async () => {
    let siteListLocal = [];
    siteListLocal = await getInfo(true);

    if (siteListLocal.length == 0) {
      router.push("/onboard");
    } else {
      let unpaidSite = siteListLocal.filter((site) => site.is_paid == false);

      if (unpaidSite.length == 0) {
        router.push("/onboard");
      } else {
        notify(
          "You can't create more than one free website. Please pay for your first website to create more"
        );
      }
    }

    return;
    setLoader(true);

    const formData = new FormData();
    formData.append("type", "create");
    formData.append("title", "Jeevan web page");

    //if there are any files

    const res = await fetch("/api/smartsite", {
      method: "POST",
      body: formData,
    });
    //Await for data for any desirable next steps
    const data = await res.json();

    console.log("Data>>>>", data);
    setLoader(false);
    if (data.errors) {
      notify(data.errors[0].msg);
    } else {
      if (data.status == 422 || data.status == 400 || data.status == 500) {
        notify("All our servers are busy. Please try after sometime.");
      } else if (data.success == false) {
        notify(data.message);
      } else {
        router.push("/edit-smartsite/" + data.data?.siteKey);
      }
    }
  };

  const redirectPayment = () => {
    router.push("/billing");
  };

  // const preview = (key) => {
  //   router.push("/smartiste/" + key  );
  // };

  function updateFrequency(event) {
    setFrequency(event);

    selectedFrequency = event.value;

    updateDialogPricing();
  }

  function updateDialogPricing() {
    let selectedCurrency = "USD";

    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (timeZone == "Asia/Calcutta" || timeZone == "Asia/Kolkata") {
        selectedCurrency = "INR";
      }
    } catch (error) {
      console.log("Time zone issue");
    }

    const filteredProducts = allProducts.filter(
      ({ currency, frequency }) =>
        currency == selectedCurrency && frequency == selectedFrequency
    );

    const price = filteredProducts.map(({ price }) => price);
    const currency = filteredProducts.map(({ currency }) => currency);

    const currencySymbol = currency[0] === "INR" ? "₹" : "$";

    const updatedTiersData = tiersData.map((tier) => {
      if (tier.id === "tier-enterprise") {
        const updatedPrice = {
          yearly: currencySymbol + price[0],
          monthly: currencySymbol + price[0],
        };

        return {
          ...tier,
          price: updatedPrice,
        };
      }
      return tier;
    });
    console.log(updatedTiersData, "updatedTiersData");
    setTiers(updatedTiersData);
  }

  return (
    <>
      <Layout>
        <ToastContainer autoClose={3000} />

        <div>
          <main className="flex-1 bg-gray-100" style={{ height: "calc(100vh - 64px)", overflow: "auto" }}>
            <div>
              {smartsitesList.length > 0 && (
                <div className="mx-auto w-full px-4 sm:px-6 md:px-8">
                  <div className="flex justify-between">
                    <h2 className="text-3xl font-extrabold text-gray-500 pb-5">
                      My Websites
                    </h2>

                    {/* </div> */}
                  </div>

                  <div>
                    <ul
                      role="list"
                      className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
                    >
                      {smartsitesList.map((project) => (
                        <li
                          key={project?.siteKey}
                          className="cursor-pointer rounded-md bg-white py-0 shadow-md hover:shadow-2xl"
                        >
                          <a
                            href={`/smartsite/${project?.siteKey}?preview=true`}
                            target="_blank"
                            type="button"
                          >
                            <div className="flex flex-1 flex-col p-0 bg-white rounded-lg">
                              {project.thumbnail.length > 0 && (
                                <div className="relative rounded-2xl">
                                  <img
                                    className="bg-gray-800/30 rounded-t-lg max-h-[250px] md:max-h-[300px] mx-auto w-full"
                                    src={project.thumbnail}
                                    alt=""
                                  />
                                </div>
                              )}

                              {project.thumbnail.length == 0 && (
                                <img
                                  className="bg-gray-800/30 rounded-t-lg"
                                  src="https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                  alt=""
                                />
                              )}
                            </div>
                          </a>
                          <div>
                            <a className="font-medium text-gray-700 hover:text-gray-600">
                              <div className="flex space-x-3 space-y-3 items-center justify-between pl-6 py-2">
                                <div className="min-w-0 flex-1">
                                  <div className="text-gray-400">
                                    <div className="flex text-gray-400 items-center">
                                      <h2 className="text-xl pb-1 font-bold text-gray-600 text-left w-full break-all">
                                        {project.title}
                                        {/* <p class="text-xs mb-2 font-normal text-gray-700 dark:text-gray-400">The Palegar's Cuisine</p> */}
                                      </h2>
                                      <Menu
                                        as="div"
                                        className="relative inline-block text-left"
                                      >
                                        <div>
                                          <Menu.Button className="inline-flex w-auto justify-end border border-none bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none">
                                            <EllipsisVerticalIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
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
                                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <>
                                                    <a
                                                      onClick={() =>
                                                        handleDownloadQROpen(
                                                          project.title,
                                                          project?.siteKey
                                                        )
                                                      }
                                                      className={classNames(
                                                        active
                                                          ? "bg-gray-100 text-gray-900"
                                                          : "text-gray-700",
                                                        "group flex items-center px-4 py-2 text-xs"
                                                      )}
                                                    >
                                                      <CloudArrowDownIcon
                                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                        aria-hidden="true"
                                                      />
                                                      Download QR
                                                    </a>
                                                    <div ref={qrCodeRef}>
                                                      {qrCodeValue && (
                                                        <QRCode
                                                          className="hidden"
                                                          value={
                                                            process.env
                                                              .LIVE_URL +
                                                            "/smartsite/" +
                                                            project?.siteKey
                                                          }
                                                        />
                                                      )}
                                                    </div>
                                                  </>
                                                )}
                                              </Menu.Item>
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <a
                                                    onClick={() =>
                                                      generateAIContent(
                                                        project?.siteKey
                                                      )
                                                    }
                                                    className={classNames(
                                                      active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                      "group flex items-center px-4 py-2 text-xs"
                                                    )}
                                                  >
                                                    <ComputerDesktopIcon
                                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                      aria-hidden="true"
                                                    />
                                                    Re-generate Website
                                                  </a>
                                                )}
                                              </Menu.Item>

                                              <Menu.Item>
                                                {({ active }) => (
                                                  <a
                                                    onClick={() =>
                                                      openDeleteSmartsite(
                                                        project?.siteKey
                                                      )
                                                    }
                                                    className={classNames(
                                                      active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                      "group flex items-center px-4 py-2 text-xs"
                                                    )}
                                                  >
                                                    <TrashIcon
                                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                      aria-hidden="true"
                                                    />
                                                    Delete
                                                  </a>
                                                )}
                                              </Menu.Item>
                                            </div>
                                          </Menu.Items>
                                        </Transition>
                                      </Menu>
                                    </div>
                                    {project.is_paid === false ? (
                                      <div className="flex w-full text-gray-400 items-center justify-start text-xs">
                                        <span className="text-red-500 text-sm font-semibold">
                                          Free Trial
                                        </span>{" "}
                                        &nbsp;
                                        <span className="text-xs text-gray-500 flex">
                                          <CalendarDaysIcon className="w-4 h-4 mr-1" />
                                          {moment(project.created_at).format(
                                            "MMM Do"
                                          )}{" "}
                                        </span>
                                        <span> - </span>
                                        <span className="text-xs text-red-500 flex">
                                          <CalendarDaysIcon className="w-4 h-4 mr-1" />
                                          {moment(project.trial_expires).format(
                                            "MMM Do"
                                          )}{" "}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="text-green-500 text-xs">
                                        Bussiness plan is Active until{" "}
                                        {moment(
                                          project?.subscription_end
                                        ).format("MMM Do yyyy")}
                                      </div>
                                    )}
                                  </div>

                                  <div className="w-full flex justify-between items-center">
                                    <div className="px-0 pt-4 pb-2 flex space-x-2">
                                      <span className="w-10 justify-center flex space-x-1 items-center bg-orange-500 rounded-md px-0 py-2 text-sm font-semibold text-orange-100 mr-2 mb-2">
                                        <a
                                          href={`/smartsite/${project?.siteKey}?preview=true`}
                                          target="_blank"
                                          type="button"
                                        >
                                          <EyeIcon className="h-5 w-5 text-white items-center flex" />{" "}
                                        </a>
                                        {/* <span>Preview</span> */}
                                      </span>
                                      <span
                                        onClick={() => {
                                          gotoPage(project?.siteKey);
                                        }}
                                        className="w-10 justify-center flex space-x-1 items-center bg-white border border-gray-600 rounded-md px-0 py-2 text-sm font-semibold text-gray-600 mr-2 mb-2"
                                      >
                                        <PencilSquareIcon className="h-5 w-5 text-gray-600 items-center flex" />
                                        {/* <span>Edit</span> */}
                                      </span>
                                    </div>
                                    <div className="px-0 pt-4 pb-2 flex space-x-2 pr-4">
                                      {project.is_paid === false ? (
                                        <span
                                          onClick={() => {
                                            openPricingPopup(project._id);
                                          }}
                                          className="w-28 justify-center flex space-x-1 items-center bg-gray-700 border border-gray-600 rounded-md px-0 py-2 text-sm font-semibold text-white mr-2 mb-2"
                                        >
                                          <CreditCardIcon className="h-5 w-5 text-white items-center flex" />
                                          <span>Pay Now</span>
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                          {/* <div className="w-full flex justify-center items-center text-xs space-x-2 py-1 bg-red-100 rounded-b-md">
                              <span>Your trial period expires in 10 days</span><span className="flex items-center underline text-blue-600" onClick={ ()=>redirectPayment() }  >Pay now <ArrowRightIcon className="text-blue-600 h-3 w-4 ml-1 mt-1" /></span>
                          </div> */}
                          {/* <a href="#" className="py-1 rounded-b-3xl bg-red-100 inline-flex items-center justify-center w-full text-xs font-semibold text-red-600 hover:underline">
                             Your trial period expires in 10 days <span>Pay now <ArrowRightIcon className="h-4 w-4" /></span>
                           </a> */}
                        </li>
                      ))}
                      <li
                        className="group cursor-pointer rounded-3xl border-4 border-gray-200 hover:border-orange-300 transition delay-150 duration-300 ease-in-out"
                        onClick={() => createSmartsite()}
                      >
                        <div className="flex items-center mx-auto h-full">
                          <PlusCircleIcon className="h-64 w-64 text-gray-200 group-hover:text-orange-300 mx-auto rounded-full transition delay-150 duration-300 ease-in-out" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {aiLoading && (
              <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-xs dark:bg-gray-700/30 opacity-100 flex justify-center items-center">
                <Loader />
              </div>
            )}

            {smartsitesList.length == 0 && (
              <div className="bg-indigo-50 h-full w-screen flex flex-col content-around justify-center items-center py-10">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-md font-semibold text-gray-900">
                  No websites created
                </h3>
                <p className="mt-1 text-md font-semibold text-gray-900">
                  Get started by creating a new website
                </p>
                <div className="mt-6">
                  {loader == false && (
                    <button
                      onClick={() => createSmartsite()}
                      type="button"
                      className="inline-flex items-center rounded-md border-2 border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:border-orange-500 hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 active:border-orange-500 active:bg-orange-500 active:text-white"
                    >
                      <PlusIcon
                        className="mr-1 h-5 w-5"
                        aria-hidden="true"
                      />
                      Create Website
                    </button>
                  )}

                  {loader == true && (
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border-2 border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:border-orange-500 hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 active:border-orange-500 active:bg-orange-500 active:text-white"
                    >
                      Creating Website...
                    </button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete? All of your data
                            will be permanently removed from our servers
                            forever. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => deleteSmartsite(deleteId)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={open1} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen1}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen1(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start justify-center">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        {/* <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Download QR
                        </Dialog.Title> */}

                        <div ref={qrCodeRef} className="text-center">
                          {qrCodeValue && (
                            <QRCode
                              value={
                                process.env.LIVE_URL +
                                "/smartsite/" +
                                selectedKey
                              }
                            />
                          )}
                        </div>

                        <button
                          className="w-32 rounded-lg bg-orange-500 px-3 py-3 text-md font-semibold text-white shadow-sm hover:bg-orange-500 mt-6 "
                          onClick={() => finalDownload()}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={openPayPopUp} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpenPayPopUp}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                    <div>
                      <div className="bg-white py-1">
                        <div className="mx-auto max-w-3xl px-6 lg:px-4">
                          <div className="mx-auto max-w-4xl text-center">
                            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                              Pricing Plans
                            </p>
                          </div>
                          <p className="mx-auto mt-2 w-full rounded-lg text-center text-xs text-gray-600+ p-1">
                            Pick yearly and get 2 months free*
                          </p>
                          <div className="mt-3 flex justify-center">
                            <RadioGroup
                              value={frequency}
                              onChange={(event) => updateFrequency(event)}
                              className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
                            >
                              <RadioGroup.Label className="sr-only">
                                Payment frequency
                              </RadioGroup.Label>
                              {frequencies.map((option) => (
                                <RadioGroup.Option
                                  key={option.value}
                                  value={option}
                                  className={({ checked }) =>
                                    classNames(
                                      checked
                                        ? "bg-orange-600 text-white"
                                        : "text-gray-500",
                                      "cursor-pointer rounded-full px-2.5 py-1"
                                    )
                                  }
                                >
                                  <span>{option.label}</span>
                                </RadioGroup.Option>
                              ))}
                            </RadioGroup>
                          </div>
                          <div className="isolate mx-auto mt-4 grid max-w-md grid-cols-1 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            {tiers.map((tier) => (
                              <div
                                key={tier.id}
                                className={classNames(
                                  tier.featured
                                    ? "bg-gray-900 ring-gray-900"
                                    : "ring-gray-200",
                                  "rounded-3xl p-4 ring-1 xl:p-10"
                                )}
                              >
                                <h3
                                  id={tier.id}
                                  className={classNames(
                                    tier.featured
                                      ? "text-white"
                                      : "text-gray-900",
                                    "text-lg font-semibold leading-8"
                                  )}
                                >
                                  {tier.name}
                                </h3>

                                <p className="mt-3 flex items-baseline gap-x-1">
                                  <span
                                    className={classNames(
                                      tier.featured
                                        ? "text-white"
                                        : "text-gray-900",
                                      "text-4xl font-bold tracking-tight"
                                    )}
                                  >
                                    {typeof tier.price === "string"
                                      ? tier.price
                                      : tier.price[frequency.value]}
                                  </span>
                                  {typeof tier.price !== "string" ? (
                                    <span
                                      className={classNames(
                                        tier.featured
                                          ? "text-gray-300"
                                          : "text-gray-600",
                                        "text-sm font-semibold leading-6"
                                      )}
                                    >
                                      {frequency.priceSuffix}
                                    </span>
                                  ) : null}
                                </p>
                                {tier.id != "tier-freelancer" && (
                                  <a
                                    onClick={() => buyNowFun()}
                                    aria-describedby={tier.id}
                                    className={classNames(
                                      tier.featured
                                        ? "bg-orange-500 text-white hover:bg-orange-600 focus-visible:outline-orange-700"
                                        : "bg-white text-gray-700 border border-gray-700",
                                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
                                    )}
                                  >
                                    Buy Now
                                  </a>
                                )}
                                <ul
                                  role="list"
                                  className={classNames(
                                    tier.featured
                                      ? "text-gray-300"
                                      : "text-gray-600",
                                    "mt-3 space-y-3 text-sm xl:mt-4"
                                  )}
                                >
                                  {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                      <CheckIcon
                                        className={classNames(
                                          tier.featured
                                            ? "text-white"
                                            : "text-orange-600",
                                          "h-6 w-5 flex-none"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* <Pricingpage /> */}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </Layout>
    </>
  );
}
