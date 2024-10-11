import { useState, useEffect, Fragment, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { createApi } from "unsplash-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function UploadImage({
  index,
  size,
  imageUrl,
  imageChanged,
  section,
  gallery,
}) {
  const [imagePopup, setImagePopup] = useState(false);
  const [query, setQuery] = useState("all");
  const [loader, setLoader] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const notify = (label) => toast(label);
  const [image, setImage] = useState(undefined);
  const [images, setImages] = useState([]);
  const [imageSize, setImageSize] = useState("small-round"); // big-square big-rect small-rect

  const onDrop = useCallback((acceptedFiles) => {
    const previews = acceptedFiles.map((file) => ({
      file,
      uploading: true,
      uploaded: false,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...previews]);
    uploadImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //   const selectView;
  function handleQuery(query) {
    setQuery(query);
  }

  function addIcon(icon) {
    setImagePopup(true);
  }

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }

    if (size) {
      setImageSize(size);
    }
  }, [imageUrl, size]);

  const api = createApi({
    // See https://unsplash.com/developers
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
  });

  function fileChanged(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        uploadImage(event.target.files[0]);
      } else {
        notify("Only Image files are allowed!");
      }
    }
  }

  const uploadImage = async (file) => {
    setLoader(true);

    var formData = new FormData();
    console.log(file, "fileeeeeeeeeeeeeeeeeeeeeeeeee");

    if (file instanceof File) {
      console.log('here');
      formData.append("media", file);
    } else {
      notify("Provided file is not an instance of File");
      setLoader(false);
      return;
    }

    // if (file) {
    //   formData.append("media", file);
    // }

    try {
      const res = await fetch("/api/uploadMedia", {
        method: "POST",
        body: formData,
      });
      //Await for data for any desirable next steps
      const data = await res.json();

      console.log(data, "data");
      setLoader(false);

      if (data.errors) {
        notify(data.errors[0].message);
      } else {
        if (!data.success) {
          notify(data.message);
        } else {
          imageChanged("update", data.media, index);
        }
      }
    } catch (error) {
      notify(error);
      setLoader(false);
    }
  };

  const delImage = async (id) => {
    var formData = new FormData();

    if (file) {
      console.log("Appended>>>>");
      formData.append("id", id);
    }

    try {
      const res = await fetch("/api/uploadMedia", {
        method: "DELETE",
        body: formData,
      });
      //Await for data for any desirable next steps
      const data = await res.json();
      console.log("Delete Image>>>>", data);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
  }, [images]);

  function getRootPropsWrapper() {
    return images.length === 0 ? getRootProps() : {};
  }

  function dragover(event) {
    event.stopPropagation();
    event.preventDefault();

    // Add some visual fluff to show the user can drop its files
    if (!event.currentTarget.classList.contains("bg-indigo-600")) {
      event.currentTarget.classList.remove("bg-gray-800");
      event.currentTarget.classList.add("bg-indigo-600");
    }
  }

  function dragleave(event) {
    // Clean up
    console.log("dragleave>>>>>");
    event.currentTarget.classList.add("bg-gray-800");
    event.currentTarget.classList.remove("bg-indigo-600");
  }

  function drop(event) {
    console.log("drop>>>>>");

    event.preventDefault();
    // setImgFile(event.dataTransfer.files[0]);
    setImage(URL.createObjectURL(event.dataTransfer.files[0]));
    uploadImage(event.dataTransfer.files[0]);

    event.currentTarget.classList.add("bg-gray-800");
    event.currentTarget.classList.remove("bg-indigo-600");
  }

  const closeUnsplash = (img) => {
    imageChanged("update", img, index);
    console.log("Index:", index);
    setImagePopup(false);
    setImages([{ preview: img }]);
  };

  const deleteImage = () => {
    imageChanged("delete", undefined, index);
    console.log("Index:", index);
    setImage(undefined);
    console.log("Delete Image>>>>>>");
  };

  const tabs = [
    { name: "Upload Image", href: "#", current: true },
    { name: "Free Images", href: "#", current: false },
  ];

  useEffect(() => {
    if (section?.includes("gallery") || section?.includes("testimonial"))
      setImages([{ preview: imageUrl }]);
  }, [imageUrl]);

  const Body = () => {
    const [data, setPhotosResponse] = useState(null);

    useEffect(() => {
      api.search
        .getPhotos({ query: query, page: 1, perPage: 20 })
        .then((result) => {
          console.log("Unspalsh Result>>>>", result);
          setPhotosResponse(result);
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }, []);
    if (data === null) {
      return <div>Loading...</div>;
    } else if (data.errors) {
      return (
        <div>
          <div>{data.errors[0]}</div>
          <div>PS: Make sure to set your access token!</div>
        </div>
      );
    } else {
      return (
        <div className="feed">
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {data.response.results.map((photo) => (
              <li key={photo.id} className="relative">
                <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <img
                    onClick={() => closeUnsplash(photo.urls.regular)}
                    src={photo.urls.regular}
                    alt=""
                    className="cursor-pointer object-cover object-center group-hover:opacity-75 "
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return (
    <>
      <div>
        <ToastContainer autoClose={3000} />
        <div>
          <div
            className={`grid grid-cols-[1fr,2fr]         
              ${
                section?.includes("hero")
                  ? "gap-x-8 sm:gap-x-20"
                  : section?.includes("gallery")
                  ? "grid-cols-[1fr,2fr]"
                  : ""
              }
          `}
          >
            <div {...getRootPropsWrapper()}>
              <div
                className={`border-2 flex  border-dashed overflow-hidden   ${
                  section?.includes("hero")
                    ? "w-36 h-36 min-[450px]:w-52 sm:w-60  sm:h-40 p-4"
                    : section?.includes("testimonial")
                    ? "w-28 h-24 md:h-20 p-2"
                    : section?.includes("gallery")
                    ? "w-32 h-24 p-4"
                    : "w-44 h-24 p-4"
                }`}
              >
                <div
                  className={` rounded-md cursor-pointer transition-colors outline-none ${
                    isDragActive
                      ? "border-blue-400 bg-blue-100"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <input
                    {...getInputProps()}
                    type="file"
                    className="sr-only outline-none"
                    accept="image/*"
                  />

                  {isDragActive ? (
                    <p className="text-center text-blue-400">
                      Drop the files here...
                    </p>
                  ) : images.length === 0 ? (
                    <p
                      className={`text-center text-gray-500 ${
                        section?.includes("hero") ? "text-sm p-4" : "text-xs"
                      }`}
                    >
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  ) : null}
                  {images &&
                    images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative ${
                          section?.includes("gallery")
                            ? "w-24 h-12"
                            : "w-full h-full"
                        }`}
                      >
                        <div
                          className={`absolute -right-1 -top-1 ${
                            section?.includes("testimonial")
                              ? "h-2 w-2"
                              : "h-4 w-4 "
                          }  font-semibold cursor-pointer `}
                          onClick={() => {
                            setImages([]);
                            deleteImage();
                          }}
                        >
                          <XMarkIcon className="text-red-500 bg-white border border-red-500 rounded-sm" />
                        </div>
                        <img
                          src={image.preview}
                          alt="Preview"
                          className={` sm:w-56 md:w-64 object-cover ${
                            section?.includes("hero")
                              ? "w-64 h-32"
                              : section?.includes("testimonial")
                              ? "w-28 h-20 md:w-20 md:h-16"
                              : "w-36 h-16"
                          }`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div
              className={`flex gap-y-4 justify-self-end  items-center ${
                section?.includes("hero")
                  ? "flex-col gap-x-6 sm:justify-self-start"
                  : section?.includes("gallery")
                  ? "flex-col sm:flex-row gap-x-4 sm:justify-self-end"
                  : section?.includes("testimonial")
                  ? "sm:justify-self-center flex-col sm:flex-row gap-x-4"
                  : "flex-col md:gap-x-2"
              }`}
            >
              {/* <button
              type="button"
              className="inline-flex items-center rounded-md px-3 bg-white border border-gray-300 text-sm py-2 font-normal text-gray-500"
            >
              <div className="text-sm text-gray-600">
                <label
                  htmlFor={"file-upload" + index}
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span className="flex text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 justify-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Upload Image
                  </span>
                  <input
                    id={"file-upload" + index}
                    onChange={(evt) => fileChanged(evt)}
                    type="file"
                    className="sr-only"
                    accept="image/*"
                  />
                </label>
              </div>
            </button> */}
              <div>
                <button
                  onClick={() => {
                    addIcon("unsplash");
                  }}
                  type="button"
                  className={`rounded-md  bg-white border border-gray-300 text-center py-2 font-normal text-gray-500 px-5  sm:px-9 text-sm ${
                    section?.includes("gallery") ? " px-7" : ""
                  }`}
                >
                  Free Images
                </button>
              </div>

              <div>
                {loader == true && (
                  <button
                    type="button"
                    className={` bg-indigo-600 border border-transparent rounded-md shadow-sm
                     py-2  sm:pr-9 inline-flex font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm ${
                       section?.includes("gallery")
                         ? "pr-4"
                         : section?.includes("hero")
                         ? "pr-2"
                         : ""
                     }`}
                  >
                    <svg
                      className={`animate-spin h-5 w-5 ml-3 mr-3 text-white`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* {image == undefined && (
          <div className="flex space-x-4 items-center w-full justify-start">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-white text-sm py-2 text-base font-normal text-gray-500"
            >
              <div className="text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span className="flex text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 justify-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Upload Image
                  </span>
                  <input
                    id="file-upload"
                    onChange={(evt) => fileChanged(evt)}
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </button>

            <button
              onClick={() => addIcon("unsplash")}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-white text-sm py-2  font-normal text-gray-500"
            >
              Free Images
            </button>
          </div>
        )} */}

        {/* 
              Add object-cover and object-center classes to the image to preserve aspect ratio
              and center the image within its container.
            */}

        {/* {image != undefined && (
          <div className="border border-blue-500 flex space-x-2 items-center w-full">
            
            <img
              src={image}
              className={classNames(
                "w-20 h-20",
                imageSize === "big-square" && "w-40 h-40",
                imageSize === "big-rect" && "w-40 h-20",
                imageSize === "small-rect" && "w-20 h-10",
                "object-cover object-center border border-gray-800 bg-gray-800 rounded-lg"
              )}
            />
            <TrashIcon
              onClick={() => deleteImage()}
              className="w-5 h-5 cursor-pointer text-gray-600"
            />
          </div>
        )} */}

        {/* <button onClick={() => addIcon(true)}
            type="button"
            className="w-full inline-flex items-center rounded-md border border-transparent underline bg-white text-sm px-4 py-2 text-base font-normal text-gray-800"
            >
            Change Feature Icon
        </button> */}

        <Transition.Root show={imagePopup} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setImagePopup}>
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
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                    <div>
                      {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div> */}
                      <div className="mt-3 text-left sm:mt-1">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Select Icons
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="border-t border-gray-200 px-4 pt-2 pb-4 sm:px-0 outline-none">
                            <dl className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-1 justify-center text-left">
                              <div>
                                <input
                                  type="text"
                                  value={query}
                                  onChange={(e) => handleQuery(e.target.value)}
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm outline-none"
                                />
                              </div>
                              <div className="mt-2 w-full border border-gray-300 px-4 py-2 rounded-md h-96 overflow-y-auto">
                                <Body />
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700 sm:text-sm"
                        onClick={() => setTablesModalOpen(false)}
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
