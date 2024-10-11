import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const steps = ["Search Domain", "Buy Domain", "Enter Details", "Success"];

export default function Home() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loaderSearch, setLoaderSearch] = useState(false);
  const [smartsitesList, setSmartsitesList] = useState([]);
  const [showLinkDomainView, setShowLinkDomainView] = useState(false);
  const [showBuyDomainView, setShowBuyDomainView] = useState(false);
  const [showLinkDomainSuccess, setShowLinkDomainSuccess] = useState(false);
  const [isDomainAvailable, setIsDomainAvailable] = useState(false);
  const [isDomainAvailableMsg, setIsDomainAvailableMsg] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [finalDomainName, setFinalDomainName] = useState("");
  const [finalIpAddress, setFinalIpAddress] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [finalDomainPricing, setFinalDomainPricing] = useState("");
  const [billingInformation, setBillingInformation] = useState({
    name: "",
    email: "",
    // Add more fields as needed
  });
  const [dnsInformation, setDnsInformation] = useState({
    nameserver1: "",
    nameserver2: "",
    // Add more fields as needed
  });
  const router = useRouter();

  const [connectedDomainsList, setConnectedDomainsList] = useState([]);

  const isSubmitDisabled = !selectedSite || !selectedOption;
  const notify = (label) => toast(label);

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      // Check the selected option
      if (selectedOption === "have_domain") {
        // If "I already have a domain" is selected, show the domain input view
        setShowLinkDomainView(true);
      } else if (selectedOption === "buy_domain") {
        setShowBuyDomainView(true);
      } else {
        // Perform your submit logic here for other options
        // Reset state if needed
        setSelectedSite(null);
        setSelectedOption(null);
      }
    }
  };

  const handleLinkDomainSubmit = async () => {
    setSelectedSite(null);
    setSelectedOption(null);
    // setDomainName('');

    let finalDomainName = await extractDomain(domainName);

    setFinalDomainName(finalDomainName);

    connectDomain(finalDomainName, false);
  };

  const handleBack = () => {
    // Reset state and go back to the initial view
    setShowLinkDomainView(false);
    setShowBuyDomainView(false);
    setSelectedSite(null);
    setSelectedOption(null);
    setDomainName("");
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    setIsDomainAvailable(false);
    setIsDomainAvailableMsg(false);
    setSearchTerm(e.target.value);
  };

  const handleSelectDomain = (domain) => {
    setSelectedDomain(domain);
    handleNextStep();
  };

  const handleSetupDns = () => {
    // Perform DNS setup logic here
    console.log(
      "Setting up DNS for domain:",
      selectedDomain,
      "DNS Information:",
      dnsInformation
    );
    // You can add further logic or redirect the user to another page
  };

  const connectDomain = async (domain, connectNew) => {
    setLoader(true);

    const res = await fetch("/api/connectDomain", {
      method: "POST",
      body: JSON.stringify({
        domain: domain,
        siteKey: selectedSite.siteKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Await for data for any desirable next steps
    const data = await res.json();

    setLoader(false);
    if (data.errors) {
      notify(data.errors[0].msg);
      setShowLinkDomainSuccess(false);
    } else {
      if (data.status == 422 || data.status == 400 || data.status == 500) {
        notify("All our servers are busy. Please try after sometime");
        setShowLinkDomainSuccess(false);
      } else if (data.success == false) {
        if (data.details == 409) {
          notify("Domain is already linked");
        }
        notify("Unexpected error occurred");
        setShowLinkDomainSuccess(false);
      } else {
        notify("Domain Successfully Connected", data);
        setShowLinkDomainSuccess(true);

        setFinalIpAddress(data.ip.address);

        if (connectNew == true) {
          addRecords();
        }
      }
    }
  };

  const handleSearch = async () => {
    setSearchTerm(extractDomain(searchTerm));
    setLoaderSearch(true);
    try {
      // Make the API request
      const response = await fetch("/api/newDomain", {
        method: "POST",
        body: JSON.stringify({
          searchTerm: searchTerm,
          type: "search",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoaderSearch(false);

      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        // Handle non-success status codes
        notify("Server error. Please try again later.");
        return;
      }

      const rawData = await response.text();

      if (!rawData) {
        // Handle empty response
        notify("Empty response from the server.");
        return;
      }

      // Try parsing the response as JSON
      const jsonResponse = JSON.parse(rawData);

      const available = jsonResponse.availability;
      if (available) {
        const resultStringForDuration1 = getPriceAndCurrencyStringForDuration(
          jsonResponse,
          1
        );

        setFinalDomainPricing(resultStringForDuration1);
      }

      setIsDomainAvailable(available);
      setIsDomainAvailableMsg(true);
      // Handle the parsed JSON data
      // For example, updating state or displaying information to the user
      setSearchResults(jsonResponse.domain);
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error during API request:", error);
      notify("An error occurred. Please try again later.");
    }
  };

  const getPriceAndCurrencyStringForDuration = (
    pricingData,
    desiredDuration
  ) => {
    const pricingArray = pricingData.pricing;

    // Find the object with the desired duration
    const matchingDurationObject = pricingArray.find((pricingObject) => {
      return (
        pricingObject.$ &&
        pricingObject.$.Duration === desiredDuration.toString()
      );
    });

    // If a matching duration is found, return the formatted string
    if (
      matchingDurationObject &&
      matchingDurationObject.$.Price &&
      matchingDurationObject.$.Currency
    ) {
      const price = matchingDurationObject.$.Price;
      const currency = matchingDurationObject.$.Currency;
      return `${price} ${currency}`;
    } else {
      // Return a default value or handle the case when the duration is not found
      return null;
    }
  };

  const buyDomain = async (e) => {
    e.preventDefault();

    setLoader(true);

    try {
      // Make the API request
      const response = await fetch("/api/newDomain", {
        method: "POST",
        body: JSON.stringify({
          domainName: searchResults,
          type: "buy",
          registrantFirstName: formData.registrantFirstName,
          registrantLastName: formData.registrantLastName,
          registrantAddress: formData.registrantAddress,
          city: formData.city,
          stateProvince: formData.stateProvince,
          country: formData.country,
          postalCode: formData.postalCode,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
          organizationName: formData.organizationName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        setLoader(false);
        if (response.status == 400) {
          notify("Domain not available");
        }
        // Handle non-success status codes
        return;
      }

      const rawData = await response.text();

      // Try parsing the response as JSON
      const jsonResponse = JSON.parse(rawData);

      notify("Domain purchased successfully");

      connectDomain(searchResults, true);
    } catch (error) {
      // Handle network errors or exceptions
      setLoader(false);

      console.error("Error during API request:", error);
      notify("An error occurred. Please try again later.");
    }
  };

  const addRecords = async () => {
    setLoader(true);

    try {
      // Make the API request
      const response = await fetch("/api/newDomain", {
        method: "POST",
        body: JSON.stringify({
          domainName: searchResults,
          type: "connect",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        if (response.status == 400) {
          notify("Domain not available");
        }
        // Handle non-success status codes
        return;
      }

      const rawData = await response.text();

      const jsonResponse = JSON.parse(rawData);

      setLoader(false);
      setCurrentStep(3);
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error during API request:", error);
      notify("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async (sendList) => {
    const res = await fetch("/api/connectDomain", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.list && data.list.length > 0) {
      let newList = [];
      let connectedSitesList = [];

      data.list.forEach((element) => {
        if (element.is_paid && !element.link_domain) {
          newList.push(element);
        }

        // else {
        //   const today = new Date();
        //   const trialExpiresDate = new Date(element.trial_expires);
        //   if (trialExpiresDate > today) {
        //     newList.push(element);
        //   }
        // }
      });

      data.list.forEach((element) => {
        if (element.link_domain) {
          connectedSitesList.push(element);
        }
      });
      if (sendList) {
        return newList;
      } else {
        setSmartsitesList([]);

        setSmartsitesList(newList);
        setConnectedDomainsList(connectedSitesList);
      }
    } else {
      setSmartsitesList([]);
      return [];
    }
  };

  const extractDomain = (url) => {
    // Remove protocol (http, https) and www from the URL
    const withoutProtocol = url.replace(/(^\w+:|^)\/\//, "");
    const withoutWww = withoutProtocol.replace(/^www\./, "");

    // Extract only the domain name
    const parts = withoutWww.split(".");

    const extractedDomain =
      parts.length > 2 ? parts.slice(1).join(".") : withoutWww;

    return extractedDomain;
  };

  const [formData, setFormData] = useState({
    registrantFirstName: "",
    registrantLastName: "",
    registrantAddress: "",
    city: "",
    stateProvince: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    emailAddress: "",
    organizationName: "",
    // Add other form fields here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <ToastContainer autoClose={3000} />
      <div className="bg-indigo-50 w-full py-10" style={{ height: "calc(100vh - 64px)", overflow: "auto" }}>
      <div className="w-full px-14 text-xl text-slate-800 font-semibold mb-10">Domain</div>
        <div className="rounded-lg  border bg-white border-gray-300 lg:max-w-[600px] mx-auto p-8">
          <div className="space-y-4">
            {showLinkDomainView ? (
              <div>
                {!showLinkDomainSuccess && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Enter your Domain Name (Example : acme.com)
                    </label>
                    <input
                      type="text"
                      className="block w-full mt-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                    />
                    <p className="mt-2 text-xs text-gray-500"></p>
                    <div className="mt-4 flex justify-between space-x-4">
                      <button
                        className="text-gray-700 w-1/4 border border-gray-500 font-bold py-2 px-4 rounded"
                        onClick={handleBack}
                      >
                        Back
                      </button>

                      {loader == false && (
                        <button
                          className="bg-orange-500 w-3/4 text-white font-bold py-2 px-4 rounded"
                          onClick={handleLinkDomainSubmit}
                        >
                          Connect Domain
                        </button>
                      )}

                      {loader == true && (
                        <button
                          type=""
                          className="w-full bg-orange-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          <svg
                            className="animate-spin ml-3 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Connecting domain...
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {showLinkDomainSuccess && (
                  <div className="mt-4 space-x-4">
                    <h3 className="m-2 flex items-center space-x-4 text-xl font-bold p-2 rounded-md text-green-700">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>

                      <span>Domain Connected Successfully</span>
                    </h3>

                    <h3 className="my-2 text-lg underline font-bold text-gray-700">
                      Instructions:
                    </h3>
                    <ol className="list-decimal text-gray-900">
                      <li>
                        Add A record in your domain name registrar / web hosting
                        site with with '<b>@</b>' in the host and '
                        <b>{finalIpAddress}</b>' in the value.
                      </li>

                      <li>
                        Add CNAME record in your domain name registrar / web
                        hosting site with '<b>www</b>' in the host and '
                        <b>{finalDomainName}</b>' in the value.
                      </li>

                      <li>
                        Verifying domain can take from 1 hour to 24 hours. Please
                        visit your domain '<b>{finalDomainName}</b>' after 24-48
                        hours to checkback.
                      </li>
                    </ol>
                    <button
                      className="text-gray-700 w-full font-bold py-2 border mt-4 border-gray-400 px-4 rounded"
                      onClick={() => {
                        setShowLinkDomainSuccess(false);
                        setShowLinkDomainView(false);
                      }}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            ) : showBuyDomainView ? (
              <div className="container mx-auto mt-8 p-4">
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-5">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900">
                      Step {currentStep + 1} : {steps[currentStep]}
                    </h3>
                  </div>

                  {currentStep === 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Search for a Domain (Example : acme.com)
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          className="block w-full bg-white border px-2 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          value={searchTerm}
                          onChange={handleInputChange}
                        />
                        {loaderSearch == false && (
                          <button
                            className="bg-orange-500 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        )}
                        {loaderSearch == true && (
                          <button
                            type=""
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            <svg
                              className="animate-spin ml-3 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Searching domain...
                          </button>
                        )}
                      </div>

                      <div>
                        {isDomainAvailableMsg && (
                          <>
                            {isDomainAvailable ? (
                              <div className="flex items-center mt-1">
                                <CheckIcon
                                  className="h-5 w-5 text-green-700"
                                  aria-hidden="true"
                                />

                                <h2 className="text-sm font-bold text-left text-green-700">
                                  Domain is available.{" "}
                                </h2>
                                <h2 className="text-sm pl-1 font-bold text-left text-gray-900">
                                  {" "}
                                  Price is <u>{finalDomainPricing}</u>
                                </h2>
                              </div>
                            ) : (
                              <div className="flex items-center mt-1">
                                <ExclamationCircleIcon
                                  className="h-5 w-5 text-red-700"
                                  aria-hidden="true"
                                />

                                <h2 className="text-sm font-bold text-left text-red-700">
                                  Domain is not available
                                </h2>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-center space-x-4">
                          <button
                            className="text-gray-700 w-1/4 font-bold py-2 border border-gray-400 px-4 rounded"
                            onClick={handleBack}
                          >
                            Back
                          </button>
                          <button
                            className={`w-3/4 ${!isDomainAvailable
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-orange-500 hover:bg-orange-700"
                              } text-white font-bold py-2 px-4 rounded`}
                            onClick={() => handleSelectDomain(searchResults)}
                            disabled={!isDomainAvailable}
                          >
                            Buy Domain
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div>
                      <div className="border-b border-gray-200 pb-2">
                        <h2 className="text-lg text-orange-500 mb-4">
                          Domain : <b> {selectedDomain} </b> | Price :{" "}
                          <b> {finalDomainPricing}</b>
                        </h2>
                      </div>
                      <div className="mt-2">
                        {/* Add form fields for billing information */}
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <button
                          className="text-gray-700 w-1/4 border border-gray-400 font-bold py-2 px-4 rounded"
                          onClick={handlePreviousStep}
                        >
                          Back
                        </button>
                        {loader == false && (
                          <button
                            className="bg-orange-500 w-3/4 text-white font-bold py-2 px-4 rounded"
                            onClick={handleNextStep}
                          >
                            Confirm and Buy Domain
                          </button>
                        )}

                        {loader == true && (
                          <button
                            type=""
                            className="w-full bg-orange-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            <svg
                              className="animate-spin ml-3 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Purchasing domain...
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-md font-bold text-green-600 mb-4">
                        Please enter your details
                      </h2>

                      <form>
                        <div className="space-y-12">
                          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 pb-12 md:grid-cols-3">
                            <div>
                              <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Registrant Details
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information is needed to purchase the domain.
                              </p>
                            </div>

                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Registrant First Name
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      name="registrantFirstName"
                                      id="registrantFirstName"
                                      value={formData.registrantFirstName}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="John"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Registrant Last Name
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      name="registrantLastName"
                                      id="registrantLastName"
                                      value={formData.registrantLastName}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Smith"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="about"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Registrant Address
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    id="registrantAddress"
                                    name="registrantAddress"
                                    value={formData.registrantAddress}
                                    onChange={handleChange}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                  />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                  Write your company address
                                </p>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  City
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      id="city"
                                      name="city"
                                      value={formData.city}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Hyderabad"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  State Province
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      id="stateProvince"
                                      name="stateProvince"
                                      value={formData.stateProvince}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="TG"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Country
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      id="country"
                                      name="country"
                                      value={formData.country}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="IN"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Postal Code
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      id="postalCode"
                                      name="postalCode"
                                      value={formData.postalCode}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="500067"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Phone Number
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      id="phoneNumber"
                                      name="phoneNumber"
                                      value={formData.phoneNumber}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="+919876543210"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email Address
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="email"
                                      id="emailAddress"
                                      name="emailAddress"
                                      value={formData.emailAddress}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="email@email.com"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="website"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Organization Name
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      id="organizationName"
                                      name="organizationName"
                                      value={formData.organizationName}
                                      onChange={handleChange}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Acme Technologies Pvt Ltd"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {loader == false && (
                          <button
                            type="button"
                            className="bg-orange-500 w-full text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => buyDomain(e)}
                          >
                            Submit Details
                          </button>
                        )}

                        {loader == true && (
                          <button
                            type=""
                            className="w-full bg-orange-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            <svg
                              className="animate-spin ml-3 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Connecting domain...
                          </button>
                        )}
                      </form>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-md font-bold text-green-600 mb-4">
                        Domain has been successfully purchased and connected
                      </h2>
                      <div>Please check your domain after 24-48 hours.</div>
                      <div className="mt-4">
                        <button
                          className="bg-orange-500 w-full text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            router.push("/");
                          }}
                        >
                          Go to Dashboard
                        </button>
                      </div>
                    </div>
                  )}

                  {/* {currentStep > 0 && (

              )} */}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                          {selectedSite ? selectedSite.title : "Select a site"}
                        </Menu.Button>

                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Menu.Items
                            static
                            className="absolute z-10 w-full mt-2 space-y-1 origin-top-right bg-white border border-gray-300 rounded-md focus:outline-none"
                          >
                            {smartsitesList.length === 0 ? (
                              <div className="px-4 py-2 text-sm text-gray-700">
                                You don't have any paid sites.
                              </div>
                            ) : (
                              smartsitesList.map((site) => (
                                <Menu.Item key={site.siteKey}>
                                  {({ active }) => (
                                    <a
                                      onClick={() => setSelectedSite(site)}
                                      className={`${active ? "bg-gray-100" : ""
                                        } block px-4 py-2 text-sm text-gray-700`}
                                    >
                                      {site.title}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))
                            )}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>

                <div className="">
                  <select
                    className=" w-full z-1 px-4 py-2 mt-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none "
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="have_domain">I already have a domain</option>
                    <option value="buy_domain">I need to buy a domain</option>
                  </select>
                </div>

                <button
                  className={`w-full mt-2 ${isSubmitDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                    } text-white font-bold py-2 px-4 rounded`}
                  disabled={isSubmitDisabled}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>

        {!showLinkDomainView && !showBuyDomainView && (
          <div className="px-4 sm:px-6 lg:px-8 border bg-white border-gray-300 max-w-7xl rounded-md py-4 mx-auto mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Your Connected Domains
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the domains connected to your sites
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Site60
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Domain
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Publish Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Ip Address
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Domain Linking Status
                        </th>

                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {connectedDomainsList.map((domain) => (
                        <tr key={domain.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {domain.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {domain.link_domain}
                          </td>
                          <td
                            className={`whitespace-nowrap px-3 py-4 text-sm ${domain.status === "published"
                              ? "text-green-600"
                              : "text-gray-500"
                              }`}
                          >
                            {domain.status}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {domain.ip_address}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">
                            Linked
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a
                              href="#"
                              className="text-red-600 hover:text-red-900"
                            >
                              Unlink
                              <span className="sr-only">, {domain.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(connectedDomainsList.length === 0 || connectedDomainsList === undefined) && <div className="divide-y divide-gray-200 text-center my-8">No Data Found</div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
