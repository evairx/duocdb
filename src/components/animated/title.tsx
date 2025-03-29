import { useState } from "react";
import { motion } from "framer-motion";

export default function Title() {
  const [isHovered, setIsHovered] = useState(false);

  const title = "Buscar estudiante";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 5, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex items-center justify-center p-4 mb-2 select-none cursor-default">
      <div className="text-center w-full max-w-5xl mx-auto">
        <motion.div
          className="overflow-hidden w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex justify-center flex-wrap gap-1 mb-2">
            {title.split("").map((char, index) => (
              <motion.span
                key={`title-${index}`}
                className="text-2xl md:text-3xl font-bold text-black inline-block"
                variants={letterVariants}
                animate={
                  isHovered
                    ? {
                        y: [0, -5, 0],
                        transition: {
                          duration: 0.5,
                          delay: index * 0.05,
                          ease: "easeInOut",
                        },
                      }
                    : {}
                }
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}