import React, { useState, useEffect } from 'react';
import './CardStack.css';

const CardStack = ({ items }) => {
  const [stack, setStack] = useState(items);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prevStack) => {
        const [first, ...rest] = prevStack;
        return [...rest, first]; // move the first card to the end
      });
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index) => {
    let style = {};
    if (index === 0) {
      style = { ...style, zIndex: 3, opacity: 1 };
    } else if (index === 1) {
      style = { ...style, transform: 'scale(0.95)', zIndex: 2, opacity: 0.7 };
    } else {
      style = { ...style, transform: 'scale(0.9)', zIndex: 1, opacity: 0.4 };
    }
    return style;
  };

  return (
    <div className="card-stack">
      {stack.slice(0, 3).map((content, index) => (
        <div key={index} className="card" style={getCardStyle(index)}>
          {content}
        </div>
      ))}
    </div>
  );
};

export default CardStack;
