import React, { useEffect, useRef, useState } from "react";

// Define cursor colors
type CursorColors = {
  [key: string]: string;
};

const CURSOR_COLORS: CursorColors = {
  h1: "green-400",
  button: "orange-500",
  default: "sky-500",
};

// Main CustomCursor component
const CustomCursor: React.FC = () => {
  // Reference to the cursor element
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // State to track cursor position
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // State to track cursor color
  const [cursorColor, setCursorColor] = useState<string>("sky-500");

  // State to track click event
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    // Event listener for mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Event listener for mouse click
    const handleMouseDown = () => {
      setClicked(true);
      // Reset click state after 800 milliseconds
      setTimeout(() => {
        setClicked(false);
      }, 800);
    };

    // Event listener for mouseover (hover) on HTML elements
    const handleMouseOver = (e: MouseEvent) => {
      // Get the HTML tag name
      const tagName =
        e.target instanceof HTMLElement ? e.target.tagName.toLowerCase() : "";
      // Set cursor color based on the tag, default to "sky-500"
      setCursorColor(CURSOR_COLORS[tagName] || CURSOR_COLORS["default"]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Apply cursor position and color styles
  const cursorStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    backgroundColor: cursorColor,
  };

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${clicked ? "clicked" : ""}`}
      style={cursorStyles}
    />
  );
};

export default CustomCursor;
