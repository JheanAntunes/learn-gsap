"use client";
import React, { useState } from "react";
import Cursor from "./cursor";

const SceneOne = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="h-full flex items-center justify-center">
      <h1
        className="text-[4.5vw] max-w-[93vw] text-center text-white p-20"
        onMouseMove={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Quick brown fox jumps over the lazy dog
      </h1>
      <Cursor isHovered={isHovered} />
    </div>
  );
};

export default SceneOne;
