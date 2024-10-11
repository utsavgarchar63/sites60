import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { CheckIcon } from "@heroicons/react/24/outline";

const tiers = [
  {
    name: "Hobby",
    id: "free",
    priceMonthly: 0,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc.",
      "Orci neque eget pellentesque.",
    ],
  },
  {
    name: "Freelancer",
    id: "plan1",
    priceMonthly: 49,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc. ",
      "Orci neque eget pellentesque.",
      "Donec mauris sit in eu tincidunt etiam.",
    ],
  },
  {
    name: "Agency",
    id: "plan2",
    priceMonthly: 149,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc. ",
      "Orci neque eget pellentesque.",
      "Donec mauris sit in eu tincidunt etiam.",
      "Faucibus volutpat magna.",
    ],
  },
  {
    name: "Enterprise",
    id: "plan3",
    priceMonthly: 48,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc. ",
      "Orci neque eget pellentesque.",
      "Donec mauris sit in eu tincidunt etiam.",
      "Faucibus volutpat magna.",
      "Id sed tellus in varius quisque.",
      "Risus egestas faucibus.",
      "Risus cursus ullamcorper.",
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Billing() {
  const router = useRouter();
  const notify = (label) => toast(label);

  const [userInfo, setUserInfo] = useState({
    is_paid: false,
    current_plan: "free",
  });

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
    console.log("userInfo Data>>>>", data);

    const dataInfo = data.userInfo;

    if (dataInfo) {
      let planName = "Free";

      if (
        dataInfo.plan_id == "price_1M7CEMSBvfNCKIA7iHEXptJP" ||
        dataInfo.plan_id == "price_1MCiBbSBvfNCKIA7Cy2i2vD5"
      ) {
        planName = "Basic";
      } else if (
        dataInfo.plan_id == "price_1M7CEkSBvfNCKIA7UfKiuF02" ||
        dataInfo.plan_id == "price_1MCiBxSBvfNCKIA7D1KEhxZm"
      ) {
        planName = "Pro";
      }
      setUserInfo({
        ...userInfo,
        is_paid: dataInfo.is_paid_user,
        current_plan: planName,
      });
    }
  };

  const buyPlan = async (plan) => {
    console.log("Buy this plan>>>>", plan);
    let plan_id = "";

    if (plan == "plan3") {
      // Internal Alert
    } else {

      if (plan == "plan1") {
        if (process.env.NEXT_PUBLIC_ENV == "production") {
          plan_id = "price_1NEWJFSBvfNCKIA7DDmXoizl";
          // plan_id = "price_1MCiBbSBvfNCKIA7Cy2i2vD5";
        } else {
          plan_id = "price_1M7CEMSBvfNCKIA7iHEXptJP";
        }
      } else if (plan == "plan2") {
        if (process.env.NEXT_PUBLIC_ENV == "production") {
          plan_id = "price_1NEWJsSBvfNCKIA74Xmx0nmq";
          // plan_id = "price_1MCiBxSBvfNCKIA7D1KEhxZm";
        } else {
          plan_id = "price_1M7CEkSBvfNCKIA7UfKiuF02";
        }
      }
      // if (plan == "plan1") {
      //   if (process.env.NEXT_PUBLIC_ENV == "production") {
      //     plan_id = "price_1ND3haSBvfNCKIA7YgWXkYlN";
      //     // plan_id = "price_1MCiBbSBvfNCKIA7Cy2i2vD5";
      //   } else {
      //     plan_id = "price_1M7CEMSBvfNCKIA7iHEXptJP";
      //   }
      // } else if (plan == "plan2") {
      //   if (process.env.NEXT_PUBLIC_ENV == "production") {
      //     plan_id = "price_1ND3jcSBvfNCKIA7qZamOk1o";
      //     // plan_id = "price_1MCiBxSBvfNCKIA7D1KEhxZm";
      //   } else {
      //     plan_id = "price_1M7CEkSBvfNCKIA7UfKiuF02";
      //   }
      // }

      const res = await fetch("/api/stripe?plan_id=" + plan_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log("Data>>>>", data);

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
  };

  const manageSubscription = () => {
    router.push("https://billing.stripe.com/p/login/test_14k29n0tYdjO2zu9AA");
  };

  return (
    <>
      <Layout>
        <ToastContainer autoClose={3000} />

        <div className="m-10">
          <div className="bg-white border border-gray-200 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Current Plan
                  </h3>
                  <div className="mt-2 max-w-xl text-base text-gray-900">
                    <p className="text-indigo-600 text-lg font-bold">
                      {userInfo.current_plan}
                    </p>
                  </div>
                </div>
                {userInfo.current_plan != "free" && (
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                    <a
                      href="https://billing.stripe.com/p/login/test_14k29n0tYdjO2zu9AA"
                      target="_blank"
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Manage Subscription
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8">
            <div className="sm:align-center sm:flex sm:flex-col">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">
                Pricing Plans
              </h1>
              <p className="mt-5 text-xl text-gray-500 sm:text-center">
                Start building for free, then add a site plan to go live.
                Account plans unlock additional features.
              </p>
            </div>
            <div className="space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="p-6">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      {tier.name}
                    </h2>
                    <p className="mt-4 text-sm text-gray-500">
                      {tier.description}
                    </p>

                    {tier.id == "plan1" && (
                      <div>
                        <p className="mt-8">
                          <span className="text-4xl font-bold tracking-tight text-gray-900">
                            ${tier.priceMonthly}
                          </span>{" "}
                          <span className="text-base font-medium text-gray-500">
                            /year
                          </span>
                        </p>
                        <a
                          onClick={() => {
                            buyPlan("plan1");
                          }}
                          className="cursor-pointer mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                        >
                          Buy {tier.name}
                        </a>
                      </div>
                    )}

                    {tier.id == "plan2" && (
                      <div>
                        <p className="mt-8">
                          <span className="text-4xl font-bold tracking-tight text-gray-900">
                            ${tier.priceMonthly}
                          </span>{" "}
                          <span className="text-base font-medium text-gray-500">
                            /year
                          </span>
                        </p>
                        <a
                          onClick={() => {
                            buyPlan("plan2");
                          }}
                          className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                        >
                          Buy {tier.name}
                        </a>
                      </div>
                    )}

                    {tier.id == "free" && (
                      <p className="mt-8">
                        <span className="text-4xl font-bold tracking-tight text-gray-900">
                          Free
                        </span>
                      </p>
                    )}

                    {tier.id == "plan3" && (
                      <div>
                        <p className="mt-8">
                          <span className="text-4xl font-bold tracking-tight text-gray-900">
                            Custom
                          </span>
                        </p>
                        <a
                          onClick={() => {
                            buyPlan("plan3");
                          }}
                          className="cursor-pointer mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                        >
                          Contact Us
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="px-6 pt-6 pb-8">
                    <h3 className="text-sm font-medium text-gray-900">
                      What's included
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {tier.includedFeatures.map((feature) => (
                        <li key={feature} className="flex space-x-3">
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                          <span className="text-sm text-gray-500">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
