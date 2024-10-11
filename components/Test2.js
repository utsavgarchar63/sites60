import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";
import Header4 from "../components/Header4";
import Header5 from "../components/Header5";
import Header6 from "../components/Header6";
import Footer1 from "../components/Footer1";
import Footer2 from "../components/Footer2";
import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";
import Hero3 from "../components/Hero3";
import Hero4 from "../components/Hero4";
import Hero5 from "../components/Hero5";
import Hero6 from "../components/Hero6";
import Hero7 from "../components/Hero7";
import Hero8 from "../components/Hero8";
import Hero9 from "../components/Hero9";
import Hero10 from "../components/Hero10";
import Hero11 from "../components/Hero11";
import Hero12 from "../components/Hero12";
import Hero13 from "../components/Hero13";
import Hero14 from "../components/Hero14";
import Feature1 from "../components/Feature1";
import Feature2 from "../components/Feature2";
import Feature3 from "../components/Feature3";
import Feature4 from "../components/Feature4";
import Feature5 from "../components/Feature5";
import Feature6 from "../components/Feature6";
import Feature7 from "../components/Feature7";
import Feature8 from "../components/Feature8";
import Feature9 from "../components/Feature9";
import Feature10 from "../components/Feature10";
import Testimonial1 from "../components/Testimonial1";
import Testimonial2 from "../components/Testimonial2";
import Testimonial3 from "../components/Testimonial3";
import Testimonial4 from "../components/Testimonial4";
import Testimonial5 from "../components/Testimonial5";
import Testimonial6 from "../components/Testimonial6";
import Gallery1 from "../components/Gallery1";
import Gallery2 from "../components/Gallery2";
import Gallery3 from "../components/Gallery3";
import Contact1 from "../components/Contact1";
import Contact2 from "../components/Contact2";
import { MixpanelEvent } from "../lib/trackEventFrontend";



import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { XMarkIcon } from "@heroicons/react/24/outline";

const siteFonts = [
  { id: 1, name: "Raleway" },
  { id: 2, name: "Montserrat" },
  { id: 3, name: "Poppins" },
  { id: 4, name: "Inter" },
  { id: 5, name: "FontSans" },
  { id: 6, name: "Ubuntu" },
  { id: 7, name: "Lato" },
];

const themeColor = [
  {
    name: "indigo",
    bgColor: "bg-indigo-500",
    selectedColor: "text-indigo-500",
    borderColor: "border-indigo-100",
    gradientBg: "bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-400",
  },
  {
    name: "slate",
    bgColor: "bg-slate-500",
    selectedColor: "text-slate-500",
    borderColor: "border-slate-100",
    gradientBg: "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-400",
  },
  {
    name: "red",
    bgColor: "bg-red-500",
    selectedColor: "text-red-500",
    borderColor: "border-red-100",
    gradientBg: "bg-gradient-to-r from-red-700 via-red-600 to-red-400",
  },
  {
    name: "sky",
    bgColor: "bg-sky-500",
    selectedColor: "text-sky-500",
    borderColor: "border-sky-100",
    gradientBg: "bg-gradient-to-r from-sky-700 via-sky-600 to-sky-400",
  },
  {
    name: "purple",
    bgColor: "bg-purple-500",
    selectedColor: "text-purple-500",
    borderColor: "border-purple-100",
    gradientBg: "bg-gradient-to-r from-purple-700 via-purple-600 to-purple-400",
  },
  {
    name: "blue",
    bgColor: "bg-blue-500",
    selectedColor: "text-blue-500",
    borderColor: "border-blue-100",
    gradientBg: "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400",
  },
  {
    name: "green",
    bgColor: "bg-green-500",
    selectedColor: "text-green-500",
    borderColor: "border-green-100",
    gradientBg: "bg-gradient-to-r from-green-700 via-green-600 to-green-400",
  },
  {
    name: "yellow",
    bgColor: "bg-yellow-500",
    selectedColor: "text-yellow-500",
    borderColor: "border-yellow-100",
    gradientBg: "bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-400",
  },
  {
    name: "orange",
    bgColor: "bg-orange-500",
    selectedColor: "text-orange-500",
    borderColor: "border-orange-100",
    gradientBg: "bg-gradient-to-r from-orange-600 via-orange-600 to-orange-400",
  },
];

export default function CustomerView({loadingDivVal}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favicon, setFavicon] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedColor, setSelectedColor] = useState(themeColor[1]);
  const [siteId, setSiteId] = useState("");
  const [siteKey, setSiteKey] = useState("");
  const [backUrl, setBackUrl] = useState("");
  const [selectedFont, setSelectedFont] = useState(siteFonts[0]);

  useEffect(() => {
     

    getInfo();
  }, []);

  const getInfo = async (key) => {
     

    let data =  {
      "success": true,
      "smartsiteInfo": {
          "_id": "645e0a98e938142affa9c714",
          "user_id": "645de2d70d3b7fbcec81d1db",
          "key": "YBq8q9Vn8dPW",
          "status": "unpublished",
          "title": "Your Website",
          "favicon": "",
          "sections": "[{\"data\":{\"logo\":\"https://storage.googleapis.com/sites60-prod/15-11-59-e9447a53-c3a1-4ecb-b93f-8eeb007da6e0.jpeg\",\"btn1_text\":\"Button 1\",\"btn1_link\":\"https://sites60.com\",\"btn1_show\":false,\"btn2_text\":\"Button 2\",\"btn2_link\":\"https://sites60.com\",\"btn2_show\":false,\"navigation\":[{\"name\":\"About\",\"href\":\"none\"},{\"name\":\"Features\",\"href\":\"none\"},{\"name\":\"Testimonials\",\"href\":\"none\"}]},\"section_id\":\"header6\",\"key\":\"mbYhriDyx0gD\"},{\"data\":{\"title\":\"Feed the Mind, Body and Soul with Healthy Food\",\"subtitle\":\"Eating Well, Eating Right to Feel Good and Live Joyfully\",\"image\":\"https://images.unsplash.com/photo-1646312299698-7e6cd323a188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1MjZ8&ixlib=rb-4.0.3&q=80&w=1080\"},\"section_id\":\"hero13\",\"key\":\"YC5drMQ7Zgvz\"},{\"data\":{\"title\":\"Our Team\",\"subtitle\":\"People behind the Food\",\"testimonials\":[{\"name\":\"Sarah Smith\",\"designation\":\"Head Chef\",\"content\":\"Sarah has been with us since the very beginning and has always been passionate about food. She spends most of her time experimenting and coming up with new recipes for our dishes.\",\"image\":\"https://images.unsplash.com/photo-1624880357913-a8539238245b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1NDN8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"name\":\"John Doe\",\"designation\":\"Kitchen Manager\",\"content\":\"John is the heart and soul of the kitchen. He is always looking for ways to improve our dishes and makes sure that the kitchen runs smoothly at all times.\",\"image\":\"https://images.unsplash.com/photo-1601509876296-aba16d4c10a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1NDN8&ixlib=rb-4.0.3&q=80&w=1080\"}]},\"section_id\":\"testimonial5\",\"key\":\"Twnn8hWLBppg\"},{\"data\":{\"title\":\"Features\",\"subtitle\":\"Here are some of the features this website offers.\",\"features\":[{\"title\":\"Delicious Recipes\",\"description\":\"We provide delicious recipes that allow you to make the most out of your ingredients.\",\"icon\":\"core/menu\"},{\"title\":\"Nutrition Education\",\"description\":\"Our nutrition educators provide up-to-date nutritional information that helps you understand nutrition and make healthier food choices.\",\"icon\":\"core/menu\"},{\"title\":\"Cooking Tips and Techniques\",\"description\":\"We have useful cooking tips and techniques that help you cut down on time and use food efficiently.\",\"icon\":\"core/menu\"}]},\"section_id\":\"feature10\",\"key\":\"9x7OYyUbZ6YO\"},{\"data\":{\"title\":\"Welcome To My Food Blog!\",\"subtitle\":\"Food Is Life\",\"image\":\"https://images.unsplash.com/photo-1550758103-d83e024d38ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njh8&ixlib=rb-4.0.3&q=80&w=1080\"},\"section_id\":\"hero14\",\"key\":\"eZpjavJEJIM8\"},{\"data\":{\"heading\":\"Checkout my products\",\"subHeading\":\"\",\"gallery\":[{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1552485059-ea981fd8a2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1650965093730-3d9700615c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1613635469708-524a5f9b056e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1638147848624-c2ed92925528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1522573089570-b0a8e61bdfe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1631826543855-45ec2720931b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1449445894928-d3280a99ee12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1524947996703-8b011401c9e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1609770923130-bb0fe6ed2b29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://images.unsplash.com/photo-1534268192-55179198905a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ1Njl8&ixlib=rb-4.0.3&q=80&w=1080\"}]},\"section_id\":\"gallery2\",\"key\":\"mfcRigz9PoXr\"},{\"data\":{\"title\":\"What our customers say about us ☺\",\"subtitle\":\"See what our customers have to say about their delicious experience\",\"testimonials\":[{\"name\":\"John Smith\",\"designation\":\"Chef of Roly's Cafe, New York\",\"content\":\"The range of food available through this website is fantastic. I've never had a meal that didn't exceed my expectations. I'm faithful customer now !\",\"image\":\"https://images.unsplash.com/photo-1649894223644-68ee3aead021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ2OTZ8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"name\":\"Jimmy Alvarez\",\"designation\":\"Pastry Chef at Sugar & Spice, Texas\",\"content\":\"This website has everything I need for making my delicious desserts. The quality of the food is second to none. Highly recommended!\",\"image\":\"https://images.unsplash.com/photo-1652285033242-17b9f485ce27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ2OTZ8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"name\":\"Andrew Blentz\",\"designation\":\"Head Chef at Chez's, Miami\",\"content\":\"I'm always on the lookout for new ingredients, and this website never fails to deliver. The quality, freshness and variety of food items is simply incredible!\",\"image\":\"https://images.unsplash.com/photo-1651687965960-73fe31a2940a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ2OTZ8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"name\":\"Jessica Evans\",\"designation\":\"Executive Chef at Frick's, Los Angeles\",\"content\":\"It can be a challenge to find the right ingredients at the right price. I'm always impressed by the prices and the outstanding flavor of the food on this website.\",\"image\":\"https://images.unsplash.com/photo-1668485096201-a31dbfbbb38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ2OTZ8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"name\":\"Amy Scott\",\"designation\":\"Head Chef of Addy's Restaurant, Washington\",\"content\":\"I'm definitely going to be a dedicated customer! Food delivery is prompt and their customer service is first class. Love this website!\",\"image\":\"https://images.unsplash.com/photo-1524242635868-52c4137f3ccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ2OTZ8&ixlib=rb-4.0.3&q=80&w=1080\"},{\"name\":\"Abby Wilson\",\"designation\":\"Chef of the Golden House, Philadelphia\",\"content\":\"The produce is always fresh and delivered in a timely manner. I look forward to using this website for years to come!\",\"image\":\"https://images.unsplash.com/photo-1547731034-4c72e102212c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODQ2OTZ8&ixlib=rb-4.0.3&q=80&w=1080\"}]},\"section_id\":\"testimonial6\",\"key\":\"jYRcdyvXmUUb\"},{\"data\":{\"heading\":\"Checkout my products\",\"subHeading\":\"\",\"gallery\":[{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://www.svgrepo.com/show/353825/google-pay.svg\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://www.svgrepo.com/show/353825/google-pay.svg\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://www.svgrepo.com/show/353825/google-pay.svg\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://www.svgrepo.com/show/353825/google-pay.svg\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://www.svgrepo.com/show/353825/google-pay.svg\"},{\"heading\":\"\",\"subHeading\":\"\",\"description\":\"\",\"image\":\"https://www.svgrepo.com/show/353825/google-pay.svg\"}]},\"section_id\":\"gallery3\",\"key\":\"ck3dLAeh5pHj\"},{\"data\":{\"heading\":\"Get in touch\",\"subHeading\":\"Fill the below fields so that I can understand your needs better\",\"image\":\"https://storage.googleapis.com/anirudhtest-e263d.appspot.com/hero-image-1.png\",\"name_show\":true,\"email_show\":true,\"phone_show\":true,\"message_show\":true,\"buttonText\":\"Submit\"},\"section_id\":\"contact2\",\"key\":\"GH6vTP3zsaor\"},{\"data\":{\"logo\":\"https://storage.googleapis.com/sites60-prod/15-11-59-e9447a53-c3a1-4ecb-b93f-8eeb007da6e0.jpeg\",\"company\":\"fsdf\",\"tagline\":\"Your awesome tagline\",\"navigation\":[{\"name\":\"About\",\"href\":\"https://sites60.com\"},{\"name\":\"Features\",\"href\":\"https://sites60.com\"},{\"name\":\"Testimonials\",\"href\":\"https://sites60.com\"}],\"social\":[{\"name\":\"Facebook\",\"href\":\"https://sites60.com\",\"icon\":\"https://www.svgrepo.com/show/330401/facebook.svg\"},{\"name\":\"Instagram\",\"href\":\"https://sites60.com\",\"icon\":\"https://www.svgrepo.com/show/333552/instagram.svg\"},{\"name\":\"Twitter\",\"href\":\"https://sites60.com\",\"icon\":\"https://www.svgrepo.com/show/349909/twitter.svg\"},{\"name\":\"LinkedIn\",\"href\":\"https://sites60.com\",\"icon\":\"https://www.svgrepo.com/show/144550/linkedin.svg\"},{\"name\":\"Pinterest\",\"href\":\"https://sites60.com\",\"icon\":\"https://www.svgrepo.com/show/119056/pinterest.svg\"}]},\"section_id\":\"footer1\",\"key\":\"dOzyXOeQpzCg\"}]",
          "color": "\"{name: 'indigo', bgColor: 'bg-indigo-500', selectedColor: 'ring-indigo-500'}\"",
          "font": "Raleway"
      }
  }

    // const data = await res.json();
  

    if (data.smartsiteInfo.font) {
      var index = siteFonts.findIndex(
        (obj) => obj.name == data.smartsiteInfo.font
      );
      setSelectedFont(siteFonts[index]);
    }

    if (data.smartsiteInfo.sections) {
      let newObj = JSON.parse(data.smartsiteInfo.sections);
      setSections(newObj);
      console.log("newObj>>>>", newObj);
      console.log("Sections>>>>", sections);
      setTitle(data.smartsiteInfo.title);
      setDescription(data.smartsiteInfo.description);

       if (data.smartsiteInfo.color) {
         let newObj2 = JSON.parse(JSON.stringify(data.smartsiteInfo.color));
         let color = JSON.parse(newObj2).name;
         let index2 = themeColor.findIndex((x) => x.name == color);
         if (index2 != -1) {
           setSelectedColor(themeColor[index2]);
         }
       }
      setFavicon(data.smartsiteInfo.favicon);
    }
  };

  const divRefs = {
    header1: useRef(null),
    header2: useRef(null),
    header3: useRef(null),
    header4: useRef(null),
    header5: useRef(null),
    header6: useRef(null),
    hero1: useRef(null),
    hero2: useRef(null),
    hero3: useRef(null),
    hero4: useRef(null),
    hero5: useRef(null),
    hero6: useRef(null),
    hero7: useRef(null),
    hero8: useRef(null),
    hero9: useRef(null),
    hero10: useRef(null),
    hero11: useRef(null),
    hero12: useRef(null),
    hero13: useRef(null),
    hero14: useRef(null),

    feature1: useRef(null),
    feature2: useRef(null),
    feature3: useRef(null),
    feature4: useRef(null),
    feature5: useRef(null),
    feature6: useRef(null),
    feature7: useRef(null),
    feature8: useRef(null),
    feature9: useRef(null),
    feature10: useRef(null),

    testimonial1: useRef(null),
    testimonial2: useRef(null),
    testimonial3: useRef(null),
    testimonial4: useRef(null),
    testimonial5: useRef(null),
    testimonial6: useRef(null),

    gallery1: useRef(null),
    gallery2: useRef(null),
    gallery3: useRef(null),

    contact1: useRef(null),
    contact2: useRef(null),

    footer1: useRef(null),
    footer2: useRef(null),

  };
  const scrollToDiv = (ref) => {
    
     if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }

  };

  const [loadingDiv, setLoadingDiv] = useState( );

  useEffect(() => {
     

    // if (selectedId && selectedId.includes("footer")) {
    //   scrollToDiv(divRefs.footer)
    // }
    // if (selectedId && selectedId.includes("header")) {
    //   scrollToDiv(divRefs.header)
    // }

    // if (selectedId && selectedId == "gallery1") {
    //   scrollToDiv(divRefs.gallery1)
    // }
    // if (selectedId && selectedId == "gallery2") {
    //   scrollToDiv(divRefs.gallery2)
    // }
    // if (selectedId && selectedId == "gallery3") {
    //   scrollToDiv(divRefs.gallery3)
    // }

if(loadingDiv){
  
  switch(loadingDiv) {
    case "gallery1":
      scrollToDiv(divRefs.gallery1);
      break;
    case "gallery2":
      scrollToDiv(divRefs.gallery2);
      break;
    case "gallery3":
      scrollToDiv(divRefs.gallery3);
      break;
    case ("footer1"):
      scrollToDiv(divRefs.footer1);
      case ("footer2"):
        scrollToDiv(divRefs.footer2);
      break;
    case ("header1"):
      scrollToDiv(divRefs.header1);
    case ("header2"):
      scrollToDiv(divRefs.header2);
    case ("header3"):
      scrollToDiv(divRefs.header3);
      case ("header4"):
      scrollToDiv(divRefs.header4);
    case ("header5"):
      scrollToDiv(divRefs.header5);
    case ("header6"):
      scrollToDiv(divRefs.header6);
      break;
      case "hero1":
        scrollToDiv(divRefs.hero1);
        break;
      case "hero2":
        scrollToDiv(divRefs.hero2);
        break;
      case "hero3":
        scrollToDiv(divRefs.hero3);
        break;
        case "hero4":
        scrollToDiv(divRefs.hero4);
        break;
      case "hero5":
        scrollToDiv(divRefs.hero5);
        break;
      case "hero6":
        scrollToDiv(divRefs.hero6);
        break;
        case "hero7":
        scrollToDiv(divRefs.hero7);
        break;
      case "hero8":
        scrollToDiv(divRefs.hero8);
        break;
      case "hero9":
        scrollToDiv(divRefs.hero9);
        break;
        case "hero10":
        scrollToDiv(divRefs.hero10);
        break;
      case "hero11":
        scrollToDiv(divRefs.hero11);
        break;
      case "hero12":
        scrollToDiv(divRefs.hero12);
        break;
        case "hero13":
        scrollToDiv(divRefs.hero13);
        break;
      case "hero14":
        scrollToDiv(divRefs.hero14);
        break;
      
        case "feature1":
          scrollToDiv(divRefs.feature1);
          break;
        case "feature2":
          scrollToDiv(divRefs.feature2);
          break;
        case "feature3":
          scrollToDiv(divRefs.feature3);
          break;
          case "feature4":
          scrollToDiv(divRefs.feature4);
          break;
        case "feature5":
          scrollToDiv(divRefs.feature5);
          break;
        case "feature6":
          scrollToDiv(divRefs.feature6);
          break;
          case "feature7":
          scrollToDiv(divRefs.feature7);
          break;
        case "feature8":
          scrollToDiv(divRefs.feature8);
          break;
        case "feature9":
          scrollToDiv(divRefs.feature9);
          break;
          case "feature10":
          scrollToDiv(divRefs.feature10);
          break;

          case "testimonial1":
          scrollToDiv(divRefs.testimonial1);
          break;
        case "testimonial2":
          scrollToDiv(divRefs.testimonial2);
          break;
        case "testimonial3":
          scrollToDiv(divRefs.testimonial3);
          break;
          case "testimonial4":
          scrollToDiv(divRefs.testimonial4);
          break;
        case "testimonial5":
          scrollToDiv(divRefs.testimonial5);
          break;
        case "testimonial6":
          scrollToDiv(divRefs.testimonial6);
          break;

          case "contact1":
            scrollToDiv(divRefs.contact1);
            break;
          case "contact2":
            scrollToDiv(divRefs.contact2);
            break;

    default:
      break;
  }

}
   

  }, [loadingDiv]);


  useEffect(() => {

    console.log( loadingDivVal, "loadingDivVal")
    if (loadingDivVal) {

       
          setLoadingDiv(loadingDivVal);

        
        
    }
}, [loadingDivVal]);


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        {favicon.length > 0 && (
          <link rel="icon" type="image/x-icon" href={favicon} />
        )}
      </Head>

      <div>
        

        {sections &&
          sections.map((item) => (
            
            <div key={item.key}>
              {item.section_id == "header1" && (
                <Header1
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  siteKey={siteKey}
                  ref={divRefs.header1}
                ></Header1>
              )}
              {item.section_id == "header2" && (
                <Header2
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  siteKey={siteKey}
                  ref={divRefs.header2}
                ></Header2>
              )}
              {item.section_id == "header3" && (
                <Header3
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  siteKey={siteKey}
                  ref={divRefs.header3}
                ></Header3>
              )}

              {item.section_id == "header4" && (
                <Header4
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  siteKey={siteKey}
                  ref={divRefs.header4}
                ></Header4>
              )}

              {item.section_id == "header5" && (
                <Header5
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  siteKey={siteKey}
                  ref={divRefs.header5}
                ></Header5>
              )}

              {item.section_id == "header6" && (
                <Header6
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  siteKey={siteKey}
                  ref={divRefs.header6}
                ></Header6>
              )}

              {item.section_id == "footer1" && (
                <Footer1
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.footer1}
                ></Footer1>
              )}
              {item.section_id == "footer2" && (
                <Footer2
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.footer2}
                ></Footer2>
              )}

              {item.section_id == "feature1" && (
                <Feature1
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature1}
                ></Feature1>
              )}
              {item.section_id == "feature2" && (
                <Feature2
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature2}
                ></Feature2>
              )}
              {item.section_id == "feature3" && (
                <Feature3
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                   ref={divRefs.feature3}

                ></Feature3>
              )}

              {item.section_id == "feature4" && (
                <Feature4
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature4}
                ></Feature4>
              )}
              {item.section_id == "feature5" && (
                <Feature5
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature5}
                ></Feature5>
              )}
              {item.section_id == "feature6" && (
                <Feature6
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature6}
                ></Feature6>
              )}
              {item.section_id == "feature7" && (
                <Feature7
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature7}
                ></Feature7>
              )}
              {item.section_id == "feature8" && (
                <Feature8
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature8}
                ></Feature8>
              )}
              {item.section_id == "feature9" && (
                <Feature9
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature9}
                ></Feature9>
              )}
              {item.section_id == "feature10" && (
                <Feature10
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature10}
                ></Feature10>
              )}
              {item.section_id == "feature11" && (
                <Feature11
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.feature11}
                ></Feature11>
              )}

              {item.section_id == "hero1" && (
                <Hero1
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero1}
                ></Hero1>
              )}
              {item.section_id == "hero2" && (
                <Hero2
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero2}
                ></Hero2>
              )}

              {item.section_id == "hero3" && (
                <Hero3
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero3}
                ></Hero3>
              )}
              {item.section_id == "hero4" && (
                <Hero4
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero4}
                ></Hero4>
              )}
              {item.section_id == "hero5" && (
                <Hero5
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero5}
                ></Hero5>
              )}
              {item.section_id == "hero6" && (
                <Hero6
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero6}
                ></Hero6>
              )}
              {item.section_id == "hero7" && (
                <Hero7
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero7}
                ></Hero7>
              )}
              {item.section_id == "hero8" && (
                <Hero8
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero8}
                ></Hero8>
              )}

              {item.section_id == "hero9" && (
                <Hero9
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero9}
                ></Hero9>
              )}

              {item.section_id == "hero10" && (
                <Hero10
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero10}
                ></Hero10>
              )}

              {item.section_id == "hero11" && (
                <Hero11
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero11}
                ></Hero11>
              )}

              {item.section_id == "hero12" && (
                <Hero12
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero12}
                ></Hero12>
              )}

              {item.section_id == "hero13" && (
                <Hero13
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero13}
                ></Hero13>
              )}

              {item.section_id == "hero14" && (
                <Hero14
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.hero14}
                ></Hero14>
              )}

              {item.section_id == "gallery1" && (
                <Gallery1
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.gallery1}
                ></Gallery1>
              )}

              {item.section_id == "gallery2" && (
                <Gallery2
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.gallery2}
                ></Gallery2>
              )}

              {item.section_id == "gallery3" && (
                <Gallery3
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.gallery3}
                ></Gallery3>
              )}

              {item.section_id == "gallery4" && (
                <Gallery4
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.gallery4}
                ></Gallery4>
              )}

              {item.section_id == "gallery5" && (
                <Gallery5
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.gallery5}
                ></Gallery5>
              )}

              {item.section_id == "contact1" && (
                <Contact1
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  ref={divRefs.contact1}
                ></Contact1>
              )}

              {item.section_id == "contact2" && (
                <Contact2
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  ref={divRefs.contact2}
                ></Contact2>
              )}

              {item.section_id == "contact3" && (
                <Contact3
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  ref={divRefs.contact3}
                ></Contact3>
              )}

              {item.section_id == "contact4" && (
                <Contact4
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  siteId={siteId}
                  ref={divRefs.contact4}
                ></Contact4>
              )}

              {item.section_id == "testimonial1" && (
                <Testimonial1
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.testimonial1}
                ></Testimonial1>
              )}
               {item.section_id == "testimonial2" && (
                <Testimonial2
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.testimonial2}
                ></Testimonial2>
              )}  
              {item.section_id == "testimonial3" && (
                <Testimonial3
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.testimonial3}
                ></Testimonial3>
              )}

              {item.section_id == "testimonial4" && (
                <Testimonial4
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.testimonial4}
                ></Testimonial4>
              )}

              {item.section_id == "testimonial5" && (
                <Testimonial5
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.testimonial5}
                ></Testimonial5>
              )}

              {item.section_id == "testimonial6" && (
                <Testimonial6
                  fromPage="customer"
                  dataObj={item}
                  themeColor={selectedColor}
                  fontFam={selectedFont}
                  ref={divRefs.testimonial6}
                ></Testimonial6>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
