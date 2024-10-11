import { useState, useEffect, Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { createApi } from "unsplash-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TrashIcon,
  CloudUploadIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const api = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
});

function UploadImage({ index, size, imageUrl, imageChanged }) {
  const [imagePopup, setImagePopup] = useState(false);
  const [query, setQuery] = useState("all");
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imageSize, setImageSize] = useState("small-round");

  // Upload code START
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setLoading(true);
      // Simulate file upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  // Upload Code END

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
    if (size) {
      setImageSize(size);
    }
  }, [imageUrl, size]);

  const uploadImage = async (file) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("media", file);

    try {
      const res = await fetch("/api/uploadMedia", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
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

  const deleteImage = () => {
    imageChanged("delete", undefined, index);
    setImage(undefined);
  };

  const Body = () => {
    const [data, setPhotosResponse] = useState(null);

    useEffect(() => {
      api.search
        .getPhotos({ query: query, page: 1, perPage: 20 })
        .then((result) => {
          setPhotosResponse(result);
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }, [query]);

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
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {data.response.results.map((photo) => (
              <li key={photo.id} className="relative">
                <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <img
                    onClick={() => closeUnsplash(photo.urls.regular)}
                    src={photo.urls.regular}
                    alt=""
                    className="cursor-pointer object-cover object-center group-hover:opacity-75"
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
        {loader && (
          <button
            type="button"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="animate-spin ml-3 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
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
            Uploading Media....
          </button>
        )}
        <div className="space-x-4 items-center w-full justify-start h-10">
          <button
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
                  name={"file-upload" + index}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="sr-only outline-none"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      uploadImage(file);
                    }
                  }}
                />
              </label>
            </div>
          </button>
          <button
            onClick={() => setImagePopup(true)}
            type="button"
            className="inline-flex items-center rounded-md bg-white border border-gray-300 text-sm px-3 py-2 font-normal text-gray-500"
          >
            <CloudUploadIcon
              className="-ml-1 mr-1 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <span> Unsplash</span>
          </button>
          {image && (
            <>
              <button
                onClick={deleteImage}
                type="button"
                className="inline-flex items-center rounded-md bg-white border border-gray-300 text-sm px-3 py-2 font-normal text-gray-500"
              >
                <TrashIcon
                  className="-ml-1 mr-1 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                <span> Delete Image</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white border border-gray-300 text-sm px-3 py-2 font-normal text-gray-500"
              >
                <CheckCircleIcon
                  className="-ml-1 mr-1 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                <span> Image uploaded</span>
              </button>
            </>
          )}
        </div>
      </div>

      <Transition.Root show={imagePopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setImagePopup(false)}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Choose Image
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="col-span-6 sm:col-span-3">
                          <div className="mt-1">
                            <input
                              type="text"
                              name="price"
                              id="price"
                              onChange={(e) => setQuery(e.target.value)}
                              value={query}
                              autoComplete="off"
                              className="block w-full h-10 border p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                            />
                          </div>
                          <Body />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => setImagePopup(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default UploadImage;
