import React from "react";
const cars = [
  {
    imageUrl: "/insurancegallery.png",
    imageUrl1: "/youtubeinsurance.png",
  },
  {
    imageUrl: "/insurancegallery1.png",
    imageUrl1: "/youtubeinsurance.png",
  },
  {
    imageUrl: "/insurancegallery2.png",
    imageUrl1: "/youtubeinsurance.png",
  },
];
const GalleryInsuranceAgent = () => {
  return (
    <div className="bg-white px-12 pt-12 pb-12 2xl:px-25 2xl:pt-[89px] 2xl:pb-[104px]">
      <div className="relative">
        <div
          className="absolute inset-0 flex justify-start mt-8 pl-[310px]"
          aria-hidden="true"
        >
          <div className="w-full max-w-[147px] border-t-4 border-[#447D98]" />
        </div>
        <div className="relative flex justify-start">
          <h1 className="text-[40px] text-[#447D98] font-bold mb-24">
            Video Gallery
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-12 lg:gap-[40px]">
        {cars.map((car, index) => (
          <div key={index} className="max-w-full w-[547px] h-[307px] relative">
            <div className="w-full relative">
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-auto"
              />
              <img
                src={car.imageUrl1}
                alt={car.name}
                className="absolute right-5 bottom-5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryInsuranceAgent;
