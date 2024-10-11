import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  getSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


export default function Example({ csrfToken, providers }) {
  const schema = z.object({
    password: z
      .string()
      .min(6, { message: "Min 6 characters" })
      .max(100, { message: "Max 100 characters" }),
    password2: z
      .string()
      .min(6, { message: "Min 6 characters" })
      .max(100, { message: "Max 100 characters" })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const key = router.query.key;


  const onSubmit = async (submitData) => {
 
    if (submitData.password2 != submitData.password) {
      setErrMessage("Passwords do not match");
    }
    else {

       setErrMessage("");
       const res = await fetch("/api/auth/resetpwd", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           password: submitData.password,
           password2: submitData.password2,
           key: key,
           from: "web",
         }),
       });
       const data = await res.json();
       if (data.status == 403) {
         setErrMessage("Oops! Check your email for the link");
       } else {
         setSuccess(true);
       }

    }



  };



  return (
    <>
      <div className="bg-indigo-50 h-full min-h-screen">
        {success == false && (
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-16 w-auto"
                src="main-logo.svg"
                alt="Sites60 Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <a
                  className="font-medium text-orange-500 hover:text-orange-500"
                  href="/login"
                >
                  Login to continue
                </a>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                          errors.password
                            ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        }`}
                      />
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
                      className="block text-sm font-medium text-gray-700"
                    >
                      Re-enter Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        {...register("password2", { required: true })}
                        className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400  sm:text-sm ${
                          errors.password2
                            ? "border-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        }`}
                      />
                    </div>
                    {errors.password2 && (
                      <p className="mt-2 text-xs text-red-500">
                        Min 6 characters, Max 100 characters
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

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {success == true && (
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-16 w-auto"
                src="logo.svg"
                alt="Sites60 Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Your password has been reset
              </h2>

              <p className="mt-5 text-center text-sm text-gray-600">
                <a
                  className="text-xl text-center font-medium text-orange-500 hover:text-orange-500"
                  href="/login"
                >
                  Login to continue
                </a>
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
