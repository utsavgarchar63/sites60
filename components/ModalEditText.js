import { useEffect, useState } from 'react';
import { Dialog, Transition, Fragment } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const ModalEditText = ({ showEditText, closeEditText, sectionName, editTextContent }) => {
  const [open, setOpen] = useState(showEditText);
  const [editText, setEditText] = useState(editTextContent);

  useEffect(() => {
    setOpen(showEditText);
    setEditText(editTextContent); // Ensure editText is set when editTextContent changes
  }, [showEditText, editTextContent]);

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={closeEditText}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {sectionName === 'headingEdit' && 'Edit Heading'}
                      {sectionName === 'subHeadEdit' && 'Edit Sub-heading'}
                    </Dialog.Title>
                    <div className="mt-2 flex space-x-4 items-center">
                      <div>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="text"
                            name="text"
                            id="heading"
                            className="block w-96 rounded-md border border-slate-200 bg-white pl-4 py-1.5 pr-10 text-slate-800 placeholder:text-slate-300 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                            placeholder="Enter Text"
                            aria-invalid="true"
                            aria-describedby="text-error"
                            value={editText}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* <div className="flex-shrink-0">
                        <CheckCircleIcon onClick={closeEditText} className="h-8 w-8 text-green-400 cursor-pointer" aria-hidden="true" />
                      </div> */}
                    </div>
                    <div className="mt-5 sm:mt-6 flex sm:gap-3">
                      <button
                        type="button"
                        className="mt-3  inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={closeEditText}
                        data-autofocus
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-orange-400 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={closeEditText}
                        data-autofocus
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalEditText;
