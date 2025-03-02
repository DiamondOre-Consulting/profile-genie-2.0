import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export const ContainerScroll = ({
  // titleComponent,
  children,
}: {
  // titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [30, -35]);
  const smoothRotate = useSpring(rotate, {
    stiffness: 50,
    damping: 20,
  });

  const translateY = useTransform(scrollYProgress, [0, 0.65], [-61, 0])

  return (
    <motion.div
      ref={containerRef}
      style={{ translateY }}
      className="w-full overflow-hidden"
    >
      <div className="w-full" style={{ perspective: "900px", paddingTop: "0px" }}>
        <Card rotate={smoothRotate}>{children}</Card>
      </div>
    </motion.div>
  );
};

export const Card = ({
  rotate,
  children,
}: {
  rotate: any;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        boxShadow:
          "0 #0000004d, 9px 20px #0000004a, 37px #00000042, 84px 50px #00000026, 149px 60px #0000000a, 233px 65px #00000003",
      }}
      className="max-w-[70rem] mx-auto   w-[95vw] backdrop-blur p-4 bg-[#1a1a1aec] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 md:rounded-2xl ">
        {children}
      </div>
    </motion.div>
  );
};
