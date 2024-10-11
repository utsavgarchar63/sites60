import Layout from "../components/Layout";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { Transition, Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  LockClosedIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Index() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [domain, setDomain] = useState("website.com");
  const [verStatus, setVerStatus] = useState("create"); //create pending or verified

  const [txtName, setTxtName] = useState("");
  const [txtValue, setTxtValue] = useState("");
  const [txtStatus, setTxtStatus] = useState("");
  const [verName, setVerName] = useState("");
  const [verValue, setVerValue] = useState("");
  const [vStatus, setVStatus] = useState("");
  const [id, setId] = useState("");

  const notify = (label) => toast(label);
  const [smartsitesList, setSmartsitesList] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  const generateTXTRecords = async () => {
    setLoader(true);
    const res = await fetch("/api/whitelabel", {
      method: "POST",
      body: JSON.stringify({
        whitelabelurl: domain,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Await for data for any desirable next steps
    const data = await res.json();

    console.log("Create Data>>>>", data);
    setLoader(false);
    if (data.errors) {
      notify(data.errors[0].msg);
    } else {
      if (data.status == 422 || data.status == 400 || data.status == 500) {
        notify("All our servers are busy. Please try after sometime.n");
      } else if (data.success == false) {
        notify(data.message);
      } else {
        notify("TXT Records Created");
        getInfo();
      }
    }
  };

  const statusCheck = async () => {
    const res = await fetch("/api/cloudflareStatus", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    getInfo();
    console.log("cloudflareStatus Data>>>>", data);
  };

  const delDomain = async () => {
    console.log("ID>>>>", id);
    const res = await fetch("/api/whitelabel", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    getInfo();
    console.log("DELETE Data>>>>", data);
  };

  const getInfo = async () => {
    const res = await fetch("/api/whitelabel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("whitelabel Data>>>>", data);

    setIsPaidUser(data.is_paid);

    if (data.is_paid == true && data.is_empty == true) {
      setVerStatus("create");
    }
    if (data.is_paid == true && data.is_empty == false) {
      setId(data.data._id);
      setDomain(data.data.whitelabelurl);
      setVerStatus("pending");
      setTxtName(data.data.txt_name);
      setTxtStatus(data.data.txt_status);
      setTxtValue(data.data.txt_value);
      setVerName(data.data.ver_name);
      setVStatus(data.data.ver_status);
      setVerValue(data.data.ver_value);
    }
  };

  return (
    <>
      <Layout>
        <ToastContainer autoClose={3000} />
        <div>
          {isPaidUser == true && (
            <div className="flex-1 bg-gray-100 min-h-screen p-10">
              <div className="w-8/12 ml-1">
                {verStatus == "create" && (
                  <div>
                    <label
                      for="email"
                      className="block text-base font-medium text-gray-700"
                    >
                      Enter your domain
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        disabled=""
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="mywebsite.com"
                        onChange={(e) => setDomain(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={() => generateTXTRecords()}
                      type="button"
                      className="mt-5 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Verify Domain Ownership
                    </button>
                  </div>
                )}

                {verStatus == "pending" && (
                  <div>
                    <label className=" block text-base font-medium text-gray-700">
                      Verify domain ownership
                    </label>

                    <div className="mt-2 text-sm">
                      <div className="">
                        <div className="sm:flex sm:items-center">
                          <div className="sm:flex-auto">
                            <p className="mt-2 text-sm text-gray-700">
                              Add the below CNAME record in your DNS
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-col">
                          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                      >
                                        CNAME
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Value
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {domain}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        fallback.sites60.com
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                          <p className="mt-2 text-sm text-gray-700">
                            Add the below TXT records in your DNS
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      TXT Value
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                      {txtName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {txtValue}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                                        {txtStatus}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                      {verName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {verValue}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                                        {vStatus}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => statusCheck()}
                      type="button"
                      className="mt-5 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Recheck Status
                    </button>

                    <button
                      onClick={() => delDomain()}
                      type="button"
                      className="ml-5 mt-5 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Records
                    </button>
                  </div>
                )}
              </div>

              {verStatus == "verified" && (
                <div>
                  <div className="flex items-center mt-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-green-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <p className="ml-1 text-gray-700">
                      Domain verified - <strong>{domain}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => delDomain()}
                    type="button"
                    className="mt-5 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Domain Records
                  </button>
                </div>
              )}
            </div>
          )}

          {isPaidUser == false && (
            <a
              href="/billing"
              type="button"
              className="m-10 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <LockClosedIcon
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              Upgrade to Access this feature
            </a>
          )}
        </div>
      </Layout>
    </>
  );
}
