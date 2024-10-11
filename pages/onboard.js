// import React from 'react';
// mport { getSession } from "next-auth/react";
import useSWR from "swr";
import { Fragment, useEffect, useState, useCallback } from "react";
import { Combobox, Dialog } from "@headlessui/react";

import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import DummyWebsite from "../components/DummyWebsite";

let uniqueId = null;
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const categories = [
  { value: "artist", label: "Artists" },
  { value: "insurance", label: "Insurance Agents" },
  { value: "yoga", label: "Yoga Trainers" },
  { value: "other", label: "Other" },
];

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categorySearchLoader, setCategorySearchLoader] = useState(false);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const [profilePic, setProfilePic] = useState("");
  const [imgFile, setImgFile] = useState(undefined);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [HtmlTemplatesBycategory, setHtmlTemplatesBycategory] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [errMessage, setErrMessage] = useState("");
  const [company, setCompany] = useState("");
  const [belief, setbelief] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categorylabel, setcategorylabel] = useState("");
  const [templatehtml, setTemplatehtml] = useState("");
  const [templateThumbnail, setTemplateThumbnail] = useState("");
  const [selectedTemplateData, setSelectedTemplateData] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [updatedTemplatehtml, setupdatedTemplatehtml] = useState("");
  const [UpdatedHtmlKey, setUpdatedHtmlKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [aiLoader, setAiLoader] = useState(false);
  const [siteKey, setSiteKey] = useState(null);
  console.log(company, "company>>");
  console.log(updatedTemplatehtml, "updatedTemplatehtml>>>");
  console.log(siteKey, "siteKey>>>");

  const updateCategory = (e, value, label) => {
    console.log(value, "value>>");
    setCategory(value);
    setcategorylabel(label);
    createWebsite(e, value);
  };

  const handleTemplateHtml = (template) => {
    console.log(template, "template>>");
    setTemplateThumbnail(template.thumbnail);
    setTemplatehtml(template.html);
    setTemplateName(template.templateName);
    setSelectedTemplateData(template);
    setSidebarOpen(false);
  };

  const { data, error } = useSWR(`/api/profile`, fetcher);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    getBInfo();
  }, []);

  const getBInfo = async () => {
    setCategorySearchLoader(true);
    const response = await fetch(`/api/businesstype?query=${query}&from=focus`);
    const data = await response.json();
    setCategorySearchLoader(false);
    if (data.data) {
      setSearchResults(data.data);
    }
  };

  useEffect(() => {
    if (data && dataToShow) {
      setName(data.userInfo.first_name);
    }
  }, [data]);

  function fileChanged(event, type) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setImgFile(selectedFile);
        setProfilePic(URL.createObjectURL(selectedFile));
      } else {
        setErrMessage("Only Image files are allowed!");

        event.target.value = "";
      }
    }
  }

  // Generate Content from AI

  const updateInfo = async () => {
    console.log(dataToShow, "dataToShow");

    try {
      if (company.length < 3) {
        setErrMessage("Brand Name must contain at least 3 characters.");
        return;
      }

      if (!category) {
        setErrMessage("Please select a category");
        return;
      }

      if (category == "other" && !selected) {
        setErrMessage("Please enter a category");
        return;
      }

      // if (!imgFile) {
      //   setErrMessage("Please upload your logo.");
      //   return;
      // }

      if (dataToShow) {
        try {
          const response = await fetch(
            ` /api/smartsite/checkSmartSite?uniqueIdentifier=${dataToShow}`
          );
          const { exists } = await response.json();

          if (exists) {
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, "0");
            const minutes = currentTime
              .getMinutes()
              .toString()
              .padStart(2, "0");
            const seconds = currentTime
              .getSeconds()
              .toString()
              .padStart(2, "0");

            const formattedTime = `${hours}${minutes}${seconds}`;

            let newIdentifier = dataToShow + formattedTime;

            uniqueId = uniqueId + formattedTime;

            setDataToShow(newIdentifier);
          }
        } catch (error) {
          console.log(error);
        }
      }

      setErrMessage(null);
      setLoading(true);

      const formData = new FormData();
      formData.append("brand_name", company);
      formData.append("brand_category", category);
      formData.append("brand_pic", imgFile);
      formData.append("brand_other", selected);
      formData.append("belief", belief);
      // formData.append("html", htmlContent);

      const res = await fetch("/api/onboard", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      createWebsiteButton();

      if (data.errors) {
        setLoading(false);
        setErrMessage(data.errors[0].message);
      } else {
        if ([422, 400, 500].includes(data.status)) {
          setLoading(false);
          setErrMessage("All our servers are busy. Please try after sometime.");
        } else {
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const createWebsiteButton = async () => {
    setAiLoader(true);

    // Convert templatehtml to a string if it isn't already
    const htmlString =
      typeof templatehtml === "string" ? templatehtml : String(templatehtml);

    try {
      const response = await fetch("http://localhost:5000/process_html", {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
          Accept: "text/html", // Expecting HTML as a response
        },
        body: htmlString, // Ensure this is a valid HTML string
      });

      if (response.ok) {
        const htmlContent = await response.text(); // Use response.text() to get HTML content
        setLoading(false);
        if (htmlContent === "" ? setAiLoader(false) : null)
          console.log(htmlContent, "htmlContent>>");

        const htmlString =
          typeof htmlContent === "string" ? htmlContent : String(htmlContent);

        generateAIContent(htmlString, templateThumbnail);

        // setSidebarOpen(true);
        setupdatedTemplatehtml(htmlContent);
        // setUpdatedHtmlKey(templateName);

        return htmlContent;

        // You can now use the HTML content returned from the API
        // console.log("HTML Content:", htmlContent);

        // Example: If you want to set this HTML to a state in React
        // setHtmlTemplatesByCategory(htmlContent);
      } else {
        const errorData = await response.text(); // Use text() to see the response body in case of errors
        console.error("Error:", response.status, errorData);
        setupdatedTemplatehtml("");
        setUpdatedHtmlKey("");
        setLoading(false);
        setAiLoader(false);
      }
    } catch (error) {
      console.error("Error fetching template:", error);
    }
  };

  // async function generateAIContent(htmlContent) {
  //   setAiLoader(true);

  //   const timeoutPromise = new Promise((resolve) =>
  //     setTimeout(resolve, 120000)
  //   );
  //   try {
  //     // let aiURL = `/api/generateAIContent?type=allsections&siteKey=${uniqueId}&temp=${category}`;
  //     // const res = await Promise.race([
  //     //   fetch(aiURL),
  //     //   timeoutPromise, // Reject the promise if the timeout is reached
  //     // ]);
  //     // const data ={
  //     //   htmlcode : htmlContent
  //     // }

  //     const htmlString =
  //       typeof htmlContent === "string" ? htmlContent : String(templatehtml);

  //     console.log(htmlString, "htmlString>>");

  //     const data = {
  //       template_html: htmlString,
  //     };
  //     // siteKey: uniqueId,
  //     // type: "allsections",
  //     // temp: category,

  //     // template_html, siteKey, temp, type
  //     const res = await fetch(
  //       `/api/generateAIContent?type=allsections&siteKey=${uniqueId}&temp=${category}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Accept: "text/html",
  //         },
  //         body: JSON.stringify(data), // Ensure this is a valid HTML string
  //       }
  //     );

  //     // Check if the promise resolved due to timeout
  //     if (!res) {
  //       setAiLoader(false);
  //       setLoading(false);
  //       setErrMessage("All our servers are busy. Please try after sometime.");
  //       return;
  //     }

  //     const aiData = await res.json();
  //     console.log(aiData, "aiData>>");

  //     setLoading(false);
  //     if (aiData.status == 501) {
  //       setAiLoader(false);
  //       setErrMessage(aiData.message);
  //     } else if (aiData.success === false) {
  //       console.log("aiData", aiData);
  //       setAiLoader(false);
  //       setErrMessage("Email not Verified");
  //     } else {
  //       setSiteKey(aiData.siteKey);
  //     }
  //   } catch (error2) {
  //     setAiLoader(false);
  //     setLoading(false);
  //     setErrMessage("All our servers are busy. Please try after sometime.");
  //   }
  // }

  async function generateAIContent(htmlString, templateThumbnail) {
    setAiLoader(true);

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, 120000)
    );

    try {
      const data = {
        template_html: htmlString,
        templateThumbnail: templateThumbnail,
      };

      console.log(data, "data1234553");
      // const res = await fetch(
      //   `/api/generateAIContent?type=allsections&siteKey=${uniqueId}&temp=${category}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       // Accept: "text/html",
      //     },
      //     body: JSON.stringify(data), // Ensure this is a valid HTML string
      //   }
      // );
      // let aiURL = `/api/generateAIContent?type=allsections&siteKey=${uniqueId}&temp=${category}`;
      const res = await Promise.race([
        fetch(
          `/api/generateAIContent?type=allsections&siteKey=${uniqueId}&temp=${category}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Accept: "text/html",
            },
            body: JSON.stringify(data), // Ensure this is a valid HTML string
          }
        ),
        timeoutPromise, // Reject the promise if the timeout is reached
      ]);

      // Check if the promise resolved due to timeout
      if (!res) {
        setAiLoader(false);
        setLoading(false);
        setErrMessage("All our servers are busy. Please try after sometime.");
        return;
      }

      const aiData = await res.json();

      setLoading(false);
      if (aiData.status == 501) {
        setAiLoader(false);
        setErrMessage(aiData.message);
      } else if (aiData.success === false) {
        console.log("aiData", aiData.status);
        setAiLoader(false);
        setErrMessage("Email not Verified");
      } else {
        setSiteKey(aiData.siteKey);
      }
    } catch (error2) {
      setAiLoader(false);
      setLoading(false);
      setErrMessage("All our servers are busy. Please try after sometime.");
    }
  }

  const createWebsite = async (e, value) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      category: value,
    };
    try {
      const response = await fetch("/api/createWebsite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setSidebarOpen(true);
        setHtmlTemplatesBycategory(data.templates);
        // Use the HTML content returned from the API
        console.log("HTML Content:", data.html);
        // For example, you can set this HTML to a state in React
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        setHtmlTemplatesBycategory([]);
        setSelectedTemplateData([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching template:", error);
      setHtmlTemplatesBycategory([]);
      setSelectedTemplateData([]);
      setLoading(false);
    }
  };

  // Example usage

  const [templateId, setTemplateId] = useState("");

  // useEffect(() => {
  //   if (router) {
  //     if (router.query.temp) {
  //       setTemplateId(router.query.temp);
  //     }
  //   }
  // }, [router]);

  function dragover(event) {
    event.stopPropagation();
    event.preventDefault();

    // Add some visual fluff to show the user can drop its files
    if (!event.currentTarget.classList.contains("bg-orange-500")) {
      event.currentTarget.classList.remove("bg-gray-800");
      event.currentTarget.classList.add("bg-orange-500");
    }
  }

  function dragleave(event) {
    // Clean up

    event.currentTarget.classList.add("bg-gray-800");
    event.currentTarget.classList.remove("bg-orange-500");
  }

  function drop(event) {
    event.preventDefault();
    setImgFile(event.dataTransfer.files[0]);
    setProfilePic(URL.createObjectURL(event.dataTransfer.files[0]));

    event.currentTarget.classList.add("bg-gray-800");
    event.currentTarget.classList.remove("bg-orange-500");
  }

  const [dataToShow, setDataToShow] = useState(null);

  useEffect(() => {
    let sanitizedData = company
      .trim()
      .replace(/[^a-zA-Z0-9-]+/g, "-")
      .toLowerCase();

    // let sanitizedData = company
    //   .trim()
    //   .replace(/\s{2,}/g, "-")
    //   .replace(/[^\w-]/g, "")
    //   .toLowerCase();

    uniqueId = sanitizedData;

    setDataToShow(sanitizedData);
  }, [company]);

  console.log(data);

  return (
    <>
      {aiLoader == false && (
        <Layout>
          <div className="bg-indigo-50 w-full py-10" style={{ height: "calc(100vh - 64px)", overflow: "auto" }}>
            <div className="w-full px-14 text-xl text-slate-800 font-semibold mb-10">Create Website</div>
            <div>
              <div>
                <h2 className="text-lg font-bold text-center text-gray-900">
                  Hi {name}, Let's create your website in 60 seconds ⚡
                </h2>
              </div>
            </div>
            <div className="flex relative justify-center items-center w-full">
              <div className="mt-2 w-full min-w-xl max-w-xl bg-white shadow sm:rounded-xl pt-2 pb-4">
                <div className="flex justify-center w-full px-6 pt-2">
                  <span className="text-sm text-gray-800 max-w-xl mt-2 bg-orange-50 rounded-sm py-2 px-1">
                    We will use below information to auto generate content using
                    ChatGPT 🤖
                  </span>
                </div>

                <form action="#" method="POST">
                  <div className=" sm:overflow-hidden">
                    <div className="w-full flex justify-around space-x-6 bg-white py-4 px-6">
                      <div className="gap-4 w-full">
                        <div>
                          <label
                            htmlFor="photo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Brand Logo
                          </label>
                          <div className="flex items-center">
                            <div className="w-28 h-auto">
                              {profilePic.length == 0 && (
                                <div
                                  draggable
                                  onDragOver={dragover}
                                  onDragLeave={dragleave}
                                  onDrop={drop}
                                  className="bg-gray-600 mt-1 flex justify-center rounded-sm"
                                >
                                  <div className="space-y-3 text-center">
                                    <div className="text-xs text-gray-600">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-sm font-medium text-orange-500 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                                      >
                                        <span className="text-xs text-slate-200 px-3 py-3 bg-gray-600 hover:text-slate-100 grid">
                                          <svg
                                            className="mx-auto h-8 w-8 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                          >
                                            <path
                                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            ></path>
                                          </svg>
                                          Upload logo
                                        </span>
                                        <input
                                          id="file-upload"
                                          onChange={(evt) =>
                                            fileChanged(evt, "profile_pic")
                                          }
                                          type="file"
                                          src={"site60.png"}
                                          accept="image/*"
                                          className="sr-only"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {profilePic.length > 0 && (
                                <div className="border-2 border-slate-200 px-1 py-2 grid justify-center mx-auto w-auto rounded-md relative">
                                  {/* Image preview */}
                                  <img
                                    src={profilePic}
                                    className="w-20 h-16 object-cover rounded-md"
                                    alt="Profile Preview"
                                  />

                                  {/* Label for file upload with edit icon */}
                                  <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer bg-white rounded-sm font-medium text-orange-500 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500 flex items-center absolute right-0"
                                  >
                                    {/* Edit icon (replace with your own icon) */}
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-orange-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M13.875 3.1a2.1 2.1 0 012.825.182l.175.18a2.1 2.1 0 01.12 2.872l-9.635 9.636-2.96.73a1 1 0 01-1.177-1.178l.73-2.96 9.635-9.635zM16 4l4 4m-4-4l-4 4"
                                        />
                                      </svg>
                                    </span>
                                    <input
                                      id="file-upload"
                                      onChange={(evt) => fileChanged(evt, "profile_pic")}
                                      type="file"
                                      className="sr-only"
                                    />
                                  </label>
                                </div>

                                // <div className="border-2 border-slate-200 px-1 py-2 grid justify-center mx-auto w-auto rounded-md">
                                //   <img
                                //     src={profilePic}
                                //     className="w-20 h-16 object-cover rounded-md"
                                //   />

                                //   <label
                                //     htmlFor="file-upload"
                                //     className="mt-2 mb-1 relative cursor-pointer bg-white rounded-sm font-medium text-orange-500 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                                //   >
                                //     <span className="rounded-md text-xs text-orange-500 px-1 py-1.5 bg-orange-100 hover:text-orange-500 ">
                                //       Change Logo
                                //     </span>
                                //     <input
                                //       id="file-upload"
                                //       onChange={(evt) =>
                                //         fileChanged(evt, "profile_pic")
                                //       }
                                //       type="file"
                                //       className="sr-only"
                                //     />
                                //   </label>
                                // </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium text-gray-700"
                          >
                            What's your brand name?{" "}
                            <span className="text-xs text-gray-500">*</span>
                          </label>
                          <div className="mt-1 flex rounded-sm shadow-sm">
                            <input
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              type="text"
                              className="py-3 px-2 focus:ring-orange-500 border border-slate-200 flex-1 block w-full rounded-md sm:text-sm focus:outline-none dark:bg-slate-700 dark:text-slate-200"
                              placeholder="Acme Inc"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="mt-3">
                            <label
                              htmlFor="company-website"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Which Category your Business Suits to?{" "}
                              <span className="text-xs text-gray-500">*</span>
                            </label>
                            <div className="flex rounded-sm shadow-sm mt-1">
                              <select
                                value={category}
                                onChange={(e) => {
                                  const selectedOption = categories.find(
                                    (cat) => cat.value === e.target.value
                                  );
                                  updateCategory(
                                    e,
                                    selectedOption.value,
                                    selectedOption.label
                                  );
                                }}
                                className="py-3 px-2 focus:outline-none border border-slate-200 flex-1 block w-full rounded-md sm:text-sm placeholder-text-xs dark:bg-slate-700 dark:text-slate-200"
                              >
                                <option value="">Select</option>
                                {categories.map((cat) => (
                                  <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* {category !== "" && HtmlTemplatesBycategory.length !== 0 && (
                            <div className="mt-3">
                              <button
                                onClick={(e) => createWebsite(e, category)}
                                className="underline text-blue-600"
                              >
                                Change Template
                              </button>
                            </div>
                          )} */}

                          {category !== "" && HtmlTemplatesBycategory.length !== 0 && selectedTemplateData.length !== 0 && (
                            <div className="mt-3">
                              <div className="border border-gray-200 flex items-center p-2 h-full flex-col">
                                <img
                                  className="w-full h-full object-fit"
                                  src={selectedTemplateData?.thumbnail}
                                />
                                <p>
                                  {selectedTemplateData?.templateName}
                                </p>
                              </div>
                            </div>
                          )}

                          {category == "other" && (
                            <div className="grid grid-cols-1 gap-1 mt-1">
                              <div className="col-span-3 mt-2">
                                <label
                                  htmlFor="company-website"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Other category name?{" "}
                                  <span className="text-xs text-gray-500">
                                    *
                                  </span>
                                </label>
                                <div className="flex rounded-sm shadow-sm mt-1">
                                  <input
                                    value={selected}
                                    onChange={(e) => setSelected(value)}
                                    type="text"
                                    className="py-3 px-2 border border-slate-200 flex-1 block w-full rounded-md sm:text-sm focus:outline-none dark:bg-slate-700 dark:text-slate-200"
                                    placeholder="Enter other category"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* <div>
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium text-gray-700"
                          >
                            What you believe in?{" "}
                          </label>
                          <div className="mt-1 flex rounded-sm shadow-sm">
                            <input
                              value={belief}
                              onChange={(e) => setbelief(e.target.value)}
                              type="text"
                              className="md:py-3 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                              placeholder="What we believe in"
                            />
                          </div>
                        </div> */}

                        {/* <div className="grid grid-cols-1 mt-3">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium leading-6 text-gray-700"
                          >
                            About Your Company
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="about"
                              name="about"
                              rows={5}
                              className="px-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
                              placeholder="My Business provide spare parts for computers and laptops"
                              defaultValue={""}
                            />
                          </div>
                        </div> */}
                      </div>
                    </div>
                    {console.log(selectedTemplateData, 'selectedTemplateData')}
                    {errMessage && (
                      <div className="rounded-sm bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              {errMessage}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="px-4 py-3 text-center sm:px-6">
                      {(loading === true && HtmlTemplatesBycategory) ? (
                        <button
                          type="button"
                          className="flex items-center justify-center w-full rounded-md border-2 border-transparent bg-orange-500 text-center px-4 py-2 text-sm font-medium text-white shadow-sm hover:border-orange-500 hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 active:border-orange-500 active:bg-orange-500 active:text-white"
                        >
                          <svg
                            className="animate-spin ml-3 mr-3 h-5 w-5 text-black"
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
                        </button>
                      ) :
                        <button
                          type="button"
                          // onClick={() =>   createWebsite()}
                          onClick={() => updateInfo()}
                          className="w-full rounded-md border-2 border-transparent bg-orange-500 py-2 text-sm font-medium text-white shadow-sm hover:border-orange-500 hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 active:border-orange-500 active:bg-orange-500 active:text-white"
                        >
                          Create Website
                        </button>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <Transition.Root show={isSidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setSidebarOpen}>
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

              <div className="fixed inset-0 z-10 overflow-y-auto m-auto bg-transparent">
                <div className="flex items-center justify-center p-4 text-center sm:p-6">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-10 text-left shadow-xl transition-all sm:w-full sm:max-w-7xl h-auto">
                      <div className="bg-white h-16 px-4 sm:px-6 flex items-center justify-between ">
                        <Dialog.Title
                          className={classNames(
                            "text-lg font-bold text-black"
                            // selectedFont?.name
                          )}
                        >
                          SELECT TEMPLATE -{categorylabel}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md bg-red-200  text-red-500 focus:outline-none focus:ring-0 focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="bg-white w-full h-full overflow-y-auto scroll-bar mt-4">
                        <div className="px-10">
                          <div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 justify-between pb-4">
                              {HtmlTemplatesBycategory &&
                                HtmlTemplatesBycategory.map((detail, index) => (
                                  <div className="border border-gray-200 flex items-center p-2 h-full flex-col" onClick={() => handleTemplateHtml(detail)} key={index}>
                                    <img
                                      className="w-full h-full object-fit"
                                      src={detail?.thumbnail}
                                    />
                                    <p>
                                      {detail?.templateName}-{index + 1}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </Layout>
      )}

      {aiLoader && (
        <DummyWebsite
          aiLoader={aiLoader}
          siteId={siteKey}
          UpdatedHtmlKey={UpdatedHtmlKey}
          updatedTemplatehtml={updatedTemplatehtml}
        />
      )}
    </>
  );
}
