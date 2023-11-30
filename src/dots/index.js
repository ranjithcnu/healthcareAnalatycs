import React from 'react';

function Dots({ count = 50 }) {
  const dots = Array.from({ length: count }).map((_, i) => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    animationDuration: 5 + Math.random() * 10 + "s",
    animationDelay: Math.random() * 5 + "s",
  }));

  return (
    <>
      {dots.map((dot, index) => (
        <div
          key={index}
          className="dot"
          style={{
            top: dot.top,
            left: dot.left,
            animationDuration: dot.animationDuration,
            animationDelay: dot.animationDelay,
          }}
        ></div>
      ))}
    </>
  );
}

export default Dots;
