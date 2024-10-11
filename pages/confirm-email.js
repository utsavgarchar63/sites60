import { ChevronRightIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Verify() {
  const [loader, setLoader] = useState(true);
  const [valid, setValid] = useState(false);
  const [allowResend, setAllowResend] = useState(false);
  const [completed, setCompleted] = useState(false);


  const router = useRouter();

  let key = router.query.key

  useEffect(() => {

    if (key) {
      console.log("Key>>>>>", key);
      verifyEmail();
    }
  }, [router]);

  // verifyEmail()

  async function verifyEmail() {

    console.log("Key>>>>>", key);
    const res = await fetch("/api/verifyEmail?key=" + key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Await for data for any desirable next steps
    const data = await res.json();

    if (data.success == false || data.status == 400 || data.status == 500) {
      setLoader(false);
      setValid(false);
    } else {

      if (data.expired == true) {
        setLoader(false);
        setValid(true);
        setAllowResend(true)
      }
      else {
        setCompleted(true)
      }

    }
  }

  async function resendEmail() {

    await fetch("/api/resendEmail?key=" + key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div>
      <div className="flex min-h-full h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-5">
          <div>
            <img className="mx-auto h-12 w-auto" src="main-logo.png" alt="sites60" />
            <h2 className="text-center flex items-center justify-center text-4xl font-bold tracking-tight text-gray-900 mt-8">
              Email Verification {" "}<div className="mx-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <LockClosedIcon className="w-6 h-6 text-green-600" />
              </div>
            </h2>
          </div>
          {completed == true && (
            <div>
              <div className="flex justify-center text-center">
                <span className="font-bold">Email Verified Success</span>
              </div>
              <a className="flex justify-center text-center mt-5" href="/login">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border-2 border-orange-500 bg-white px-3 py-2 text-sm font-medium text-orange-500 shadow-sm hover:bg-orange-500 hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                >
                  Login to Continue
                </button>
              </a>

            </div>
          )}

          {loader == false && valid == false && (
            <div>
              <div className="flex justify-center text-center">
                <a className="flex items-center gray-900">
                  <span className="font-bold">
                    Verification Link Invalid. Please check your email.
                  </span>
                </a>
              </div>
            </div>
          )}

          {loader == false && valid == true && allowResend == true && (
            <div>
              <div className="flex justify-center text-center">
                <a className="flex items-center gray-900">
                  <span className="font-bold">
                    Verification Link Expired. Click the button below 👇
                  </span>
                </a>
              </div>

              <div className="flex justify-center text-center mt-5">
                <div
                  onClick={() => resendEmail()}
                  className="flex items-center text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  <span className="font-bold">Resend Verification Email</span>
                  <ChevronRightIcon className="w-6 h-6 font-bold" />
                </div>
              </div>
            </div>
          )}

          {loader == true &&
            completed == false &&
            (
              <div className="flex justify-center text-center mt-5">
                <button
                  type="button"
                  className="w-full bg-orange-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  disabled=""
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Verifying Email...
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
