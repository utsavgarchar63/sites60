import React from "react";

const galleryImages = [
  "gallery1.png",
  "gallery2.png",
  "gallery3.png",
  "gallery4.png",
  "gallery5.png",
];

export default function GalleryPortfolioLight() {
  return (
    <div className="bg-secondarycolor pt-[131px] pb-[160px]">
      <div className="max-w-full mx-auto ">
        <h1 className="text-3xl font-bold text-left pb-20 text-primarycolor 2xl:text-ht px-25">
          Portfolio{" "}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {galleryImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className={`w-[384px] h-[620px] mx-auto object-cover ${
                  index === 1 || index === 3 ? "mt-32" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
