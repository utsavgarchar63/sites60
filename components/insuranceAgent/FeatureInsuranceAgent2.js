import React from "react";
const cars = [
  {
    imageUrl: "/insuranceinsta.png",
    icon: "/igred.png",
    description:
      "Dolorem voluptatem non quaerat qui voluptas iure dicta repellat minima",
  },
  {
    imageUrl: "/insuranceinsta2.png",
    icon: "/igred.png",
    description:
      "Iusto corrupti dolorum ullam veritatis odio quae alias nisi laudantium lorem",
  },
  {
    imageUrl: "/insuranceinsta3.png",
    icon: "/igred.png",
    description:
      "Ut sed nesciunt sequi non quis non provident natus harum fugit delectus",
  },
  {
    imageUrl: "/insuranceinsta4.png",
    icon: "/igred.png",
    description:
      "Amet iusto autem voluptatem porro omnis necessitatibus ipsam repellendus",
  },
];
const FeatureInsuranceAgent2 = () => {
  return (
    <div className="bg-white px-12 pt-12 pb-12 2xl:px-25 2xl:pt-[89px] 2xl:pb-[104px]">
      <div className="relative">
        <div
          className="absolute inset-0 flex justify-start mt-8 pl-[355px]"
          aria-hidden="true"
        >
          <div className="w-full max-w-[147px] border-t-4 border-[#447D98]" />
        </div>
        <div className="relative flex justify-start">
          <h1 className="text-[40px]  text-[#447D98] font-bold mb-24">
            Instagram Feed
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-12 lg:gap-[57px]">
        {cars.map((car) => (
          <div key={car.id} className="max-w-full w-[387px] h-auto  ">
            <div className="px-4 py-4 2xl:px-[170px] 2xl:py-[41px]   bg-insurancecolor3 rounded-t-xl  flex justify-center">
              <img src={car.icon} alt={car.name} />
            </div>
            <div className="w-full">
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-auto"
              />
            </div>
            <div className="text-center px-4 2xl:px-[45px] pt-4 2xl:pt-[49px] pb-4 2xl:pb-[30px] bg-insurancecolor3 rounded-b-xl">
              <p className="2xl:w-[297px] 2xl:h-[159px] text-insurancecolor2/80 text-2xl font-normal">
                {car.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureInsuranceAgent2;
