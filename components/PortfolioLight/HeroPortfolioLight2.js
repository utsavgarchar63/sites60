export default function HeroPortfolioLight2() {
  return (
    <div className="bg-gray-900 ">
      <div className="relative isolate overflow-hidden h-[85vh] px-12 py-12 2xl:pt-14 2xl:px-25 2xl:py-40">
        <img
          src="/hero2.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-full flex flex-col lg:flex-row  ">
          <div className="w-[46%] 2xl:py-48">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl 2xl:text-ht pb-5">
              Showreel
            </h1>
            <p className="mt-6 text-lg 2xl:text-2xl xl:pr-48 leading-8 text-secondarycolor font-light opacity-1">
              Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              Lorem ipsum dolor sit amet, consetetur sadipscing elit.
            </p>
          </div>
          <div className="w-[64%] relative ">
            {/* Lower image */}
            <img
              src="/hero21.png"
              alt=""
              className="sm:absolute inset-0 -z-10 h-full w-full object-cover mt-[80px]"
            />

            {/* Centered image on top */}
            <div className="absolute inset-0 flex items-center justify-center ">
              <img
                src="/hero22.png"
                alt="Centered Image"
                className="mt-[140px]"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
