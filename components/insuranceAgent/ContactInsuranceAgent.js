export default function ContactInsuranceAgent() {
  return (
    <>
      <div className="flex flex-col-reverse xl:flex-row">
        <div className="bg-[#393A52] xl:w-1/2 px-12 pb-12 pt-12 2xl:px-25 2xl:pb-2 2xl:pt-[93px]">
          <div className="w-full max-w-auto">
            <div className="relative">
              <div
                className="absolute inset-0 flex justify-start mt-6 pl-[[200px]] lg:pl-[304px]"
                aria-hidden="true"
              >
                <div className="w-full max-w-[147px] border-t-4 border-white" />
              </div>
              <div className="relative flex justify-start">
                <h1 className="text-4xl lg:text-5xl font-bold text-white relative">
                  Contact Us
                </h1>
              </div>
            </div>
            <form className="gap-6 mt-12">
              <div className="w-full">
                <div className="flex mb-10">
                  <label
                    className="block text-md lg:text-2xl mt-10 border-b-2 border-b-insurancecolor text-white/80 font-light"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full lg:w-[70%] xl:w-[80%] border-b-2 border-b-white outline-none bg-none py-2 lg:py-12 text-sm bg-transparent border-transparent"
                  />
                </div>
                <div className="mb-10 flex">
                  <label
                    className="block text-md lg:text-2xl border-b-2 border-b-white text-white/80 font-light"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full lg:w-[70%] xl:w-[80%] border-b-2 border-b-white outline-none bg-none py-2 lg:py-6 text-sm bg-transparent border-transparent"
                  />
                </div>
                <div className="mb-10 flex">
                  <label
                    className="block text-md lg:text-2xl border-b-2 border-b-white text-white/80 font-light"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    required
                    className="w-full lg:w-[70%] xl:w-[80%] border-b-2 border-b-white outline-none bg-none py-2 lg:py-6 text-sm bg-transparent border-transparent"
                  />
                </div>
                <div className="mb-10 flex">
                  <label
                    className="block text-md lg:text-2xl border-b-2 border-b-white text-white/80 font-light"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={1}
                    required
                    className="w-full lg:w-[70%] xl:w-[80%] border-b-2 border-b-white outline-none bg-none py-2 lg:py-20 text-sm bg-transparent border-transparent focus:ring-white"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="text-md  lg:text-2xl px-20   lg:w-[[200px]] h-12 lg:h-[70px] text-white font-semibold text-center border-2 border-insurancecolor"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="xl:w-1/2">
          <div className="w-full  h-auto">
            <img
              src="/contactinsurance.png"
              alt="contact-image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
