import { useState } from "react";
import { ChevronRightIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Verify() {
  const [type, setType] = useState("email"); // phone or email 
  const [allowResend, setAllowResend] = useState(true);
  const [otpLoader, setOtpLoader] = useState(false);

  const notify = (label) => toast(label);


  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  let setOtp = ""

  const handleOTP = (id, e) => {

    const val = e.target.value;

    if (val.length == 1) {
      if (id == "1") {
        setOtp1(val);
        document.getElementById(parseInt(id) + 1).focus();
      }
      if (id == "2") {
        setOtp2(val);
        document.getElementById(parseInt(id) + 1).focus();
      }
      if (id == "3") {
        setOtp3(val);
        document.getElementById(parseInt(id) + 1).focus();
      }
      if (id == "4") {
        setOtp4(val);
        document.getElementById(parseInt(id) + 1).focus();
      }
      if (id == "5") {
        setOtp5(val);
        document.getElementById(parseInt(id) + 1).focus();
      }
      if (id == "6") {
        // HIT API and check if it's valid
        setOtp6(val);
        setOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
      }

    }

    else {
      if (id == "1") {
        setOtp1("");
      }
      if (id == "2") {
        setOtp2("");
        document.getElementById(parseInt(id) - 1).focus();
      }
      if (id == "3") {
        setOtp3("");
        document.getElementById(parseInt(id) - 1).focus();
      }
      if (id == "4") {
        setOtp4("");
        document.getElementById(parseInt(id) - 1).focus();
      }
      if (id == "5") {
        setOtp5("");
        document.getElementById(parseInt(id) - 1).focus();
      }
      if (id == "6") {
        setOtp6("");
        document.getElementById("5").focus();
      }
    }


  }


  async function resendEmail() {

    const res = await fetch("/api/resendEmail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("Data>>>>>", data);

    if (data.success == true) {
      setAllowResend(false);
      notify("Verification Email Sent to your Inbox")
    }
    else {
      notify("Verification Email Sending Failed 😢");
    }

  }


  function handleNewAcc() {
    signOut();
    window.location.href = "/register";
  }
  return (
    <>
      <ToastContainer autoClose={5000} />
      <div>

        {type == "email" && (
          <div className="flex min-h-full h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="main-logo.png"
                  alt="sites60"
                />

                {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <LockClosedIcon className="w-6 h-6 text-green-600" />
                </div> */}
                <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 mt-8">
                  Verify your email
                </h2>
                <p className="mt-5 text-center text-lg text-gray-400">
                  Do check your spam folder incase its not in your inbox.
                </p>
                <p className="mt-5 text-center text-lg text-gray-400">
                  If you haven't received the verification email, please consider <span
                    className="text-orange-500 cursor-pointer hover:text-orange-600 hover:opacity-80 transition-opacity duration-200"
                    onClick={() => handleNewAcc()}
                  >
                    Creating an account
                  </span>{" "}
                  using another valid email address.
                </p>

                {allowResend == true && (
                  <div className="flex justify-center text-center mt-5">
                    <div
                      onClick={() => resendEmail()}
                      className="flex items-center text-orange-500 cursor-pointer hover:text-orange-600 transition-colors duration-200"
                    >
                      <span className="font-bold hover:underline">
                        Resend Verification Email
                      </span>
                      <ChevronRightIcon className="w-6 h-6 font-bold hover:text-orange-600 transition-colors duration-200" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {type == "phone" && (
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="logo.svg"
                  alt="OKQR"
                />

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <LockClosedIcon className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
                  Verify your Phone
                </h2>

                <p className="mt-5 text-center text-md text-gray-600">
                  Enter the otp received on +91 ******876
                </p>

                <br />

                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="1"
                    value={otp1}
                    onChange={(e) => handleOTP("1", e)}
                    maxlength="1"
                  />

                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="2"
                    value={otp2}
                    onChange={(e) => handleOTP("2", e)}
                    maxlength="1"
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="3"
                    value={otp3}
                    onChange={(e) => handleOTP("3", e)}
                    maxlength="1"
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="4"
                    value={otp4}
                    onChange={(e) => handleOTP("4", e)}
                    maxlength="1"
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="5"
                    value={otp5}
                    onChange={(e) => handleOTP("5", e)}
                    maxlength="1"
                  />
                  <input
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="6"
                    value={otp6}
                    onChange={(e) => handleOTP("6", e)}
                    maxlength="1"
                  />
                </div>

                {otpLoader == false && (
                  <div className="flex justify-center text-center mt-5">
                    <a className="flex items-center text-orange-600 hover:text-orange-700 cursor-pointer">
                      <span className="font-bold">Resend OTP</span>
                      <ChevronRightIcon className="w-6 h-6 font-bold" />
                    </a>
                  </div>
                )}

                {otpLoader == true && (
                  <div className="flex justify-center text-center mt-5">
                    <button
                      type="button"
                      class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-orange-500 hover:bg-orange-400 transition ease-in-out duration-150 cursor-not-allowed"
                      disabled=""
                    >
                      <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying OTP...
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
