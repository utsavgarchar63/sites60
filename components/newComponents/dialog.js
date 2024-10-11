import React, { useState, useEffect } from 'react';

const Dialog = ({ isOpen, onClose, onSubmit, title, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    isOpen && (

      <>
      {/* {title === "addsection"} */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-bold mb-4">{title}</h3>
          <textarea 
            className="w-full h-48 p-2 border border-gray-300 rounded" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="px-4 py-2 bg-gray-300 text-black rounded" onClick={onClose}>Cancel</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      </>
    )
  );
};

export default Dialog;
