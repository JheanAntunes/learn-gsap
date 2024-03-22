"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

type CursorProps = {
  isHovered: boolean;
};
const Cursor = ({ isHovered }: CursorProps) => {
  const sizeCursor = isHovered ? 400 : 30;
  const refCircle = useRef<HTMLDivElement>(null);
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
  const delayedMouse = useRef({
    x: 0,
    y: 0,
  });
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const moveCircle = (x: number, y: number) => {
    gsap.set(refCircle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;
    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };
    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    const handleMenageMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouse.current = {
        x: clientX,
        y: clientY,
      };
    };
    window.addEventListener("mousemove", handleMenageMouseMove);

    return () => {
      //clearnup
      window.removeEventListener("mousemove", handleMenageMouseMove);
    };
  }, []);

  return (
    <div
      ref={refCircle}
      className={`fixed top-0 left-0 bg-[#0CE4F2] rounded-full mix-blend-difference pointer-events-none`}
      style={{
        height: sizeCursor,
        width: sizeCursor,
        filter: `blur(${isHovered ? "30px" : "0px"})`,
        transition:
          "height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out",
      }}
    />
  );
};

export default Cursor;
