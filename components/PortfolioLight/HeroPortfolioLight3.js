const stats = [
  { id: 2, name: "Film Roles", value: "129" },
  { id: 3, name: "Awards", value: "23" },
  { id: 4, name: "Feature Films", value: "35" },
];

export default function HeroPortfolioLight3() {
  return (
    <div className="bg-herobg3 ">
      <div className="mx-auto max-w-full px-6 pt-10 pb-10 lg:px-0 lg:pt-[131px] lg:pb-[102.5px]">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-left ">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl 2xl:text-ht">
              Recognitions / Awards
            </h2>
          </div>
          <div className=" flex pt-[66px] flex-col lg:flex-row">
            <div className="">
              <img
                src="/hero3.png"
                alt="hero image"
                className="w-[507px] h-[285px] object-contain"
              />
            </div>
            <div className="2xl:pl-24 pl-0 sm:pl-0  ">
              <dl className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl text-center xl:text-left  sm:grid-cols-2 lg:grid-cols-3 2xl:space-x-24 ">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col pt-6">
                    <dt className="text-sm 2xl:text-st font-extrabold text-primarycolor   ">
                      {stat.name}
                    </dt>
                    <dd className="order-first text-3xl 2xl:text-st font-extrabold tracking-tight text-primarycolor  mb-4">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
