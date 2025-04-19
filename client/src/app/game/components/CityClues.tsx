"use client";

import { motion } from "framer-motion";

type Props = {
  clues: string[];
};

const clueVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function CityClues({ clues }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-4">
      {clues.map((clue, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={clueVariants}
          className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 px-4 py-3 rounded-md shadow-sm"
        >
          <span className="font-medium">Clue {index + 1}:</span> {clue}
        </motion.div>
      ))}
    </div>
  );
}
