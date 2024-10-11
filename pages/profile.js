/* This example requires Tailwind CSS v2.0+ */
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { countriesList } from "../lib/genericData";

export default function Profile() {
  const [loader, setLoader] = useState(false);
  const notify = (label) => toast(label);
  const [profilePic, setProfilePic] = useState("");
  const [imgFile, setImgFile] = useState(undefined);
  const [errMessage, setErrMessage] = useState("");
  const cList = countriesList();
  const [selectedOption, setSelectedOption] = useState(cList[0].value);

  const phoneRegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const schema = z.object({
    fname: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(40, { message: "Max 40 characters" }),
    lname: z
      .string()
      .min(1, { message: "Min 1 character" })
      .max(40, { message: "Max 40 characters" }),
    email: z.string().email({ message: "Invalid Email" }),
    phone: z.union([
      z.string().regex(phoneRegExp, { message: "Invalid Phone Number regex" }),
      z.literal(""),
    ]),
    belief: z.string(),
    city: z.string().min(3, { message: "Required" }),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getInfo();
  }, []);

  const [handleChange] = useState(() => {
    return () => {
      setSelectedCountry(selectedCountry);
    };
  });

  const getInfo = async () => {
    const res = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log("userInfo Data>>>>", data);

    const userInfo = data.userInfo;

    if (userInfo) {
      setValue("fname", userInfo.first_name);
      setValue("lname", userInfo.last_name);
      setValue("email", userInfo.email);
      setValue("phone", userInfo.mobile);
      setValue("city", userInfo.city);
      setValue("belief", userInfo.belief);

      if (userInfo.hasOwnProperty("mobile")) {
        if (userInfo.mobile.length > 0) {
          let ctyCode = cList.filter(
            (e) => e.value == userInfo.mobile_country
          )[0];
          setSelectedOption(ctyCode.value);
        }
      }

      if (userInfo.hasOwnProperty("profile_pic")) {
        setProfilePic(userInfo.profile_pic);
        setImgFile(undefined);
      }
    }
  };

  const onSubmit = async (submitData) => {
    setErrMessage("");
    setLoader(true);

    // console.log("Selected Country>>>>>", selectedOption);
    var formData = new FormData();

    let phoneCountry = "";

    if (submitData.phone.length > 0) {
      phoneCountry = selectedOption;
    }

    formData.append("fname", submitData.fname);
    formData.append("lname", submitData.lname);
    formData.append("phone", submitData.phone);
    formData.append("phone_country", phoneCountry);
    formData.append("city", submitData.city);
    formData.append("belief", submitData.belief);

    if (imgFile) {
      formData.append("profile_pic", imgFile);
    }

    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    setLoader(false);
    console.log("Data>>>>", data);
    if (data.errors) {
      setErrMessage(data.errors[0].msg);
    } else {
      if (data.status == 422 || data.status == 400 || data.status == 500) {
        setErrMessage("All our servers are busy. Please try after sometime.");
      } else {
        notify("Profile Info Saved!!");
      }
    }
  };

  function fileChanged(event, type) {
    console.log(event.target.files);
    setImgFile(event.target.files[0]);

    setProfilePic(URL.createObjectURL(event.target.files[0]));
  }

  function dragover(event) {
    event.stopPropagation();
    event.preventDefault();

    // Add some visual fluff to show the user can drop its files
    if (!event.currentTarget.classList.contains("bg-indigo-600")) {
      event.currentTarget.classList.remove("bg-gray-800");
      event.currentTarget.classList.add("bg-indigo-600");
    }
  }

  function dragleave(event) {
    // Clean up
    console.log("dragleave>>>>>");
    event.currentTarget.classList.add("bg-gray-800");
    event.currentTarget.classList.remove("bg-indigo-600");
  }

  function drop(event) {
    console.log("drop>>>>>");

    event.preventDefault();
    setImgFile(event.dataTransfer.files[0]);
    setProfilePic(URL.createObjectURL(event.dataTransfer.files[0]));
    // media.value = event.dataTransfer.files[0];

    event.currentTarget.classList.add("bg-gray-800");
    event.currentTarget.classList.remove("bg-indigo-600");
  }

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Layout>
        <div className="bg-indigo-50 w-full py-10" style={{ height: "calc(100vh - 64px)", overflow: "auto" }}>
          <div className="w-full px-14 text-xl text-slate-800 font-semibold">User Profile</div>
          <div className="flex flex-1 flex-col">
            <div className="relative ">
              <div className="relative mx-auto items-center py-8 px-8">
                {/* <div className="bg-white py-4 px-4 sm:px-2 lg:py-14 lg:px-8 xl:pl-12 rounded-md"> */}
                {/* <h2 className="text-3xl font-extrabold text-gray-500 pb-5">
                  Profile
                </h2> */}
                {/* <div className="w-full"> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <div className=''> */}
                  {/* <div className=''> */}
                  <div className="w-full max-w-[550px] mx-auto bg-white px-6 py-6 flex space-x-6 justify-center items-start space-y-4">
                    <div className="w-full space-y-5">

                      <div className="max-w-full">
                        <label
                          htmlFor="photo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Profile
                        </label>
                        <div className="mt-1 flex items-center">
                          <div className="mt-2">
                            {profilePic.length == 0 && (
                              <div
                                draggable
                                onDragOver={dragover}
                                onDragLeave={dragleave}
                                onDrop={drop}
                                // className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                className="bg-white mt-1 flex justify-center px-3 pt-3 pb-3 border-2 border-gray-200 border-dashed w-36 h-30 cursor-pointer"
                                onClick={() => document.getElementById('file-upload').click()}
                              >
                                <div className="space-y-1 text-center">
                                  <span>
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
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
                                  </span>
                                  <input
                                    id="file-upload"
                                    onChange={(evt) => fileChanged(evt, "profile_pic")}
                                    type="file"
                                    className="sr-only"
                                  />
                                </div>

                              </div>
                            )}

                            {profilePic.length > 0 && (
                              <div className="relative">
                                <img src={profilePic} className="w-36 h-30 object-cover" />
                                <span className="cursor-pointer absolute right-0 top-0" onClick={() => document.getElementById('file-upload').click()}>
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
                                  className="hidden"
                                  id="file-upload"
                                  onChange={(evt) => fileChanged(evt, "profile_pic")}
                                  type="file"
                                />
                              </div>

                              // <div>
                              //   <img src={profilePic} className="w-44 h-30 object-cover" />
                              //   <span className="mr-1">
                              //     <svg
                              //       xmlns="http://www.w3.org/2000/svg"
                              //       className="h-5 w-5 text-orange-500"
                              //       fill="none"
                              //       viewBox="0 0 24 24"
                              //       stroke="currentColor"
                              //     >
                              //       <path
                              //         strokeLinecap="round"
                              //         strokeLinejoin="round"
                              //         strokeWidth={2}
                              //         d="M13.875 3.1a2.1 2.1 0 012.825.182l.175.18a2.1 2.1 0 01.12 2.872l-9.635 9.636-2.96.73a1 1 0 01-1.177-1.178l.73-2.96 9.635-9.635zM16 4l4 4m-4-4l-4 4"
                              //       />
                              //     </svg>
                              //   </span>
                              //   <input
                              //     className="w-44 cursor-pointer inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              //     id="file-upload"
                              //     placeholder="Change Image"
                              //     onChange={(evt) =>
                              //       fileChanged(evt, "profile_pic")
                              //     }
                              //     type="file"
                              //   />
                              // </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="max-w-full">
                        <label
                          htmlFor="business-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email *
                        </label>
                        <div className="mt-1">
                          <input
                            {...register("email", {
                              required: true,
                            })}
                            type="email"
                            disabled
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="max-w-full">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            {...register("fname", {
                              required: true,
                            })}
                            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.fname
                              ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              }`}
                          />
                        </div>
                        {errors.fname && (
                          <p className="mt-2 text-xs text-red-500">
                            {errors.fname.message}
                          </p>
                        )}
                      </div>

                      <div className="max-w-full">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name *
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            {...register("lname", {
                              required: true,
                            })}
                            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.lname
                              ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              }`}
                          />
                        </div>
                        {errors.lname && (
                          <p className="mt-2 text-xs text-red-500">
                            {errors.lname.message}
                          </p>
                        )}
                      </div>

                      <div className="max-w-full">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone *
                        </label>
                        <div className="mt-1">
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                              <label htmlFor="country" className="sr-only">
                                Country
                              </label>

                              <select
                                className="h-full rounded-md border-transparent bg-transparent py-0 pl-1 pr-0 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={selectedOption}
                                onChange={(e) =>
                                  setSelectedOption(e.target.value)
                                }
                              >
                                {cList.map((o) => (
                                  <option key={o.name} value={o.value}>
                                    {o.value}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <input
                              {...register("phone")}
                              className={`appearance-none block w-full pl-16 px-1 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.phone
                                ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                              placeholder="99666 99666"
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <p className="mt-2 text-xs text-red-500">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="max-w-full">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City *
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            {...register("city")}
                            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.longitude
                              ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              }`}
                          />
                        </div>
                        {errors.city && (
                          <p className="mt-2 text-xs text-red-500">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      {/* <div className="max-w-full">
                          <label
                            htmlFor="full-name"
                            className="block text-xs font-medium text-gray-700"
                          >
                            What we believe in?
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              {...register("belief")}
                              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                                errors.belief
                                  ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              }`}
                            />
                          </div>
                          {errors.belief && (
                            <p className="mt-2 text-xs text-red-500">
                              {errors.belief.message}
                            </p>
                          )}
                        </div> */}

                      {errMessage && (
                        <div className="mt-2">
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <ExclamationTriangleIcon className="w-5 h-5 current text-red-400" />
                              </div>
                              <div className="ml-1 flex-1 md:flex md:justify-between">
                                <p className="text-sm text-red-500 ">
                                  {errMessage}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex w-full">
                        {loader === true ? (
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
                            type="submit"
                            className="w-full rounded-md border-2 border-transparent bg-orange-500 py-2 text-sm font-medium text-white shadow-sm hover:border-orange-500 hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 active:border-orange-500 active:bg-orange-500 active:text-white"
                          >
                            Save
                          </button>}
                      </div>
                    </div>
                  </div>
                </form>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}