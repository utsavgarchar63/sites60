const stats = [
  { id: 1, name: "+91 9876346543", value: "Phone" },
  { id: 2, name: "8th Street, Santa Barbara, CA", value: "Address" },
  { id: 3, name: "mcknott@gmai.com", value: "Email" },
];
export default function ContactPortfolioLight() {
  return (
    <>
      <div className=" bg-secondarycolor px-12 py-12 2xl:px-25 2xl:py-[132px]">
        <h1 className="text-3xl 2xl:text-ht text-primarycolor">Contact Me</h1>
        <div className="flex flex-col xl:flex-row xl:gap-56">
          <div className="w-full max-w-md  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  ">
            <div className=" ">
              <div className="">
                <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden  text-left  ">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.id}
                      className={`flex flex-col py-20 ${
                        index < 2
                          ? "border-2 border-b-primarycolor border-x-transparent border-t-transparent"
                          : ""
                      }`}
                    >
                      <dt className="text-3xl font-light leading-6 text-cardbackground py-4 ">
                        {stat.name}
                      </dt>
                      <dd className="order-first text-2xl font-light tracking-tight text-primarycolor ">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <hr className="dividers hidden xl:block 2xl:block" />
          <div className=" pt-[114px]   w-full max-w-auto ">
            <form className="gap-6">
              <div className=" w-full  ">
                <div className=" flex mb-10 ">
                  <label
                    className="block text-md lg:text-2xl  mt-10 border-b-2 border-b-primarycolor text-primarycolor  "
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    // placeholder="Enter your Name"

                    className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2  border-b-primarycolor outline-none bg-none py-12  text-sm bg-transparent border-transparent   "
                  />
                </div>
                <div className="mb-10 flex ">
                  <label
                    className="block text-md lg:text-2xl border-b-2 border-b-primarycolor text-primarycolor"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    // placeholder="Enter your email"
                    required
                    className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2 border-b-primarycolor outline-none bg-none py-6 text-sm bg-transparent border-transparent "
                  />
                </div>
                <div className="mb-10 flex ">
                  <label
                    className="block text-md lg:text-2xl border-b-2 border-b-primarycolor text-primarycolor"
                    htmlFor="email"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="text"
                    // placeholder="Enter your email"
                    required
                    className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2 border-b-primarycolor outline-none bg-none py-6 text-sm bg-transparent border-transparent   "
                  />
                </div>
                <div className="mb-10 flex ">
                  <label
                    className="block text-md lg:text-2xl border-b-2 border-b-primarycolor text-primarycolor"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={1}
                    // placeholder="Enter your message"
                    required
                    className="w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] xl:w-[80%] 2xl:[80%] border-b-2 border-b-primarycolor outline-none bg-none py-20 text-sm bg-transparent border-transparent focus:ring-white"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="text-md w-[[200px]] h-[70px] lg:text-2xl font-bold text-primarycolor text-center border-2 border-primarycolor"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
