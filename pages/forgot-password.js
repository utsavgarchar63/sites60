import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  getSession,
} from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


export default function Example({ csrfToken }) {

  console.log("Recaptcha Key---", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  const [errMessage, setErrMessage] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  const schema = z.object({
    email: z.string().email({ message: "Invalid Email" }).min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (submitData) => {
    console.log("Submitted>>>>", submitData);
    setErrMessage("");
    //  setLoader(true);

    const res = await fetch("/api/auth/forgotpwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: submitData.email,
        captcha: captchaCode,
        from: "web",
      }),
    });
    const data = await res.json();
    if (data.status == 403) {
      setErrMessage(
        "You haven't registered yet. Create an account to continue."
      );
    } else {
      setSuccess(true);
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
    <>
      <div className="bg-slate-50 h-full min-h-screen">
        {success == false && (
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-16 w-auto"
                src="/main-logo.png"
                alt="Sites60 Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
                Forgot Password?
              </h2>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
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
                        autoComplete="name"
                        {...register("email", {
                          required: true,
                        })}
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

                  {errMessage && (
                    <div className="mt-6">
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
                        Reset Password
                      </button>}
                  </div>
                </form>
                <p className="mt-5 text-center text-sm text-gray-600">
                  New to Sites60?{" "}
                  <a
                    className="font-medium text-orange-500 hover:text-orange-500 hover:opacity-80 underline transition-opacity duration-200"
                    href="/register"
                  >
                    Create Account
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {success == true && (
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-16 w-auto"
                src="main-logo.png"
                alt="Sites60 Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Check your email for password reset instructions.
              </h2>
              <p className="mt-5 text-center text-sm text-gray-600">
                Do check your spam folder in case the email isn't in your inbox.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
