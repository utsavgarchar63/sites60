import React, { useState, useEffect } from 'react';

const CustomCarousel = ({ children, interval = 3000 }) => {
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  const nextChild = () => {
    setCurrentChildIndex((prev) => (prev + 1) % React.Children.count(children));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextChild();
    }, interval);

    return () => clearInterval(timer);
  }, [currentChildIndex, children, interval]);

  return (
    <div className="relative overflow-hidden">
     
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`w-full h-full absolute top-0 left-0 transition-transform duration-500 ${
            index === currentChildIndex ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {child}
        </div>
      ))}

      <button
        onClick={() => setCurrentChildIndex((prev) => (prev - 1 + React.Children.count(children)) % React.Children.count(children))}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full focus:outline-none"
      >
        &#8592;
      </button>

      <button
        onClick={nextChild}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full focus:outline-none"
      >
        &#8594;
      </button>
    </div>
  );
};

export default CustomCarousel;
