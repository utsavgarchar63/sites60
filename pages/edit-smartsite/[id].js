import { Fragment, useState, useEffect, useRef } from "react";
import { Disclosure, Transition, RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { featherIconsList } from "../../lib/genericData";
import { componentCategoryList } from "../../lib/genericData";

import { EDITPAGE_COMPONENTS_CONFIG as componentData } from "../../lib/componentConfig";
import { Steps } from "intro.js-react";

import Loader from "../../components/Loader";

import { SketchPicker } from "react-color";
// import React, { useRef, useEffect, useState } from 'react';
import Toolbar from "../../components/newComponents/toolbar";
import Dialog from "../../components/newComponents/dialog";
import SectionsDialog from "../../components/newComponents/sectionsDialog";

import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  LinkIcon,
  CloudArrowUpIcon,
  Cog8ToothIcon,
  ChevronRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import Alertbox from "../../components/Alertbox";
import { data } from "autoprefixer";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Domains", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const fromPage = "edit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const siteFonts = [
  { id: 1, name: "Raleway" },
  { id: 2, name: "Montserrat" },
  { id: 3, name: "Poppins" },
  { id: 4, name: "Inter" },
  { id: 5, name: "FontSans" },
  { id: 6, name: "Ubuntu" },
  { id: 7, name: "Lato" },
];

export default function Example({ size, className }) {
  const [open, setOpen] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const router = useRouter();
  const [sections, setSections] = useState([]);
  const [key, setKey] = useState("");
  const notify = (label, options) => toast(label, options);
  const [editObj, setEditObj] = useState({});

  const [viewPortSwitch, setviewPortSwitch] = useState("desktopview");
  const [selectedEditSection, setSelectedEditSection] = useState("");
  const [textCount, setTextCount] = useState("");
  const [showTour, setShowTour] = useState(false);
  const [SiteKey, setSiteKey] = useState("");
  const [Category, setCategory] = useState("");

  const [showMore, setShowMore] = useState(false);
  const handleToggle = () => {
    setShowMore(!showMore);
  };
  const bottomRef = useRef(null);
  // const displayedNumbers = showMore ? themeColor : themeColor.slice(0, 5);

  function requestDesktopSite() {
    setviewPortSwitch("desktopview");
  }
  function requestMobileSite() {
    setviewPortSwitch("smartphone");
  }

  const [query, setQuery] = useState("");
  const [selectedFont, setSelectedFont] = useState(siteFonts[0]);

  const [infoObj, setInfoObj] = useState({
    title: "",
    description: "",
    status: "",
    key: "",
    is_paid: false,
    favicon: undefined,
  });

  const [compSaving, setCompSaving] = useState(false);
  const [openAlertbox, setOpenAlertbox] = useState(false);
  const [alertObj, setAlertObj] = useState({
    type: "header",
    title: "Replace Header?",
    message: "You can add Header only once",
  });

  const [newSidebarComponents, setNewSidebarComponents] = useState([]);

  const [newSectionId, setNewSectionId] = useState("");

  const stepRef = useRef();

  const [steps, setSteps] = useState([
    {
      element: ".first-step",
      intro: "Change Page Title by typing inside the textbox & click next",
      position: "right",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element: ".second-step",
      intro: "Tap on any component & click next",
    },
    {
      element: ".third-step",
      intro: "Click on save, your changes will be saved.",
    },
    {
      element: ".fourth-step",
      intro: "Click on Copy to Clipboard. Preview it on new Tab",
    },
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // useEffect(() => {
  //   const beforeUnloadListener = (e) => {
  //     if (hasUnsavedChanges) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   };

  //   window.addEventListener("beforeunload", beforeUnloadListener);

  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnloadListener);
  //   };
  // }, [hasUnsavedChanges]);

  useEffect(() => {
    if (router) {
      if (router.query.id) {
        setKey(router.query.id);
        getInfo(router.query.id);
      }
    }
  }, [router]);

  async function generateAIContentget(siteKey) {
    // setAiLoader(true);

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, 120000)
    );

    try {
      const res = await Promise.race([
        fetch(`/api/generateAIContent?siteKey=${siteKey}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        timeoutPromise, // Reject the promise if the timeout is reached
      ]);

      // Check if the promise resolved due to timeout
      if (!res) {
        // setAiLoader(false);
        // setLoading(false);
        setErrMessage("All our servers are busy. Please try after sometime.");
        return;
      }

      const aiData = await res.json();

      setContent(aiData.data.template_html);
      setdefaultHtml(aiData.data.template_html);

      // setContentState(aiData.data.template_html);
      // updateContentInIframe(aiData.data.template_html);
      console.log(aiData.data.template_html, "aiData.data.template_html");
      // setSiteKey(aiData.siteKey);
      // }
    } catch (error2) {
      // setAiLoader(false);
      // setLoading(false);
      // setErrMessage("All our servers are busy. Please try after sometime.");
    }
  }

  // useEffect(() => {
  //   // Retrieve the content from local storage
  //   const savedContent = localStorage.getItem("websiteContent");
  //   if (savedContent) {
  //     setContent(savedContent);
  //     setdefaultHtml(savedContent);
  //   }
  // }, []);

  // useEffect(() => {
  //   const updatedSidebarList = filterSidebarItems(
  //     newSidebarComponents,
  //     sidebarList
  //   );
  //   console.log(updatedSidebarList, sidebarList, "sidebarList");
  //   console.log(updatedSidebarList, "sidebarList");
  //   // setFinalSidebarList(updatedSidebarList);
  // }, [newSidebarComponents]);

  const categoryList = componentCategoryList();

  function filterSidebarItems(array1, array2) {
    const lowercasedArray1 = array1.map((item) => item.toLowerCase());

    const filteredArray2 = array2
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          lowercasedArray1.includes(item.id.toLowerCase())
        ),
      }))
      .filter((category) => category.items.length > 0);

    return filteredArray2;
  }

  // useEffect(() => {
  //   // 👇️ scroll to bottom every time sections change
  //   bottomRef.current.parentNode.scrollTop = bottomRef.current.offsetTop;

  //   bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  // }, [sections]);

  const goBack = () => {
    if (hasUnsavedChanges) {
      Swal.fire({
        title: "Unsaved Changes",
        text: "You have unsaved changes. Do you want to save before leaving?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          updateData(); // Assuming this function saves the changes
          router.push("/");
        } else {
          router.push("/"); // This is the correct part for "No" option
        }
      });
    } else {
      router.push("/");
    }
  };

  const cancelAlertbox = () => {
    setOpenAlertbox(false);
  };

  const doneAlertbox = () => {
    if (alertObj.type == "header") {
      // Replace header

      const newState = sections.map((obj) => {
        if (obj.section_id.includes("header")) {
          return { ...obj, section_id: newSectionId };
        }

        return obj;
      });

      setSections(newState);
    } else if (alertObj.type == "footer") {
      // Replace footer
      const newState = sections.map((obj) => {
        if (obj.section_id.includes("footer")) {
          return { ...obj, section_id: newSectionId };
        }

        return obj;
      });

      setSections(newState);
    } else if (alertObj.type == "contact") {
      // Replace footer
      const newState = sections.map((obj) => {
        if (obj.section_id.includes("contact")) {
          return { ...obj, section_id: newSectionId };
        }

        return obj;
      });

      setSections(newState);
    }

    setOpenAlertbox(false);
  };

  const changeInfo = (type, value) => {
    if (type == "title") {
      setInfoObj({
        ...infoObj, // Copy the old fields
        title: value, // But override this one
      });
    }
  };

  const saveComponent = () => {
    // setOpen(false)
    setCompSaving(true);
  };

  const getInfo = async (key) => {
    const res = await fetch("/api/smartSiteDetails?key=" + key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data, "<< smartsite getinfo");

    if (data.showTour == true) {
      let tourObj = localStorage.getItem("tour");

      if (tourObj) {
        setShowTour(false);
      } else {
        setShowTour(true);
      }
    }

    if (data.smartsiteInfo) {
      setSiteKey(data.smartsiteInfo.siteKey);
      setCategory(data.smartsiteInfo.category);
      generateAIContentget(data.smartsiteInfo.siteKey);
    }

    if (data.smartsiteInfo) {
      // if (data.smartsiteInfo.font) {
      //   var index = siteFonts.findIndex(
      //     (obj) => obj.name == data.smartsiteInfo.font
      //   );
      //   setSelectedFont(siteFonts[index]);
      // }

      // if (data.smartsiteInfo.sections) {
      //   setSections(JSON.parse(data.smartsiteInfo.sections));
      // }

      // if (data.smartsiteInfo.primaryColor) {
      //   let index = themeColor.findIndex(
      //     (x) => x.name == data.smartsiteInfo.primaryColor
      //   );
      //   if (index != -1) {
      //     setSelectedColor(themeColor[index]);
      //   }
      // }

      // if (data.smartsiteInfo.secondaryColor) {
      //   let index = themeColor.findIndex(
      //     (x) => x.name == data.smartsiteInfo.secondaryColor
      //   );
      //   if (index != -1) {
      //     setSelectedSecondaryColor(themeColor[index]);
      //   }
      // }

      // if (data.smartsiteInfo.tertiaryColor) {
      //   let index = themeColor.findIndex(
      //     (x) => x.name == data.smartsiteInfo.tertiaryColor
      //   );
      //   if (index != -1) {
      //     setSelectedTertiaryColor(themeColor[index]);
      //   }
      // }

      // let newSections = JSON.parse(data.smartsiteInfo.sections);

      // let componentsList = [];
      // for (let i = 0; i < newSections.length; i++) {
      //   const element = newSections[i];

      //   if (!componentsList.includes(element.section_id)) {
      //     componentsList.push(element.section_id);
      //   }
      // }

      // setNewSidebarComponents(componentsList);

      // if (data.smartsiteInfo.color) {
      //   let newObj = JSON.parse(JSON.stringify(data.smartsiteInfo.color));
      //   let color = JSON.parse(newObj).name;
      //   let index = themeColor.findIndex((x) => x.name == color);
      //   if (index != -1) {
      //     setSelectedColor(themeColor[index]);
      //   }
      // }

      setInfoObj({
        title: data.smartsiteInfo.title,
        description: data.smartsiteInfo.description,
        status: data.smartsiteInfo.status,
        key: key,
        is_paid: data.smartsiteInfo.is_paid,
        favicon: data.smartsiteInfo.favicon,
      });
    }
  };

  const iframeRef = useRef(null);
  const [dialogs, setDialogs] = useState({
    import: false,
    source: false,
    image: false,
  });
  const [editorDoc, setEditorDoc] = useState(null);
  const [content, setContent] = useState(`
  
    
    `);
  const [defaultHtml, setdefaultHtml] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const fileInputRef = useRef(null);
  const backgroundFileInputRef = useRef(null);
  const colorInputRef = useRef(null);
  const [dividedSections, setDividedSections] = useState([]);
  console.log(dividedSections, "dividedSections>>>");
  const [isColorPresent, setisColorPresent] = useState(false);
  console.log(dividedSections, "dividedSections>>>");
  useEffect(() => {
    const editorDocument =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
    editorDocument.designMode = "on";
    editorDocument.body.contentEditable = true;
    setEditorDoc(editorDocument);

    // Initial content setup
    updateContentInIframe(content);
  }, [content]);

  useEffect(() => {
    if (editorDoc) {
      updateContentInIframe(content);
    }
  }, [content, editorDoc]);

  const updateContentInIframe = (html) => {
    if (editorDoc) {
      editorDoc.open();
      editorDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Editor Content</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                  
                }
                .selected {
                    border: 2px solid blue;
                }
                .section-controls {
                    display: flex;
                    justify-content: flex-end;
                  
                    gap: 5px;
                }
                .section-controls button {
                    padding: 8px 12px;
                    font-size: 14px;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s;
                }
                .section-controls button.move-up {
                    background-color: #4CAF50;
                }
                .section-controls button.move-down {
                    background-color: #2196F3;
                }
                .section-controls button.delete {
                    background-color: #f44336;
                }
                .section-controls button.duplicate {
                    background-color: #FFC107;
                }
                .section-controls button.select-bg {
                    background-color: #9C27B0;
                }
                .section-controls button.select-color {
                    background-color: #673AB7;
                }
                .section-controls button:hover {
                    opacity: 0.9;
                }
                .section-controls button:active {
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
                }
                section {
                    min-height: 200px;
                    
                    
                    position: relative;
                    background-size: cover;
                    background-position: center;
                }
                section img {
                    max-width: 100%;
                    width: auto;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }
            </style>
        </head>
        <body>${html}</body>
        </html>
      `);
      editorDoc.close();
      injectSectionControls(editorDoc);
      addClickListenerToElements(editorDoc);
    }
  };
  useEffect(() => {
    splitContentIntoSections(defaultHtml);
  }, [defaultHtml]);

  // const splitContentIntoSections = (html) => {
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = html;

  //   // const headers = Array.from(tempDiv.querySelectorAll('header'));
  //   const sections = Array.from(tempDiv.querySelectorAll('section'));
  //   // const footers = Array.from(tempDiv.querySelectorAll('footer'));

  //   // const allSections = [...headers, ...sections, ...footers].map((element) => element.outerHTML);
  //   const allSections = [  ...sections].map((element) => element.outerHTML);
  //   setDividedSections(allSections);
  // };

  const splitContentIntoSections = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const sections = Array.from(tempDiv.querySelectorAll("section"));
    const allSections = sections.map((element) => ({
      id: element.id || "", // Extract id or use an empty string if not present
      html: element.outerHTML,
    }));

    setDividedSections(allSections);
  };

  const injectSectionControls = (doc) => {
    console.log("Injecting section controls...");

    const targetTags = ["section", "header", "footer"];

    targetTags.forEach((tag) => {
      const elements = doc.querySelectorAll(tag);
      elements.forEach((element, index) => {
        const existingControls = element.querySelector(".section-controls");
        if (existingControls) {
          existingControls.remove();
        }

        const controls = doc.createElement("div");
        controls.className = "section-controls";
        controls.innerHTML = `
          <button type="button" class="move-up" contenteditable="false">Move Up</button>
          <button type="button" class="move-down" contenteditable="false">Move Down</button>
          <button type="button" class="delete" contenteditable="false">Delete</button>
          <button type="button" class="duplicate" contenteditable="false">Duplicate</button>
          <button type="button" class="select-bg" contenteditable="false">Select Background Image</button>
          <button type="button" class="select-color" contenteditable="false">Select Background Color</button>
        `;
        element.prepend(controls);

        if (index === 0) {
          controls.querySelector(".move-up").disabled = true;
          controls.querySelector(".move-up").style.backgroundColor = "#ccc";
        }

        if (index === elements.length - 1) {
          controls.querySelector(".move-down").disabled = true;
          controls.querySelector(".move-down").style.backgroundColor = "#ccc";
        }

        // Disable the delete button for header and footer elements
        if (tag === "header" || tag === "footer") {
          const deleteButton = controls.querySelector(".delete");
          deleteButton.disabled = true;
          deleteButton.style.backgroundColor = "#ccc";
          const dublicateButton = controls.querySelector(".duplicate");
          dublicateButton.disabled = true;
          dublicateButton.style.backgroundColor = "#ccc";
          // controls.querySelector('.duplicate').addEventListener('click', (e) => {
          //   e.stopPropagation();
          //   handleDuplicateSection(element);
          // });
        } else {
          controls.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation();
            handleDeleteSection(element);
          });
          controls
            .querySelector(".duplicate")
            .addEventListener("click", (e) => {
              e.stopPropagation();
              handleDuplicateSection(element);
            });
        }

        controls.querySelector(".move-up").addEventListener("click", (e) => {
          e.stopPropagation();
          handleMoveSection(element, "up");
        });
        controls.querySelector(".move-down").addEventListener("click", (e) => {
          e.stopPropagation();
          handleMoveSection(element, "down");
        });

        controls.querySelector(".select-bg").addEventListener("click", (e) => {
          e.stopPropagation();
          handleSelectBackgroundImage(element);
        });
        controls
          .querySelector(".select-color")
          .addEventListener("click", (e) => {
            e.stopPropagation();
            handleSelectBackgroundColor(element);
          });
      });
    });
  };

  const addClickListenerToElements = (doc) => {
    const elements = doc.querySelectorAll(
      "section, footer, header, div, p, h1, h2, h3, h4, h5, h6, img"
    );

    elements.forEach((element) => {
      if (element.tagName.toLowerCase() === "img") {
        element.addEventListener("click", (e) => {
          e.stopPropagation();
          handleImageClick(element);
        });
      } else {
        element.addEventListener("click", (e) => {
          e.stopPropagation();
          handleElementClick(element);
        });
      }
    });
  };

  const handleElementClick = (element) => {
    console.log("Element clicked:", element);

    // Remove the blue border from the previously selected element
    if (selectedElement && selectedElement !== element) {
      selectedElement.classList.remove("selected");
      console.log("Previous element deselected:", selectedElement);
    }

    // Add the blue border to the currently selected element
    element.classList.add("selected");
    console.log("Current element selected:", element);

    // Update the selected element in the state
    setSelectedElement(element);
  };

  // const handleImageClick = (img) => {
  //   setSelectedElement(img);
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && selectedElement) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       selectedElement.src = reader.result;
  //       setContent(editorDoc.body.innerHTML);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageClick = (img) => {
    setSelectedElement(img);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      selectedElement &&
      selectedElement.tagName.toLowerCase() === "img"
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        selectedElement.src = reader.result;
        setContent(editorDoc.body.innerHTML);
        // Clear the file input value to allow the same file to be selected again
        fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeForBackground = (event) => {
    const file = event.target.files[0];
    if (file && selectedElement) {
      const reader = new FileReader();
      reader.onloadend = () => {
        selectedElement.style.backgroundColor = ""; // Clear background color when setting a background image
        selectedElement.style.backgroundImage = `url(${reader.result})`;
        selectedElement.style.backgroundSize = "cover";
        selectedElement.style.backgroundPosition = "center";
        setContent(editorDoc.body.innerHTML);
        // Clear the file input value to allow the same file to be selected again
        backgroundFileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectBackgroundImage = (section) => {
    setSelectedElement(section);
    backgroundFileInputRef.current.click();
  };

  const handleSelectBackgroundColor = (element) => {
    setSelectedElement(element);
    colorInputRef.current.click();
  };

  // const handleFileChangeForBackgroundColor = (event) => {
  //   const color = event.target.value;
  //   if (selectedElement) {
  //     selectedElement.style.backgroundImage = ''; // Clear background image when setting a background color
  //     selectedElement.style.backgroundColor = color;
  //     setContent(editorDoc.body.innerHTML);
  //     colorInputRef.current.click();
  //     colorInputRef.current.value = '';
  //   }
  // };
  const handleFileChangeForBackgroundColor = (event) => {
    const color = event.target.value;
    if (color && selectedElement) {
      // Apply the selected color as the background color
      selectedElement.style.backgroundColor = color;

      // Clear the background image if present
      selectedElement.style.backgroundImage = "";

      // Update the content in the iframe
      setContent(editorDoc.body.innerHTML);

      // Reset the color input to allow the same color to be selected again
      colorInputRef.current.value = "";
    }
  };

  const handleDeleteSection = (section) => {
    section.remove();
    setContent(editorDoc.body.innerHTML);
  };

  const handleMoveSection = (section, direction) => {
    const allSections = Array.from(
      editorDoc.querySelectorAll("section, header, footer")
    );

    if (direction === "up") {
      const prevSibling = section.previousElementSibling;
      if (prevSibling) {
        section.parentNode.insertBefore(section, prevSibling);
      } else {
        const index = allSections.indexOf(section);
        if (index > 0) {
          section.parentNode.insertBefore(section, allSections[index - 1]);
        }
      }
    } else if (direction === "down") {
      const nextSibling = section.nextElementSibling;
      if (nextSibling) {
        section.parentNode.insertBefore(nextSibling, section);
      } else {
        const index = allSections.indexOf(section);
        if (index < allSections.length - 1) {
          section.parentNode.insertBefore(allSections[index + 1], section);
        }
      }
    }

    setContent(editorDoc.body.innerHTML);
  };

  const handleDuplicateSection = (section) => {
    const clone = section.cloneNode(true);
    section.parentNode.insertBefore(clone, section.nextSibling);
    setContent(editorDoc.body.innerHTML);
  };

  const execCommand = (command, value = null) => {
    if (editorDoc) {
      editorDoc.execCommand(command, false, value);
    }
  };

  const showDialog = (type) => {
    setDialogs({ ...dialogs, [type]: true });
  };

  const hideDialog = (type) => {
    setDialogs({ ...dialogs, [type]: false });
  };

  const updateContent = (newContent) => {
    setContent(newContent);
    hideDialog("source");
  };

  const handleInsertSection = (html) => {
    setContent(content + html);
    setDialogs({ ...dialogs, sections: false });
  };

  // const handleInsertSection = (section) => {
  //   const { id, html } = section;
  //   const newSection = document.createElement("div");
  //   newSection.innerHTML = html;
  //   const insertedSection = newSection.firstElementChild;

  //   // Maintain the id if necessary
  //   if (id) {
  //     insertedSection.id = id;
  //   }

  //   setContent(content + insertedSection.outerHTML);
  //   setDialogs({ ...dialogs, sections: false });
  // };

  const closeDialog = (dialogName) => {
    setDialogs({ ...dialogs, [dialogName]: false });
  };

  const exportHTML = async () => {
    if (editorDoc) {
      const sectionControls = editorDoc.querySelectorAll(".section-controls");
      sectionControls.forEach((controls) => controls.remove());

      const images = editorDoc.querySelectorAll("img");
      const imagePromises = Array.from(images).map(async (img) => {
        if (img.src.startsWith("data:")) return;
        try {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const reader = new FileReader();
          return new Promise((resolve) => {
            reader.onloadend = () => {
              img.src = reader.result;
              resolve();
            };
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error("Failed to fetch image:", error);
        }
      });

      await Promise.all(imagePromises);

      const updatedContent = editorDoc.body.innerHTML;

      injectSectionControls(editorDoc);
      addClickListenerToElements(editorDoc);

      const blob = new Blob([updatedContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "exported-content.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlePreview = () => {
    if (editorDoc) {
      // Get the updated HTML content from the editor
      const updatedContent = editorDoc.body.innerHTML;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = updatedContent;

      // Remove the .section-controls elements
      const sectionControls = tempDiv.querySelectorAll(".section-controls");
      sectionControls.forEach((control) => control.remove());

      // Save the updated content to local storage
      // localStorage.setItem("websiteContent", tempDiv.innerHTML);

      const htmlString =
        typeof tempDiv.innerHTML === "string"
          ? tempDiv.innerHTML
          : String(tempDiv.innerHTML);

      // Navigate to the preview route
      router.push(`/smartsite/${router.query.id}?preview=true`);
    }
  };

  async function generateAIContentUpdate(htmlString) {
    // setAiLoader(true);

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, 120000)
    );

    try {
      const data = {
        template_html: htmlString,
      };

      console.log(SiteKey, Category, "Category>>");
      const res = await Promise.race([
        fetch(`/api/generateAIContent?type=allsections&siteKey=${SiteKey}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Accept: "text/html",
          },
          body: JSON.stringify(data), // Ensure this is a valid HTML string
        }),
        timeoutPromise, // Reject the promise if the timeout is reached
      ]);

      // Check if the promise resolved due to timeout
      if (!res) {
        // setAiLoader(false);
        // setLoading(false);
        // setErrMessage("All our servers are busy. Please try after sometime.");
        return;
      }

      const aiData = await res.json();

      // setLoading(false);
      if (aiData.status == 501) {
        // setAiLoader(false);
        // setErrMessage(aiData.message);
      } else if (aiData.success === false) {
        console.log("aiData", aiData.status);
        // setAiLoader(false);
        // setErrMessage("Email not Verified");
      } else {
        notify("Changes saved");
        // setSiteKey(aiData.siteKey);
      }
    } catch (error2) {
      // setAiLoader(false);
      // setLoading(false);
      setErrMessage("All our servers are busy. Please try after sometime.");
    }
  }

  const onAiText = async () => {
    setAiLoading(true);
    console.log("eretrytryt");

    // Convert templatehtml to a string if it isn't already
    const htmlString = typeof content === "string" ? content : String(content);

    try {
      const response = await fetch("http://localhost:5000/process_html", {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
          Accept: "text/html", // Expecting HTML as a response
        },
        body: htmlString, // Ensure this is a valid HTML string
      });

      if (response.ok) {
        const htmlContent = await response.text(); // Use response.text() to get HTML content
        setAiLoading(false);
        // if (htmlContent === "" ? setAiLoader(false) : null)
        console.log(htmlContent, "htmlContent>>");
        // setSidebarOpen(true);

        setContent(htmlContent);

        // setupdatedTemplatehtml(htmlContent);
        // setUpdatedHtmlKey(templateName);

        // You can now use the HTML content returned from the API
        console.log("HTML Content:", htmlContent);

        // Example: If you want to set this HTML to a state in React
        // setHtmlTemplatesByCategory(htmlContent);
      } else {
        const errorData = await response.text(); // Use text() to see the response body in case of errors
        console.error("Error:", response.status, errorData);
        setAiLoading(false);
        // setupdatedTemplatehtml("");
        // setUpdatedHtmlKey("");
        // setLoading(false);
        // setAiLoader(false);
      }
    } catch (error) {
      console.error("Error fetching template:", error);
    }
  };

  // const onAiText = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/process_html", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "text/html",
  //         Accept: "text/html", // Expecting HTML as a response
  //       },
  //       body: content,
  //     });

  //     const data = await response.json();
  //     if (data.length > 0) {
  //       console.log(data, "datahtml");
  //       setContent(data);
  //     }
  //     console.log("AI Response:", data);

  //     // Handle the response data as needed
  //   } catch (error) {
  //     console.error("Error fetching AI Text:", error);
  //   }
  // };

  const previewHTML = () => {
    if (editorDoc) {
      const contentCopy = editorDoc.body.innerHTML;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = contentCopy;

      // Remove the .section-controls elements
      const sectionControls = tempDiv.querySelectorAll(".section-controls");
      sectionControls.forEach((control) => control.remove());

      // Save the cleaned-up HTML content to local storage
      localStorage.setItem("websiteContent", tempDiv.innerHTML);

      // Open the content in a new window for preview
      const previewWindow = window.open("", "_blank");
      // previewWindow.document.open();
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
        </head>
        <body>${tempDiv.innerHTML}</body>
        </html>
      `);
      previewWindow.document.close();

      // Navigate to the preview route
      router.push(`/smartsite/${siteKey}?preview=true`);
    }
  };

  async function generateAIContent(key, section) {
    setAiLoading(true);

    try {
      const res = await fetch(
        "/api/generateAIContent?type=section&section=" + section.section_id
      );
      const aiData = await res.json();
      setAiLoading(false);

      if (aiData.success == false) {
        notify("All our servers are busy. Please try after sometime.");
      } else {
        if (section == "testimonials") {
          let testimonialObj = aiData.data.sections[0].content;
          editSection(key, "title", testimonialObj.title);
          editSection(key, "subtitle", testimonialObj.subtitle);
          let testimonialsArray = [];
          for (const iterator of testimonialObj.items) {
            let tempObj = {};
            tempObj["name"] = iterator.name;
            tempObj["designation"] = iterator.designation;
            tempObj["content"] = iterator.testimonial;
            tempObj["image"] =
              "https://storage.googleapis.com/anirudhtest-e263d.appspot.com/profile.png";
            testimonialsArray.push(tempObj);
          }
          editSection(key, "testimonials", testimonialsArray);
        }
        if (section == "hero") {
          let heroObj = aiData.data.sections[0].content;
          editSection(key, "title", heroObj.title);
          editSection(key, "subtitle", heroObj.subtitle);
        }
        if (section == "features") {
          let featureObj = aiData.data.sections[0].content;
          editSection(key, "title", featureObj.title);
          editSection(key, "subtitle", featureObj.subtitle);

          let featuresArray = [];
          for (const iterator of featureObj.items) {
            let tempObj = iterator;
            tempObj["icon"] = getRandomIcon();
            featuresArray.push(tempObj);
          }

          editSection(key, "features", featuresArray);
        }

        changeClick();
      }
    } catch (error2) {
      console.log("Error>>>>", error2);
    }
  }

  const editInfo = (type, value) => {
    if (type == "title") {
      setInfoObj({
        ...infoObj, // Copy the old fields
        title: value, // But override this one
      });
    } else if (type == "description") {
      setInfoObj({
        ...infoObj, // Copy the old fields
        description: value, // But override this one
      });
    } else if (type == "status") {
      setInfoObj({
        ...infoObj, // Copy the old fields
        status: value, // But override this one
      });
    } else if (type == "favicon") {
      setInfoObj({
        ...infoObj, // Copy the old fields
        favicon: value, // But override this one
      });
    }
  };

  const editSection = (sectionKey, secId, secValue) => {
    console.log(sectionKey, secId, secValue, "edit optiosn");

    setHasUnsavedChanges(true);
    setSections(
      sections.map((item) => {
        if (item.key == sectionKey) {
          let newObj = item.data;
          newObj[`${secId}`] = secValue;
          return { ...item, data: newObj };
        } else {
          // No changes
          return item;
        }
      })
    );
  };

  const saveChanges = async (type, key, selectedSection, textCount) => {
    if (type === "addSection") {
    }
    if (type == "generateai") {
      generateAIContent(key, selectedSection);
    } else if (type == "delete") {
      deleteSection(key);
    } else if (type == "add") {
      setSidebarOpen(true);
    } else if (type == "edit") {
      setOpen(false);
      setSaving(true);
      const filteredData = sections.filter((e) => e.key === key)[0];
      console.log(filteredData, "filteres data");
      setEditObj(filteredData);
      setSelectedEditSection(selectedSection);
      setTextCount(textCount);
      setOpen(true);
    } else if (type == "up") {
      let index = sections.findIndex((e) => e.key == key);

      const containsHeader = sections.some((item) =>
        item.section_id.includes("header")
      );

      if (containsHeader == true) {
        if (index != 0 && index != 1) {
          const index2 = index - 1;
          const newItems = sections.slice();
          const temp = sections[index];
          newItems[index] = sections[index2];
          newItems[index2] = temp;
          setSections(newItems);
        }
      } else {
        if (index != 0) {
          const index2 = index - 1;
          const newItems = sections.slice();
          const temp = sections[index];
          newItems[index] = sections[index2];
          newItems[index2] = temp;
          setSections(newItems);
        }
      }
    } else if (type == "down") {
      let index = sections.findIndex((e) => e.key == key);

      const containsFooter = sections.some((item) =>
        item.section_id.includes("footer")
      );

      if (containsFooter == true) {
        if (index != sections.length - 1 && index != sections.length - 2) {
          const index2 = index + 1;
          const newItems = sections.slice();
          const temp = sections[index];
          newItems[index] = sections[index2];
          newItems[index2] = temp;
          setSections(newItems);
        }
      } else {
        if (index != sections.length - 1) {
          const index2 = index + 1;
          const newItems = sections.slice();
          const temp = sections[index];
          newItems[index] = sections[index2];
          newItems[index2] = temp;
          setSections(newItems);
        }
      }
    }
  };

  const saveData = async () => {
    try {
      updateData();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const updateData = async () => {
    const options = {
      onClose: () => {
        console.log("Closing...");
        // setInterval(() => {
        //   setOpen(false);
        // }, 4000);
      },
    };
    // setOpen(true);
    // setSaving(true);
    try {
      let formData = new FormData();
      const key = "shiva";
      const title = "shiva title";
      // formData.append("sections", JSON.stringify(sections));
      formData.append("key", key);
      formData.append("title", infoObj.title);
      formData.append("description", infoObj.description);
      formData.append("status", infoObj.status);
      // formData.append("color", JSON.stringify(selectedColor));
      // formData.append("primaryColor", JSON.stringify(selectedColor));
      // formData.append("secondaryColor", JSON.stringify(selectedSecondaryColor));
      // formData.append("tertiaryColor", JSON.stringify(selectedTertiaryColor));
      formData.append("favicon", infoObj.favicon);
      formData.append("font", selectedFont.name);

      const res = await fetch("/api/smartsite", {
        method: "PUT",
        body: formData,
      });

      //Await for data for any desirable next steps
      const data = await res.json();

      setSaving(false);
      console.log("Save Data>>>>", data);
      if (data?.success) {
        console.log("heeeeeeeeeeeerrrrrrrrrrrrr");
        notify("Changes saved");
      }
      if (data.errors) {
        notify(data.errors[0].msg);
      } else {
        if (data.status == 422 || data.status == 400 || data.status == 500) {
          notify("All our servers are busy. Please try after sometime.");
        } else if (data.success == false) {
          notify("All our servers are busy. Please try after sometime.");
        } else {
          // notify("Changes Saved!!", options);
          setHasUnsavedChanges(false);
        }
      }
    } catch (error) {
      setSaving(false);
      notify("All our servers are busy. Please try after sometime.");
    }
  };

  const HandlesaveChanges = () => {
    if (editorDoc) {
      // Get the updated HTML content from the editor
      const updatedContent = editorDoc.body.innerHTML;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = updatedContent;

      // Remove the .section-controls elements
      const sectionControls = tempDiv.querySelectorAll(".section-controls");
      sectionControls.forEach((control) => control.remove());

      // Save the updated content to local storage
      // localStorage.setItem("websiteContent", tempDiv.innerHTML);

      const htmlString =
        typeof tempDiv.innerHTML === "string"
          ? tempDiv.innerHTML
          : String(tempDiv.innerHTML);
      generateAIContentUpdate(htmlString);
    }
  };

  const publish = () => {
    setEditObj({
      section_id: "publish",
      data: infoObj,
    });

    setOpen(true);
  };

  const preview = () => {
    router.push("/smartiste/" + key + "?preview=true");
  };

  const iconsList = featherIconsList();
  function getRandomIcon() {
    const randomIndex = Math.floor(Math.random() * iconsList.length);

    return iconsList[randomIndex].icon;
  }

  const scrollToDiv = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [selectedId, setSelectedId] = useState(null);

  const deleteSection = (key) => {
    console.log("deleteSection>>>>", key);
    setSections((items) => items.filter((e) => e.key != key));
  };

  const changeClick = () => {
    setCompSaving(false);
  };

  function sectionData(id) {
    let uniqueKey = randomstring.generate({
      length: 12,
      charset: "alphanumeric",
    });

    if (componentData[id]) {
      const obj = componentData[id];
      obj.section_id = id;
      obj.key = uniqueKey;
      return obj;
    }
  }

  function tourComplete() {
    localStorage.setItem("tour", "completed");
    setShowTour(false);
  }
  const handleNavigate = (route) => {
    if (hasUnsavedChanges) {
      Swal.fire({
        title: "Unsaved Changes",
        text: "You have unsaved changes. Do you want to save before preview?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          updateData();
          router.push(route);
        } else {
          router.push(route);
        }
      });
    } else {
      router.push(route);
    }
  };

  function makeFirstLetterLowerCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
  const renderSectionComponent = (
    sectionId,
    itemStyle,
    itemData,
    divRefData
  ) => {
    const Component = sectionComponentMap[makeFirstLetterLowerCase(sectionId)];

    console.log(
      selectedColor,
      selectedSecondaryColor,
      selectedTertiaryColor,
      "colors"
    );

    if (Component) {
      return (
        <Component
          style={itemStyle}
          fromPage={fromPage}
          dataObj={itemData}
          themeColorPrimary={selectedColor}
          themeColorSecondary={selectedSecondaryColor}
          themeColorTertiary={selectedTertiaryColor}
          fontFam={selectedFont}
          saveChanges={saveChanges}
          viewPortSwitch={viewPortSwitch}
          ref={divRefData}
          setSections={setSections}
        />
      );
    }
    return null; // Handle the case where section_id doesn't match any component
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ToastContainer autoClose={3000} />

      <Steps
        enabled={showTour}
        options={{ hideNext: false }}
        steps={steps}
        initialStep={0}
        showDynamicElement={true}
        onComplete={() => tourComplete()}
        onExit={() => tourComplete()}
        ref={stepRef}
      />

      <Alertbox
        open={openAlertbox}
        cancel={cancelAlertbox}
        done={doneAlertbox}
        data={alertObj}
      />
      <div
        className="fixed top-0 left-0 h-full w-1/2 bg-white"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 h-full w-1/2 bg-gray-50"
        aria-hidden="true"
      />
      <div className="relative flex max-h-screen  flex-col">
        {/* Navbar */}

        <Disclosure
          as="nav"
          className="flex-shrink-0 bg-gray-800 shadow-sm border-b border-gray-800"
        >
          {({ open }) => (
            <>
              <div className="mx-auto px-2 sm:px-4 lg:px-4">
                <div className="relative flex h-16 items-center justify-between">
                  {/* Logo section */}

                  <button
                    onClick={() => {
                      goBack();
                    }}
                    type="button"
                    className={classNames(
                      "inline-flex items-center rounded-full border border-transparent bg-gray-600 p-1.5 text-white  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
                      selectedFont?.name
                    )}
                  >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {/* Search section */}
                  <div className="flex flex-1 justify-center lg:justify-end">
                    <div className="w-full px-2 lg:px-6">
                      <div className={classNames("mt-1", selectedFont?.name)}>
                        <input
                          type="text"
                          onChange={(e) => {
                            changeInfo("title", e.target.value);
                          }}
                          value={infoObj.title}
                          className="first-step block w-60 sm:w-80 rounded-md text-lg bg-gray-600 border border-gray-600 shadow-sm py-2 pl-4 pr-3 leading-5 text-gray-800 placeholder-indigo-400 focus:border-orange-400 focus:ring-orange-400  focus:placeholder-gray-400"
                          placeholder="Page Title"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-orange-400 p-2 text-indigo-400 hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-400">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <div>icon</div>
                      )}
                    </Disclosure.Button>
                  </div>
                  {/* Links section */}
                  <div className="hidden lg:block">
                    <div className="flex items-center justify-end">
                      <div className="flex">
                        <div className="mt-4 flex sm:mt-0 sm:ml-4">
                          <a
                            // href={`/smartsite/${key}?preview=true`}
                            target="_blank"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePreview();
                            }}
                            className={classNames(
                              "fourth-step inline-flex items-center rounded-md border border-gray-600 bg-orange-100/10 px-4 py-2 text-base font-medium text-gray-300 shadow-sm",
                              selectedFont?.name
                            )}
                          >
                            <LinkIcon
                              className={classNames(
                                "-ml-0.5 mr-2 h-5 w-5"
                                // selectedFont?.name
                              )}
                              aria-hidden="true"
                            />
                            Preview
                          </a>

                          <button
                            onClick={() => publish()}
                            type="button"
                            className={classNames(
                              "ml-2 inline-flex items-center rounded-md border border-gray-600 bg-orange-100/10 px-4 py-2 text-base font-medium text-gray-300 shadow-sm",
                              selectedFont?.name
                            )}
                          >
                            <Cog8ToothIcon
                              className={classNames(
                                "-ml-0.5 mr-2 h-5 w-5",
                                selectedFont?.name
                              )}
                              aria-hidden="true"
                            />
                            Settings
                          </button>

                          {
                            <button
                              onClick={HandlesaveChanges}
                              type="button"
                              className={classNames(
                                "third-step ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
                                selectedFont?.name
                              )}
                            >
                              <CloudArrowUpIcon
                                className={classNames(
                                  "-ml-0.5 mr-2 h-5 w-5",
                                  selectedFont?.name
                                )}
                                aria-hidden="true"
                              />
                              Save
                            </button>
                          }
                          {/* {saving == true && (
                            <button
                              type="button"
                              className={classNames(
                                "ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
                                selectedFont?.name
                              )}
                            >
                              <CloudArrowUpIcon
                                className="-ml-0.5 mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              Saving...
                            </button>
                          )} */}
                        </div>
                      </div>
                      {/* Profile dropdown */}
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="space-y-1 px-2 pt-0 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "text-white bg-indigo-800"
                          : "text-indigo-200 hover:text-indigo-100 hover:bg-orange-400",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-indigo-800 pt-4 pb-3">
                  <div className="space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          "block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-orange-400 hover:text-indigo-100",
                          selectedFont?.name
                        )}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* 3 column wrapper */}
        <div className="mx-auto w-full flex-grow lg:flex xl:pl-0 h-screen">
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 bg-white xl:flex max-h-screen overflow-hidden">
            {/* Account profile */}
            <div className="flex">
              <Transition.Root show={isSidebarOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={setSidebarOpen}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-10 text-left shadow-xl transition-all sm:w-full sm:max-w-7xl h-[40rem]">
                          <div className="bg-white h-16 px-4 sm:px-6 flex items-center justify-between ">
                            <Dialog.Title
                              className={classNames(
                                "text-lg font-bold text-black",
                                selectedFont?.name
                              )}
                            >
                              Add Section
                            </Dialog.Title>
                            <button
                              type="button"
                              className="rounded-md bg-red-200  text-red-500 focus:outline-none focus:ring-0 focus:ring-white"
                              onClick={() => setSidebarOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="bg-white w-full h-full overflow-y-auto scroll-bar mt-4">
                            <div className="px-10 pb-20">
                              <div>
                                <div className="divide-y divide-gray-300 border-gray-300 border-b last:border-b-0 w-full">
                                  {/* {JSON.stringify(finalSidebarList)} */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>

            {/* Projects List */}
            <div className="flex-1 bg-gray-100 overflow-y-scroll h-screen scroll-bar">
              <Toolbar
                execCommand={execCommand}
                onAiText={onAiText}
                showDialog={showDialog}
                exportHTML={exportHTML}
                onPreview={previewHTML}
                onSelectBackgroundImage={handleSelectBackgroundImage}
                onSelectBackgroundColor={handleSelectBackgroundColor}
              />

              <div className="mx-auto h-screen sm:px-2 px-2 py-2 ">
                <div className="relative ">
                  <main
                    className={classNames(
                      viewPortSwitch == "desktopview" ? "block" : "hidden",
                      "border border-x-[14px] border-b-[14px] border-white rounded-lg relative overflow-y-auto scroll-bar   border-10 h-screen",
                      viewPortSwitch
                    )}
                  >
                    <div className="main-header h-8 sm:h-10 bg-white sm:grid grid-cols-12 flex justify-between items-center sm:space-x-1.5 px-3 gap-2 border-b">
                      <div className="flex gap-1 sm:gap-2 col-span-3">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="bg-gray-100 col-span-6 sm:col-span-6 py-0.5 sm:py-1 px-3 w-full rounded-full flex justify-between items-center">
                        <div></div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p
                            className={classNames(
                              "pl-1 text-xs truncate text-gray-600",
                              selectedFont?.name
                            )}
                          >
                            https://sites60.com/yourwebsite
                          </p>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-tip="true"
                            data-for="restart"
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                            aria-expanded="false"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="col-span-3 flex justify-end"></div>
                    </div>

                    <div className="h-full">
                      {/**  sections */}
                      <div>
                        <div
                          id="editor-container"
                          className="border border-gray-300 rounded-lg"
                        >
                          <iframe
                            ref={iframeRef}
                            id="editor-iframe"
                            className="w-full h-screen border-none"
                          />
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <input
                            type="file"
                            ref={backgroundFileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChangeForBackground}
                          />
                          {/* {isColorPresent === true ?  */}
                          <input
                            type="color"
                            ref={colorInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChangeForBackgroundColor}
                          />
                          {/* : null } */}
                        </div>

                        <Dialog
                          isOpen={dialogs.import}
                          onClose={() => hideDialog("import")}
                          onSubmit={(html) => {
                            setContent(html);
                            setdefaultHtml(html);
                            hideDialog("import");
                          }}
                          title="Import HTML"
                        />
                        <Dialog
                          isOpen={dialogs.source}
                          onClose={() => hideDialog("source")}
                          onSubmit={updateContent}
                          initialValue={content}
                          title="HTML Source"
                        />

                        <SectionsDialog
                          isOpen={dialogs.sections}
                          onClose={() => closeDialog("sections")}
                          onInsert={handleInsertSection}
                          sections={dividedSections}
                        />
                      </div>
                    </div>
                  </main>

                  <main
                    className={classNames(
                      viewPortSwitch == "smartphone" ? "block" : "hidden",
                      "border border-x-[8px] border-b-[8px] border-gray-300 relative border-10 rounded-lg shadow-lg",
                      viewPortSwitch
                    )}
                  >
                    <div className="main-header h-8 sm:h-10 lg:h-12 bg-gray-300 sm:grid grid-cols-12 flex justify-between items-center sm:space-x-1.5 lg:space-x-3 px-3 lg:px-5 gap-2 border-b">
                      <div className="flex gap-1 sm:gap-2 lg:gap-3 col-span-3">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full bg-green-400"></div>
                      </div>
                      <div className="bg-gray-200 col-span- sm:col-span-7 lg:col-span-9 py-0.5 sm:py-1 lg:py-2 px-3 lg:px-5 w-full rounded-full flex justify-between items-center">
                        <div className="flex items-center w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-gray-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <p className="pl-1 text-xs lg:text-sm truncate text-gray-600">
                            https://sites60.com/yourwebsites
                          </p>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-tip="true"
                            data-for="restart"
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4"
                            aria-expanded="false"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <iframe
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL + "/smartsite/" + key
                      }
                      className="overflow-y-auto scrolling"
                      style={{ width: "100%", height: "550px", margin: "auto" }}
                    ></iframe>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center items-center">
        {aiLoading && (
          <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-xs dark:bg-gray-700/30 opacity-100 flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
