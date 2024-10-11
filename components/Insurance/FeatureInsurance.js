const products = [
  {
    id: 1,
    name: "Life Insurance",
    imageSrc: "/product.png",
    imageAlt: "Life Insurance",
    desc: "Nihil aliquam aliquid accusantium quo repudiandae. Neque.",
  },
  {
    id: 2,
    name: "Car Insurance",
    imageSrc: "/product1.png",
    imageAlt: "Car Insurance",
    desc: "Labore ipsam quasi quia. Iusto laboriosam accusamus. Dolorem omnis",
  },
  {
    id: 3,
    name: "Home Insurance",
    imageSrc: "/product2.png",
    imageAlt: "Home Insurance",
    desc: "Amet asperiores vero. Voluptatibus eos nulla nihil sunt ut magni numqu",
  },
  {
    id: 4,
    name: "Travel Insurance",
    imageSrc: "/product3.png",
    imageAlt: "Travel Insurance",
    desc: "Optio odit neque saepe odit dolore eius. Cum consectetur quas.",
  },
  {
    id: 5,
    name: "Health Insurance",
    imageSrc: "/product4.png",
    imageAlt: "Health Insurance",
    desc: "Dicta laborum illo qui. Quia asperiores quia maxime exercitatione.",
  },
  {
    id: 6,
    name: "Business Insurance",
    imageSrc: "/product5.png",
    imageAlt: "Business Insurance",
    desc: "Odio cupiditate illum recusandae. Nulla exercitationem veniam moll",
  },
  // More products...
];

export default function FeatureInsurance() {
  return (
    <div className="bg-insurancecolor3">
      <div className="mx-auto max-w-2xl px-12 py-12 sm:px-6 sm:py-24 lg:max-w-full lg:px-25">
        <div className="relative">
          <div
            className="absolute inset-0 flex justify-start mt-8 pl-[285px]"
            aria-hidden="true"
          >
            <div className="w-full max-w-[147px] border-t-4 border-insurancecolor" />
          </div>
          <div className="relative flex justify-start">
            <h2 className="text-[40px] font-bold tracking-tight text-insurancecolor pb-[46px]">
              Our Products
            </h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-[50px]">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-[10px]  lg:aspect-none group-hover:opacity-75 lg:h-90">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-[246px] lg:w-[540px]"
                />
              </div>
              <div className="mt-8 flex justify-between">
                <div>
                  <h3 className="text-[28px] font-bold text-insurancecolor1/90">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 tracking-tight text-2xl text-insurancecolor2/70 font-normal pr-4">
                    {product.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
