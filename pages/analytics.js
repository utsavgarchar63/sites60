import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import Layout from "../components/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useState, useEffect } from "react";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Index() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  const [fromDate, setFromDate] = useState(d);
  const [toDate, setToDate] = useState(new Date());

  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    views: 0,
    clicks: 0,
  });

  const [sitesList, setSitesList] = useState([]);
  const [formsList, setFormsList] = useState([]);

  const getInfo = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/analytics?fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setLoading(false);
    console.log("analytics Data>>>>", data);
    if (data.finalArray) {
      let views = 0;
      let clicks = 0;
      let tempList = [];
      let tempFormsList = [];

      for (const iterator of data.finalArray) {

        let tempViews = 0 
        let tempClicks = 0 
        let tempResponses = 0 

        tempResponses = iterator.responses.length;

        for (const iterator2 of iterator.responses) {

           tempFormsList.push({
             key: iterator.smartsite.key,
             title: iterator.smartsite.title,
             response: iterator2,
           });
        }

        if (iterator.data.views) {
          views = views + iterator.data.views.length;
          tempViews = iterator.data.views.length;
        }

        if (iterator.data.clicks) {
          clicks = clicks + iterator.data.clicks.length;
          tempClicks = iterator.data.clicks.length;
        }

        
        tempList.push({
          key: iterator.smartsite.key,
          title: iterator.smartsite.title,
          favicon: iterator.smartsite.favicon,
          views: tempViews,
          clicks: tempClicks,
          responses: tempResponses,
        });

       
      }      

      const flattenedArray = tempFormsList.flat(2);

      setFormsList(tempFormsList)

      setSitesList(tempList);

      setStats({
        ...stats,
        views: views,
        clicks: clicks,
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (fromDate) {
      getInfo();
    }

    if (toDate) {
      getInfo();
    }
  }, [fromDate, toDate]);

  return (
    <>
      <div>
        <Layout>
          <div className="w-full h-full">
            <div className="m-10 flex space-x-8">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  From Date:
                </label>
                <DatePicker
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  To Date
                </label>
                <DatePicker
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3 justify-center">
                {loading == true && (
                  <button
                    type="button"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="m-10">
                <h1 className="text-xl font-semibold text-gray-900">
                  Site Stats
                </h1>
                <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900">
                      Views
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                        {stats.views}
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900">
                      Clicks
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                        {stats.clicks}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-10 mb-10 flex flex-1 flex-col">
              <div className="">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Smartsite's Performance
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        Performance of each smartsite
                      </p>
                    </div>
                  </div>
                  <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Smartsite
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                          >
                            Views
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            Clicks
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            Form Fills
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {sitesList.map((person) => (
                          <tr key={person.key}>
                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                              {person.title}
                              <dl className="font-normal lg:hidden">
                                <dt className="sr-only">Title</dt>
                                <dd className="mt-1 truncate text-gray-700">
                                  {person.views}
                                </dd>
                                <dt className="sr-only sm:hidden">Email</dt>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                  {person.clicks}
                                </dd>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                  {person.responses}
                                </dd>
                              </dl>
                            </td>

                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                              {person.views}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                              {person.clicks}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                              {person.responses}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 mb-10 flex flex-1 flex-col">
              <div className="">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Smartsite's Form Fills
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        Form filled in each smartsite
                      </p>
                    </div>
                  </div>
                  <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Smartsite
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                          >
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {formsList.map((item) => (
                          <tr key={item.key}>
                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                              {item.title}
                              <dl className="font-normal lg:hidden">
                                <dt className="sr-only">Title</dt>
                                <dd className="mt-1 truncate text-gray-700">
                                  {item.response.name}
                                </dd>
                                <dt className="sr-only sm:hidden">Email</dt>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                  {item.response.email}
                                </dd>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                  {item.response.phone}
                                </dd>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                  {item.response.message}
                                </dd>
                              </dl>
                            </td>

                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                              {item.response.name}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                              {item.response.email}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                              {item.response.phone}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                              {item.response.message}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
