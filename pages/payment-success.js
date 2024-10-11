import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function PaymentSuccess() {

    const router = useRouter();
    
    const gotoDashboard = () => {

        router.push("/")
    }
    
    return (
      <div className="w-full flex justify-center">
        <div className="max-w-screen-md mt-20">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <span
                as="h3"
                className="text-2xl font-medium leading-6 text-gray-900"
              >
                Payment successful
              </span>
              <div className="my-2">
                <p className="text-lg text-gray-500">
                 Time to create some awesome landing pages
                  🥳
                </p>
              </div>
              <button
                type="button"
                className="mt-5 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                onClick={() => gotoDashboard()}
              >
                Go back to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}