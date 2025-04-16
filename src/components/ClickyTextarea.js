"use client";

import React from "react";
import Textarea from "@/clicky-components/Textarea/Textarea";

const ClickyTextarea = ({ value, onChange }) => {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      className="w-full h-full resize-none focus:outline-none focus:ring-0 border-none p-4 pt-0"
      placeholder="Start typing..."
    />
  );
};

export default ClickyTextarea;
