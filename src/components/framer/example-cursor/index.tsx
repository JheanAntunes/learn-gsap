"use client";
import {
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { MotionDiv } from "../components";
import { useEffect, useState } from "react";

const ExampleCursorWithFramerMotion = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseMove = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <section className="flex items-center justify-center h-svh">
      <h1
        className="text-6xl text-neutral-50 p-20 font-serif font-medium"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        Desenvolvedor Front-end
      </h1>
      <Cursor isHovered={isHovered} />
    </section>
  );
};

type CursorProps = {
  isHovered: boolean;
};

const Cursor = ({ isHovered }: CursorProps) => {
  const sizeCursor = isHovered ? 300 : 30;
  //Ele pode ser atualizado com o set método. Isso não acionará uma nova renderização do React.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springOptions: SpringOptions = {
    damping: 20,
    stiffness: 150,
  };
  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerCursor = sizeCursor / 2;
      // atualizando animação.
      x.set(clientX - centerCursor);
      y.set(clientY - centerCursor);
    };
    //add event mouseMove in window
    window.addEventListener("mousemove", handleMouseMove);
    //clearnup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sizeCursor, x, y]);

  return (
    <MotionDiv
      style={{
        height: sizeCursor,
        width: sizeCursor,
        x: xSpring,
        y: ySpring,
        filter: `blur(${isHovered ? "30px" : "0px"})`,
        transition:
          "height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out",
      }}
      className="fixed mix-blend-difference top-0 left-0 bg-neutral-50 rounded-full pointer-events-none"
    />
  );
};

export default ExampleCursorWithFramerMotion;
