export default function ContactInsuranceAgent2() {
  return (
    <>
      <div className="flex flex-col-reverse">
        <div className="px-4 pb-12 pt-12 lg:px-12 lg:pb-12 lg:pt-12 2xl:px-25 2xl:pb-2 2xl:pt-[93px]">
          <div className="w-full max-w-auto">
            <div className="relative">
              <div
                className="absolute inset-0 flex justify-start mt-6 pl-[50px] lg:pl-[200px] 2xl:pl-[304px]"
                aria-hidden="true"
              >
                <div className="w-full max-w-[147px] border-t-4 border-[#447D98]" />
              </div>
              <div className="relative flex justify-start">
                <h1 className="text-2xl lg:text-4xl 2xl:text-5xl font-bold text-[#447D98]">
                  Contact Us
                </h1>
              </div>
            </div>
            <form className="gap-6 mt-12">
              <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="mb-10 flex w-full">
                  <label
                    className="block text-sm lg:text-2xl border-b-2 border-b-[#707070] text-[#707070] font-light w-1/4 lg:w-auto"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full border-b-2 border-b-[#707070] outline-none bg-transparent py-2 lg:py-6 text-sm lg:text-lg"
                  />
                </div>
                <div className="flex justify-end lg:justify-start">
                  <button
                    type="button"
                    className="text-sm lg:text-2xl px-8 lg:px-20 h-10 lg:h-[70px] text-[#447D98] font-semibold text-center border-2 border-[#447D98]"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
