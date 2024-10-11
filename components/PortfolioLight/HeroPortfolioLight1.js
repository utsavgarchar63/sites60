import React from "react";
const buttonsData = [
  {
    id: 1,
    imageSrc: "/facebooklight.png",
    buttonText: "Facebook",
    bgColor: "bg-primarycolor",
  },
  {
    id: 2,
    imageSrc: "/instagramlight.png",
    buttonText: "Instagram",
    bgColor: "bg-primarycolor",
  },
  {
    id: 2,
    imageSrc: "/youtubelight.png",
    buttonText: "Youtube",
    bgColor: "bg-primarycolor",
  },
];
const HeroPortfolioLight1 = () => {
  return (
    <div className=" bg-secondarycolor min-h-[50vh] px-12 py-12 lg:py-32 lg:px-25 2xl:py-48 flex flex-col lg:flex-row">
      {/* Part 1 - 40% width */}
      <div className="w-40% ">
        <h1 className="text-3xl lg:text-7xl 2xl:text-ht font-bold text-primarycolor">
          12 Yrs Experience
        </h1>
        <p className="text-xl lg:text-3xl 2xl:text-3xl font-light text-primarycolor py-5 xl:pt-13">
          In Film & Theater
        </p>
      </div>

      {/* Part 2 - 60% width */}
      <div className="w-60% lg:pl-25 py-2">
        <h2 className="text-xl font-extrabold text-cardbackground lg:text-3xl 2xl:text-st">
          About Me
        </h2>
        <p className="text-cardbackground font-light xl:pr-20  text-lg lg:text-xl 2xl:text-2xl leading-10 pt-3 py-5 2xl:pt-6 2xl:pb-10">
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dia
          gravida amor
        </p>
        <div className="flex flex-col lg:flex-row mt-4 space-y-6 lg:space-y-0 space-x-2 xl:space-x-6">
          {buttonsData.map((button) => (
            <button
              key={button.id}
              className={`${button.bgColor} text-white p-2 rounded-full flex items-center justify-center space-x-4 py-2 px-4`}
            >
              <img
                src={button.imageSrc}
                alt={`Button Image ${button.id}`}
                className="w-7 h-7"
              />
              <span className="text-white  font-light">
                {button.buttonText}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPortfolioLight1;
