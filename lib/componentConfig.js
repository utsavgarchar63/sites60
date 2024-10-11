import { featherIconsList } from "./genericData";

const templates = [
  {
    templateId: "template01",
    primaryColor: "red-200",
    secondaryColor: "black",
    fontFamily: "",
  },
  {
    templateId: "template02",
    primaryColor: "red-200",
    secondaryColor: "black",
  },
  {
    templateId: "template03",
    primaryColor: "red-200",
    secondaryColor: "black",
  },
  {
    templateId: "template04",
    primaryColor: "red-200",
    secondaryColor: "black",
  },
  {
    templateId: "template05",
    primaryColor: "red-200",
    secondaryColor: "black",
  },
  {
    templateId: "template06",
    primaryColor: "red-200",
    secondaryColor: "black",
  },
  {
    templateId: "template07",
    primaryColor: "red-200",
    secondaryColor: "black",
  },
  {
    templateId: "template08",
    primaryColor: "red-200",
    secondaryColor: "black",
  },
];

function createHeaderData(component) {
  let rawData = {
    data: {
      companyName: "My Company",
      logo: "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
      btn1_text: "Click",
      btn1_link: "https://sites60.com",
      btn1_show: true,
      btn2_text: "Button 2",
      btn2_link: "https://sites60.com",
      btn2_show: true,
      navigation: [
        {
          name: "About",
          href: "none",
        },
        {
          name: "Features",
          href: "none",
        },
        {
          name: "Testimonials",
          href: "none",
        },
      ],
    },
  };

  if (component) {
    switch (component) {
      case "headerTemp1":
        rawData.data.navigation.push({
          name: "Contact",
          href: "none",
        });

        return rawData;
        break;
    }
  } else {
    return rawData;
  }
}

function createFooterData() {
  return {
    data: {
      logo: "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
      company: "Your Company Name",
      tagline: "Your awesome tagline",
      navigation: [
        {
          name: "About",
          href: "https://sites60.com",
        },
        {
          name: "Features",
          href: "https://sites60.com",
        },
        {
          name: "Testimonials",
          href: "https://sites60.com",
        },
      ],
      social: [
        {
          name: "Facebook",
          href: "https://sites60.com",
          icon: "https://www.svgrepo.com/show/330401/facebook.svg",
        },
        {
          name: "Instagram",
          href: "https://sites60.com",
          icon: "https://www.svgrepo.com/show/333552/instagram.svg",
        },
        {
          name: "Twitter",
          href: "https://sites60.com",
          icon: "https://www.svgrepo.com/show/349909/twitter.svg",
        },
        {
          name: "LinkedIn",
          href: "https://sites60.com",
          icon: "https://www.svgrepo.com/show/144550/linkedin.svg",
        },
        {
          name: "Pinterest",
          href: "https://sites60.com",
          icon: "https://www.svgrepo.com/show/119056/pinterest.svg",
        },
      ],
    },
  };
}

const iconsList = featherIconsList();
function getRandomIcon() {
  const randomIndex = Math.floor(Math.random() * iconsList.length);

  return iconsList[randomIndex].icon;
}

function createFeatureData() {
  return {
    data: {
      title: "Checkout my awesome features",
      subtitle: "You can know more about my products",
      features: [
        {
          title: "Feature 1",
          description: "Feature 1 is so awesome dude",
          icon: getRandomIcon(),
        },
        {
          title: "Feature 2",
          description: "Feature 2 is so awesome dude",
          icon: getRandomIcon(),
        },
        {
          title: "Feature 3",
          description: "Feature 3 is so awesome dude",
          icon: getRandomIcon(),
        },
        {
          title: "Feature 4",
          description: "Feature 4 is so awesome dude",
          icon: getRandomIcon(),
        },
        {
          title: "Feature 5",
          description: "Feature 5 is so awesome dude",
          icon: getRandomIcon(),
        },
        {
          title: "Feature 6",
          description: "Feature 6 is so awesome dude",
          icon: getRandomIcon(),
        },
      ],
    },
  };
}

function createHeroData() {
  return {
    data: {
      title: "Checkout my awesome features",
      subtitle:
        "You can know more about my products You can know more about my products You can know more about my products",
      image:
        "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/hero-image-1.png",
    },
  };
}

function createGalleryData(component) {
  let rawData = {
    data: {
      heading: "You will love my products",
      subHeading: "Products for all your family members in one place",
      subHeadingShow: false,
      galleryHeadingShow: true,
      gallerySubHeadingShow: true,
      elements: 9,
      minElements: 3,
      maxElements: 9,
      gallery: [
        {
          heading: "Product 1",
          subHeading: "$23.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1583611352296-1e7f6d767659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHwxfHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 2",
          subHeading: "$10.00",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1570900808791-d530855f79e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHwyfHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 3",
          subHeading: "$53.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1570961999607-df226979f156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHwzfHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 4",
          subHeading: "$323.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1590580343530-ea3b7e3dd243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHw0fHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 5",
          subHeading: "$123.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1518318334752-0a61581ac83a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHw1fHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 6",
          subHeading: "$13.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1535118194709-8f09f0050330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHw2fHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 7",
          subHeading: "$13.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1581541471261-150de899a56c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHw3fHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 8",
          subHeading: "$13.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1570961999607-df226979f156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHwzfHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 9",
          subHeading: "$13.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1583611352296-1e7f6d767659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHwxfHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
          heading: "Product 10",
          subHeading: "$13.50",
          description: " ",
          image:
            "https://images.unsplash.com/photo-1535118194709-8f09f0050330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHNlYXJjaHw2fHxhbGx8ZW58MHx8fHwxNjg0MzA2NDk5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        },
      ],
    },
  };

  if (component) {
    switch (component) {
      case "gallery1":
        rawData.data.subHeadingShow = true;
        rawData.data.galleryHeadingShow = false;
        rawData.data.gallerySubHeadingShow = false;
        rawData.data.gallery = rawData.data.gallery.splice(1);
        return rawData;
        break;

      case "galleryTemp2":
        rawData.data.elements = 2;
        rawData.data.maxElements = 2;
        rawData.data.subHeadingShow = true;
        rawData.data.galleryHeadingShow = false;
        rawData.data.gallerySubHeadingShow = false;
        rawData.data.gallery = rawData.data.gallery.splice(8);
        return rawData;
        break;
      case "gallery2Temp2":
        // rawData.data.elements = 2;
        // rawData.data.maxElements = 2;
        // rawData.data.subHeadingShow = true;
        // rawData.data.galleryHeadingShow = false;
        // rawData.data.gallerySubHeadingShow = false;
        rawData.data.gallery = rawData.data.gallery.splice(5);

        return rawData;
        break;
      case "gallery2Yoga":
        rawData.data.gallery = [
          {
            heading: "riya 9",
            subHeading: "$13.50",
            description: " ",
            image:
              "https://storage.googleapis.com/sites60-prod/assets/yogaTemplate/gallery2yoga1.png",
          },
          {
            heading: "Product 9",
            subHeading: "$13.50",
            description: " ",
            image:
              "https://storage.googleapis.com/sites60-prod/assets/yogaTemplate/gallery2yoga2.png",
          },
          {
            heading: "Product 9",
            subHeading: "$13.50",
            description: " ",
            image:
              "https://storage.googleapis.com/sites60-prod/assets/yogaTemplate/gallery2yoga3.png",
          },
        ];

        return rawData;
        break;
    }
  } else {
    return rawData;
  }
}
function createClientData(component) {
  let rawData = {
    data: {
      heading: "TRUSTED BY",
      client: [
        {
          heading: "Product 1",
          subHeading: "$23.50",
          description: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          heading: "Product 2",
          subHeading: "$10.00",
          description: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          heading: "Product 3",
          subHeading: "$53.50",
          description: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          heading: "Product 4",
          subHeading: "$323.50",
          description: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          heading: "Product 5",
          subHeading: "$123.50",
          description: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          heading: "Product 6",
          subHeading: "$13.50",
          description: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
      ],
    },
  };

  if (component) {
    switch (component) {
      case "clientTemp1":
        rawData.data.heading = "";
        rawData.data.client = [];
        rawData.data.client = [
          {
            heading: "Product 6",
            subHeading: "$13.50",
            description: " ",
            image: "/citrix.png",
          },
          {
            heading: "Product 6",
            subHeading: "$13.50",
            description: " ",
            image: "/citrix.png",
          },
          {
            heading: "Product 6",
            subHeading: "$13.50",
            description: " ",
            image: "/citrix.png",
          },
          {
            heading: "Product 6",
            subHeading: "$13.50",
            description: " ",
            image: "/citrix.png",
          },
          {
            heading: "Product 6",
            subHeading: "$13.50",
            description: " ",
            image: "/citrix.png",
          },
          {
            heading: "Product 6",
            subHeading: "$13.50",
            description: " ",
            image: "/citrix.png",
          },
        ];

        return rawData;
        break;
    }
  } else {
    return rawData;
  }
}
function createContactData(component) {
  let rawData = {
    data: {
      heading: "Get in touch",
      subHeading:
        "Fill the below fields so that I can understand your needs better",
      image:
        "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/hero-image-1.png",
      name_show: true,
      email_show: true,
      phone_show: true,
      message_show: true,
      buttonText: "Submit",
      isAddress: false,
      addressHeading: "Address",
      addressContactShow: false,
      addressContact: [
        { text: "name@company.com" },
        { text: "+91 8764523421" },
      ],
    },
  };

  if (component) {
    switch (component) {
      case "contact8":
        rawData.data.company = "Your company";

        rawData.data.clients = {
          heading: "TRUSTED BY",
          client: [
            {
              heading: "Product 1",
              subHeading: "$23.50",
              description: " ",
              image:
                "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
            },
            {
              heading: "Product 2",
              subHeading: "$10.00",
              description: " ",
              image:
                "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
            },
            {
              heading: "Product 3",
              subHeading: "$53.50",
              description: " ",
              image:
                "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
            },
          ],
        };

        return rawData;
        break;

      case "contact8":
        rawData.data.addressContactShow = true;
        return rawData;
        break;
    }
  } else {
    return rawData;
  }
}
function createTestimonialData(component) {
  let rawData = {
    data: {
      title: "Checkout what my customers are saying",
      subtitle: "You can know more about my products",
      testimonials: [
        {
          name: "John Doe",
          designation: "Founder of John Wick Inc",
          content: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          name: "Pan Dunkin",
          designation: "Founder of John Wick Inc",
          content: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          name: "Moore Law",
          designation: "Founder of John Wick Inc",
          content: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          name: "Rachel Green",
          designation: "Founder of John Wick Inc",
          content: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
        {
          name: "Rachel Green",
          designation: "Founder of John Wick Inc",
          content: " ",
          image:
            "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
        },
      ],
    },
  };

  if (component) {
    switch (component) {
      case "testimonialYoga":
        rawData.data.testimonialYoga;

        return rawData;
        break;
      case "testimonial2Temp1":
        rawData.data.testimonials = [];
        rawData.data.testimonials = [
          {
            name: "John Doe",
            designation: "Founder of John Wick Inc",
            content: "fggdfgdfg2fgfdg ",
            image:
              "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
          },
          {
            name: "Pan Dunkin",
            designation: "Founder of John Wick Inc",
            content: "3gfdgf ",
            image:
              "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
          },
          {
            name: "Moore Law",
            designation: "Founder of John Wick Inc",
            content: "5gfdgfd ",
            image:
              "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png",
          },
        ];

        return rawData;
        break;
    }
  } else {
    return rawData;
  }
}

export const EDITPAGE_COMPONENTS_CONFIG = {
  header1: createHeaderData(),
  header2: createHeaderData(),
  header3: createHeaderData(),
  header4: createHeaderData(),
  header5: createHeaderData(),
  header6: createHeaderData(),
  // header7: headerObject,
  headerTemp8: createHeaderData(),
  headerTemp1: createHeaderData("headerTemp1"),
  headerTemp2: createHeaderData(),
  headerTemp4: createHeaderData(),
  headerTemp3: createHeaderData(),
  headerTemp5: createHeaderData(),
  headerTemp6: createHeaderData(),
  headerTemp7: createHeaderData(),
  headerInsuranceAgent: createHeaderData(),

  footer1: createFooterData(),
  footer2: createFooterData(),
  // footer3: createFooterData(),
  footerTemp8: createFooterData(),
  footerTemp4: createFooterData(),
  footerTemp1: createFooterData(),
  footerTemp2: createFooterData(),
  footerTemp3: createFooterData(),
  footerTemp5: createFooterData(),
  footerTemp6: createFooterData(),
  footerTemp7: createFooterData(),

  feature1: createFeatureData(),
  feature2: createFeatureData(),
  feature3: createFeatureData(),
  feature4: createFeatureData(),
  feature5: createFeatureData(),
  feature6: createFeatureData(),
  feature7: createFeatureData(),
  feature8: createFeatureData(),
  feature9: createFeatureData(),
  feature10: createFeatureData(),
  // feature11: createFeatureData(),
  featureTemp8: createFeatureData(),
  featureTemp1: createFeatureData(),
  featureTemp4: createFeatureData(),
  featureTemp2: createFeatureData(),
  featureTemp3: createFeatureData(),
  featureTemp5: createFeatureData(),
  featureTemp6: createFeatureData(),
  featureTemp7: createFeatureData(),
  featureYoga: createFeatureData(),

  hero1: createHeroData(),
  hero2: createHeroData(),
  hero3: createHeroData(),
  hero4: createHeroData(),
  hero5: createHeroData(),
  hero6: createHeroData(),
  hero7: createHeroData(),
  hero8: createHeroData(),
  hero9: createHeroData(),
  hero10: createHeroData(),
  hero11: createHeroData(),
  hero12: createHeroData(),
  hero13: createHeroData(),
  hero14: createHeroData(),
  // hero15: createHeroData(),
  heroTemp3: createHeroData(),
  hero1Temp3: createHeroData(),
  hero2Temp3: createHeroData(),
  hero3Temp3: createHeroData(),

  heroTemp5: createHeroData(),
  hero1Temp5: createHeroData(),
  hero2Temp5: createHeroData(),
  hero3Temp5: createHeroData(),

  heroTemp6: createHeroData(),
  hero1Temp6: createHeroData(),
  hero2Temp6: createHeroData(),
  hero3Temp6: createHeroData(),

  heroTemp7: createHeroData(),
  hero1Temp7: createHeroData(),
  hero2Temp7: createHeroData(),
  hero3Temp7: createHeroData(),

  heroTemp8: createHeroData(),
  hero1Temp8: createHeroData(),
  hero2Temp8: createHeroData(),

  hero2Temp2: createHeroData(),
  hero3Temp2: createHeroData(),
  heroTemp2: createHeroData(),
  hero2Temp1: createHeroData(),
  heroTemp1: createHeroData(),
  hero2Temp4: createHeroData(),
  heroTemp4: createHeroData(),
  heroYoga: createHeroData(),
  hero2Yoga: createHeroData(),
  hero3Yoga: createHeroData(),
  heroInsuranceAgent: createHeroData(),

  gallery1: createGalleryData("gallery1"),
  gallery2: createGalleryData(),
  gallery3: createGalleryData(),
  galleryTemp8: createGalleryData(),
  galleryTemp1: createGalleryData(),
  galleryTemp4: createGalleryData(),
  gallery2Temp4: createGalleryData(),
  galleryTemp3: createGalleryData(),
  galleryTemp5: createGalleryData(),
  gallery1Temp5: createGalleryData(),
  galleryTemp6: createGalleryData(),
  galleryTemp7: createGalleryData(),
  gallery2Temp2: createGalleryData("gallery2Temp2"),
  galleryTemp2: createGalleryData("galleryTemp2"),
  galleryYoga: createGalleryData(),
  gallery2Yoga: createGalleryData("gallery2Yoga"),

  clientTemp2: createClientData(),
  clientTemp1: createClientData("clientTemp1"),
  clientTemp4: createClientData(),
  clientsTemp3: createClientData(),
  clientsTemp5: createClientData(),
  clientsTemp6: createClientData(),
  clientsTemp7: createClientData(),

  // gallery4: Gallery4,
  // gallery5: Gallery5,
  contact1: createContactData(),
  contact2: createContactData(),
  contact3: createContactData(),
  contactTemp1: createContactData(),
  contactTemp4: createContactData(),
  contactTemp2: createContactData(),
  contactTemp3: createContactData(),
  contactTemp5: createContactData(),
  contactTemp6: createContactData(),
  contactTemp7: createContactData(),
  contactYoga: createContactData(),
  contactTemp8: createContactData("contactTemp8"),

  // contact4: Contact4,
  testimonial1: createTestimonialData(),
  testimonial2: createTestimonialData(),
  testimonial3: createTestimonialData(),
  testimonial4: createTestimonialData(),
  testimonial5: createTestimonialData(),
  testimonial6: createTestimonialData(),

  testimonialTemp2: createTestimonialData(),
  // testimonial9: createTestimonialData(),
  // testimonial10: createTestimonialData(),
  // testimonial11: createTestimonialData(),
  testimonialTemp8: createTestimonialData(),
  testimonial2Temp1: createTestimonialData("testimonial2Temp1"),
  testimonialTemp1: createTestimonialData(),
  testimonial2Temp4: createTestimonialData(),
  testimonialTemp4: createTestimonialData(),
  testimonialTemp3: createTestimonialData(),
  testimonialTemp5: createTestimonialData(),
  testimonialTemp6: createTestimonialData(),
  testimonialTemp7: createTestimonialData(),
  testimonialTemp8: createTestimonialData(),
  testimonialYoga: createTestimonialData(),
  testimonial2Yoga: createTestimonialData(),
};
