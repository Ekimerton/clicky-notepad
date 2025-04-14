"use client";

import React, { useState, useEffect, useRef } from "react";
import Textarea from "@/clicky-components/Textarea/Textarea"; // Assuming Textarea is here

const ClickyTextarea = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const LOCAL_STORAGE_KEY = "clickyNotepadContent";

  // Load from localStorage on initial render
  useEffect(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
      setValue(savedContent);
    }
  }, []);

  // Save to localStorage whenever value changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      className="w-full h-full resize-none focus:outline-none focus:ring-0 border-none" // Make it full screen and remove focus rings/borders
      placeholder="Start typing..."
    />
  );
};

export default ClickyTextarea;
