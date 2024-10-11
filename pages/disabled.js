import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function Disable() {
    
  return (
    <>
      <div>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img className="mx-auto h-12 w-auto" src="logo.svg" alt="OKQR" />

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <LockClosedIcon className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
                Account Suspended
              </h2>

              <p className="mt-5 text-center text-md text-gray-600">
                Talk to our support team - support@okqr.com 
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
