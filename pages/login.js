import { useState } from "react";
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";

export default function Example({ csrfToken, providers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();

    let options = {
      redirect: false,
      email: email,
      password: password,
      role: "owner",
    };
    const res = await signIn("credentials", options);

    console.log("Response>>>>", res);

    if (res.status == 401 || res.error != null) {
      setLoader(false);
      setErrMessage("Invalid Credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="bg-indigo-50 h-full min-h-screen">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-16 w-auto"
            src="/main-logo.png"
            alt="Sites60 Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            Login to your account
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  Email *
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm pr-10"
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

              <p className="mt-3 text-end text-xs text-gray-600">
                <a
                  className="font-medium text-orange-500 hover:text-orange-500 hover:opacity-80 underline transition-opacity duration-200"
                  href="/forgot-password"
                >
                  Forgot Password?
                </a>
              </p>

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
                  Login
                </button>}

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
                <button
                  onClick={() => signIn(providers.google.id)}
                  className="inline-flex w-36 justify-center rounded-md border-2 border-orange-500 bg-white py-2 px-3 text-sm font-medium text-orange-500 shadow-sm hover:border-white hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                >
                  <img src="/google.svg" className="w-5 h-5" alt="Google logo" />
                  <p className="text-sm font-medium ps-2 text-center">
                    Google
                  </p>
                </button>
              </div>

              <p className="mt-2 text-center text-sm text-gray-600">
                New to Sites60?{" "}
                <a
                  className="font-medium text-orange-500 hover:text-orange-500 hover:opacity-80 underline transition-opacity duration-200"
                  href="/register"
                >
                  Create Account
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
