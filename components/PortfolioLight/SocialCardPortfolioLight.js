import React from "react";
const cars = [
  {
    name: "Ragnor Lothbrok",
    imageUrl: "/card.png",
    icon: "/igred.png",
    description:
      "Gubergren, no sea takimata sanctu consetetur sadipscing elit.",
  },
  {
    name: "Rick Ricker ",
    imageUrl: "/card1.png",
    icon: "/igred.png",
    description:
      "Gubergren, no sea takimata sanctu consetetur sadipscing elit.",
  },
  {
    name: "Peter Parker",
    imageUrl: "/card2.png",
    icon: "/igred.png",
    description:
      "Gubergren, no sea takimata sanctu consetetur sadipscing elit.",
  },
];
const SocialCardPortfolioLight = () => {
  return (
    <div className="bg-primarycolor px-12 pt-12 pb-12 2xl:px-25 2xl:pt-[134px] 2xl:pb-[160px]">
      <h1 className="text-3xl 2xl:text-ht text-secondarycolor font-bold mb-24">
        Instagram Feed
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-12 lg:gap-[40px]">
        {cars.map((car) => (
          <div key={car.id} className="max-w-full  ">
            <div className="px-[60px] pt-[45px] pb-[39px]  bg-cardbackground rounded-t-xl  flex justify-between">
              <div className="font-semibold text-xl 2xl:text-[31px]  text-primarycolor">
                {car.name}
              </div>
              <img src={car.icon} alt={car.name} />
            </div>
            <div className="w-full">
              <img src={car.imageUrl} alt={car.name} className="w-full" />
            </div>
            <div className="py-[60px] pl-[64px] pr-[60px] bg-cardbackground rounded-b-xl ">
              <p className="text-secondarycolor text-2xl font-light ">
                {car.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialCardPortfolioLight;
