import React from 'react';
import PixelCursor from '../assets/pixel-hand.png'; // Make sure this path is correct for your project

const PixelButton = ({ children, onClick, type = "primary", ...props }) => {
  // Define base styles for all pixel buttons
  const baseClasses = "pixel-button cursor-pixel";

  // Define specific styles based on the 'type' prop
  let buttonClasses = "";
  switch (type) {
    case "primary": // For the "Choose File" button
      buttonClasses = "choose-file";
      break;
    case "secondary": // For the "START" button
      buttonClasses = "start";
      break;
    case "back": // For the "Back" button
      buttonClasses = "back";
      break;
    default:
      buttonClasses = "primary"; // Default to primary if no type is specified
  }

  return (
    <button
      className={`${baseClasses} ${buttonClasses}`}
      onClick={onClick}
      {...props}
    >
      {children}
      <style jsx>{`
        /* This is the self-contained CSS for the button.
          It uses the same values as the Tailwind classes but is
          pure CSS to ensure it works in any setup.
        */
        .pixel-button {
          font-family: 'pixel-regular', monospace; /* Ensure you have this font imported */
          font-size: 1.25rem;
          padding: 0.5rem 2rem;
          border-width: 4px;
          border-style: solid;
          border-radius: 4px;
          transition-property: background-color, color;
          transition-duration: 200ms;
          cursor: url(${PixelCursor}), auto;
        }

        /* Style for the "Choose File" button */
        .pixel-button.choose-file {
          background-color: #EF7B45;
          color: #222222;
          border-color: #FF0081;
        }
        .pixel-button.choose-file:hover {
          background-color: #FF0081;
          color: white;
        }

        /* Style for the "START" button */
        .pixel-button.start {
          background-color: #FF0081;
          color: white;
          border-color: #EF7B45;
        }
        .pixel-button.start:hover {
          background-color: #EF7B45;
          color: #222222;
        }

        /* Style for the "Back" button (as seen in one of your images) */
        .pixel-button.back {
          background-color: #EF7B45;
          color: #222222;
          border-color: #FF0081;
          border-radius: 9999px; /* This will give it the pill shape */
        }
        .pixel-button.back:hover {
          background-color: #FF0081;
          color: white;
        }
      `}</style>
    </button>
  );
}

export default PixelButton;