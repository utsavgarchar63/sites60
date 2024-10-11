const featureSections = [
  {
    subtitle: "Insurance Policy",
    iconSrc: "/feature1.png",
  },
  {
    subtitle: "Life Protection",
    iconSrc: "/feature2.png",
  },
  {
    subtitle: "Insurance Claims",
    iconSrc: "/feature3.png",
  },
  {
    subtitle: "Insurance Coverage",
    iconSrc: "/feature4.png",
  },
  {
    subtitle: "Business Plans",
    iconSrc: "/feature5.png",
  },
  {
    subtitle: "Pension Plans",
    iconSrc: "/feature6.png",
  },
];

export default function FeatureInsurance1() {
  return (
    <>
      <div className="px-12 pb-12 pt-12 2xl:pt-0 2xl:px-[114px] 2xl:pb-[90px] ">
        <div className="relative">
          <div
            className="absolute inset-0 flex justify-start mt-8 pl-[285px]"
            aria-hidden="true"
          >
            <div className="w-full max-w-[147px] border-t-4 border-insurancecolor" />
          </div>
          <div className="relative flex justify-start">
            <h2 className="text-[40px] text-insurancecolor font-bold  sm:mb-20">
              Our Services
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-6 gap-4 justify-center ">
          {featureSections.map((feature, index) => (
            <div key={index} className=" rounded-full p-4 sm:p-8 text-center ">
              <div className=" w-full h-full sm:w-[226px] sm:h-[226px] mx-auto mb-2 sm:mb-4 bg-insurancecolor3 flex items-center justify-center rounded-full">
                <img
                  src={feature.iconSrc}
                  alt="Icon"
                  className="w-[79px] h-[69px]  "
                />
              </div>
              <p className="text-[24px] font-semibold text-insurancecolor1  px-10 ">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
