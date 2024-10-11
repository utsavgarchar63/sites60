import HeroPortfolioLight3 from "./HeroPortfolioLight3";

export default function TestimonialPortfolioLight() {
  return (
    <>
      <div className="px-12 2xl:px-25 bg-herobg3">
        <HeroPortfolioLight3 />
        <div className="mx-auto 2xl:w-[1720px] border-t  border-primarycolor" />

        {/* <hr class="w-full max-w-[1720px] h-[1px] mx-auto  bg-primarycolor border-0  dark:bg-primarycolor" /> */}
        <section className="relative isolate overflow-hidden bg-herobg3  lg:px-25  2xl:px-25 py-24 sm:py-32 2xl:pb-[154px]   ">
          <div className="mx-auto max-w- lg:max-w-7xl flex justify-between items-start">
            <img
              src="/quote.png"
              alt="quote"
              className="mr-4 sm:mr-6 2xl:mr-32 w-12 h-7 sm:w-[59px] sm:h-[37px]"
            />
            <div className="text-center">
              <blockquote className="text-xl font-semibold  text-secondarycolor sm:text-2xl 2xl:text-12xl sm:leading-9">
                <p>
                  Morbi in sem quis dui placerat ornare. Pellentesque odio nisi
                  euismod in pharetra a ultricies in diam. Sed arcu. Cras
                  consequat. Praesent dapibus neque id cursus faucibus tortor
                  neque egestas auguae eu vulputate magna eros eu erat. Aliquam
                  erat volutpat.
                </p>
              </blockquote>
              <figcaption className="pt-14">
                <div className=" flex items-center justify-center flex-col space-x-3 text-base">
                  <div className="font-light text-primarycolor text-2xl">
                    Herold Robinson
                  </div>
                  <div className="text-2xl font-light text-primarycolor">
                    Times New Magazine
                  </div>
                </div>
              </figcaption>
            </div>
            <img
              src="/quote2.png"
              alt="quote"
              className="ml-4 sm:ml-6 2xl:ml-20 w-12 h-7 sm:w-[59px] sm:h-[37px]"
            />
          </div>
        </section>
      </div>
    </>
  );
}
