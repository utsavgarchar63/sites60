import { useState } from "react";
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { countriesList } from "../lib/genericData";

export default function Register({ providers }) {
  const router = useRouter();
  const cList = countriesList();

  const phoneRegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const schema = z.object({
    firstName: z
      .string()
      .min(3, { message: "Min 3 characters" })
      .max(40, { message: "Max 40 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Min 1 character" })
      .max(40, { message: "Max 40 characters" }),
    email: z.string().email({ message: "Invalid Email" }).min(6),
    password: z
      .string()
      .min(6, { message: "Min 6 characters" })
      .max(100, { message: "Max 100 characters" }),
    phone: z.union([
      z.string().regex(phoneRegExp, { message: "Invalid Phone Number regex" }),
      z.literal(""),
    ]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [errMessage, setErrMessage] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (submitData) => {
    setErrMessage("");
    // if (true)
    if (captchaCode) {
      setErrMessage("");
      setLoader(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: submitData.firstName,
          last_name: submitData.lastName,
          email: submitData.email,
          password: submitData.password,
          mobile: submitData.phone,
          role: "owner",
          captcha: captchaCode,
          invite_accepted: true,
          from: "web",
        }),
      });
      //Await for data for any desirable next steps
      const data = await res.json();

      if (data.errors) {
        setErrMessage(data.errors[0].msg);
      } else {
        if (data.status == 403) {
          setLoader(false);
          setErrMessage(
            "You have already created an account. Login to continue."
          );
        } else if (data.status == 406) {
          setLoader(false);
          setErrMessage("Invalid Captcha. Please try again.");
        } else if (
          data.status == 422 ||
          data.status == 400 ||
          data.status == 500
        ) {
          console.log("Inside this yoooooo");
          setLoader(false);
          setErrMessage("All our servers are busy. Please try after sometime.");
        } else {
          let email = submitData.email;
          let password = submitData.password;
          let options = {
            redirect: false,
            email: email,
            password: password,
            role: "owner",
          };
          const res2 = await signIn("credentials", options);

          if (res2.status == 401) {
            router.push("/login");
          } else {
            router.push("/onboard");
          }
        }
      }

      setLoader(false);
    } else {
      setErrMessage("Invalid Captcha");
    }
  };

  const onReCAPTCHAChange = (captcha) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captcha) {
      return;
    }

    setCaptchaCode(captcha);
  };

  return (
    <div className="bg-indigo-50 h-full min-h-screen">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-16 w-auto"
            src="main-logo.png"
            alt="Smartsites Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            Create New Account
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      autoComplete="name"
                      {...register("firstName", {
                        required: true,
                      })}
                      className={`appearance-none block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.firstName
                        ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sm:mt-0 mt-5"
                  >
                    Last Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      autoComplete="name"
                      {...register("lastName", {
                        required: true,
                      })}
                      className={`appearance-none block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.lastName
                        ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    className={`appearance-none block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.email
                      ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register("password", { required: true })}
                      className={`appearance-none block w-full px-3 py-3 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.password
                        ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        } pr-10`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-xs text-red-500">
                      Min 6 characters, Max 100 characters
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 sm:mt-0 mt-5"
                  >
                    Phone Number *
                  </label>
                  <div className="mt-1">
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="country" className="sr-only">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          className="h-full rounded-md border-transparent bg-transparent py-0 pl-1 text-gray-500 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        >
                          {cList &&
                            cList.map((item) => (
                              <option key={item.code}>{item.value}</option>
                            ))}
                        </select>
                      </div>
                      <input
                        {...register("phone")}
                        className={`appearance-none block w-full pl-16 px-3 py-3 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${errors.phone
                          ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          }`}
                        placeholder="99666 99666"
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500">
                      Invalid Phone Number
                    </p>
                  )}
                </div>
              </div>

              {errMessage && (
                <div className="mt-6">
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="w-5 h-5 current text-red-400" />
                      </div>
                      <div className="ml-1 flex-1 md:flex md:justify-between">
                        <p className="text-sm text-red-500 ">{errMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm mt-4 text-gray-600 flex">
                <input type="checkbox" className="mr-3 cursor-pointer" />I
                have read and agreed to
                <a
                  className="font-medium text-orange-500 hover:text-orange-500 hover:opacity-80 transition-opacity duration-200 cursor-pointer ms-1"
                  href="/terms"
                  target="_blank"
                >
                  Terms and Conditions *
                </a>
              </div>

              <ReCAPTCHA
                size="normal"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
              />

              <div>
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
                    Create Account
                  </button>}
              </div>

              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-1 flex w-full justify-center gap-3">
                <div>
                  <a
                    href="#"
                    onClick={() => signIn(providers.google.id)}
                    className="inline-flex w-36 justify-center rounded-md border border-gray-300 bg-white py-3 px-3 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <img src="google.svg" className="w-5 h-5" />
                    <p className="text-sm font-medium text-gray-700 ps-2 text-center">
                      Google
                    </p>
                  </a>
                </div>
              </div>

              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  className="font-medium text-orange-500 hover:text-orange-500 hover:opacity-80 underline transition-opacity duration-200"
                  href="/login"
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  const csrfToken = await getCsrfToken({ req });
  const providers = await getProviders({ req });

  return {
    props: {
      providers: providers,
      csrfToken: csrfToken,
    },
  };
}
