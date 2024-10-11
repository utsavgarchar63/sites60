export default function HeroInsurance1() {
  return (
    <>
      <div className=" contact-body px-12 py-12 2xl:py-0 2xl:px-25   ">
        <div class="2xl:max-w-[1720px] 2xl:max-h-[707px] mx-auto flex flex-col sm:flex-row">
          <div class="w-full sm:w-1/2">
            <img src="/insurancehero.png" alt="Image" class="w-full h-full" />
          </div>
          <div class="w-full sm:w-1/2 px-6 py-6 2xl:px-25 2xl:py-[180px] bg-insurancecolor rounded-b-xl sm:rounded-b 2xl:rounded-r-xl">
            <div className="relative">
              <div
                className="absolute inset-0 flex justify-start mt-8 pl-[224px]"
                aria-hidden="true"
              >
                <div className="w-full max-w-[147px] border-t-4 border-white" />
              </div>
              <div className="relative flex justify-start">
                <h2 class="text-[40px] font-semibold text-white pb-[41px]">
                  About Me
                </h2>
              </div>
            </div>
            <h3 class="text-2xl  text-white/70 font-light pb-[41px]">
              Chasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus. Nam nulla
              quam, gravida non, commodo a, sodales sit amet, nisi.
            </h3>
            <p class="text-2xl text-white/70 font-light">
              Avulputate sem tristique cursus. Nam nulla quam, gravida non,
              commodo a, sodale.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
