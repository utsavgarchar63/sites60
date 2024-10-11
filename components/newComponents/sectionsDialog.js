import React from 'react';

const SectionsDialog = ({ isOpen, onClose, onInsert, sections }) => {
  if (!isOpen) return null;
  

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="bg-white w-[70%]">
            <div className='p-6 rounded-lg shadow-lg  h-96 overflow-auto'>
          <h3 className="text-lg font-bold mb-4">Select a Section to Insert</h3>
          <div className='gap-4 grid grid-cols-4 '>
          {sections.map((section, index) => (
            <button key={index} onClick={() => onInsert(section.html)} className="block  w-full text-left p-2 mb-2 border border-gray-300 rounded hover:bg-gray-100">
              {section.id}
            </button>
          ))}
          
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="px-4 py-2 bg-gray-300 text-black rounded" onClick={onClose}>Cancel</button>
          </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default SectionsDialog;
