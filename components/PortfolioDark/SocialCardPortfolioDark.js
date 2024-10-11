import React from "react";
const cards = [
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
const SocialCardPortfolioDark = () => {
  return (
    <div className="bg-primarycolor px-25 pt-[134px] pb-[160px]">
      <h1 className="2xl:text-ht text-secondarycolor font-bold mb-24">
        Instagram Feed
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-12 lg:gap-[40px]">
        {cards.map((card) => (
          <div key={car.id} className="max-w-full  ">
            <div className="px-[60px] pt-[45px] pb-[39px]  bg-cardbackground rounded-t-xl  flex justify-between">
              <div className="font-semibold text-xl 2xl:text-[31px]  text-primarycolor">
                {card.name}
              </div>
              <img src={card.icon} alt={card.name} />
            </div>
            <div className="w-full">
              <img src={card.imageUrl} alt={card.name} className="w-full" />
            </div>
            <div className="py-[60px] pl-[64px] pr-[60px] bg-cardbackground rounded-b-xl">
              <p className="text-secondarycolor text-2xl font-light">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialCardPortfolioDark;
