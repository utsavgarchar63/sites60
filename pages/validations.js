import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Example() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const [firstName, setFirstname] = useState({
    text: "",
    error: "Enter atleast 2",
  });

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    var firstName = event.target.first_name_nxt.value;

    // var lastName = event.target.lastname.value;
    // var email = event.target.email.value;
    // var firstName = event.target.firstname.value;
    // var firstName = event.target.firstname.value;
    // var firstName = event.target.firstname.value;
    // var firstName = event.target.firstname.value;
    // var firstName = event.target.firstname.value;

    //text- isAlpha
    //text+Numbers - isAlphanumeric
    //Boolean- isBoolean
    //Date- isDate
    //Email- isEmail
    //Phone- isMobilePhone (Pass the locale str)
    //Number- isNumeric
    //StrongPassword- isStrongPassword
    //URL- isURL

    //Sanitizations:
    //escape (Remove end tag, quotes, slashes)
    //

    // alert('A name was submitted: ' + event.target.username.value);

    // console.log(validator.isEmail('foo@bar.com'));
    // console.log(event.target);
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200 max-w-4xl mx-auto pt-10 pb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="firstname"
                    id="first_name_nxt"
                    className={`block w-full bg-transparent py-2 px-4 rounded-md border text-gray-600 placeholder-gray-300 nofocus ${
                      errors.firstName
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-400 focus:border-gray-400"
                    }`}
                    placeholder="you@example.com"
                    {...register("firstName", {
                      required: true,
                      minLength: 4,
                      maxLength: 80,
                    })}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-xs text-red-600" id="firstName-error">
                    Enter you first name
                  </p>
                )}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className={`block w-full bg-transparent py-2 px-4 rounded-md border text-gray-600 placeholder-gray-300 nofocus ${
                    errors.firstName
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-400 focus:border-gray-400"
                  }`}
                  {...register("Country", { required: true })}
                >
                  <option selected disabled value="">
                    == Select Option ==
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                </select>
                {errors.Country && (
                  <p
                    className="mt-2 text-xs text-red-600"
                    id="selectCountry-error"
                  >
                    Select country*
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-notifications">
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                  <div>
                    <div
                      className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                      id="label-notifications"
                    >
                      Push Notifications
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="max-w-lg">
                      <p className="text-sm text-gray-500">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            {...register("radioCheck", { required: true })}
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Everything
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            {...register("radioCheck", { required: true })}
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Same as email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            {...register("radioCheck", { required: true })}
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-nothing"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            No push notifications
                          </label>
                        </div>
                        {errors.radioCheck && (
                          <p
                            className="mt-2 text-xs text-red-600"
                            id="selectCountry-error"
                          >
                            Select one option
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
