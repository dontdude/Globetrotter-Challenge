"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Eye, EyeOff } from "lucide-react";

type Props = {
  clues: string[];
};

const clueVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function CityClues({ clues }: Props) {
  const [showSecondClue, setShowSecondClue] = useState(false);

  if (!clues?.length) {
    return (
      <div className="text-center text-gray-500 italic">
        No clues available for this city.
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-4">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={clueVariants}
        className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 px-5 py-4 rounded-md shadow-sm flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 mt-1 text-yellow-600" />
        <div>
          <div className="font-semibold mb-1">Clue 1</div>
          <div>{clues[0]}</div>
        </div>
      </motion.div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowSecondClue((prev) => !prev)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 transition"
        >
          {showSecondClue ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showSecondClue ? "Hide Second Clue" : "Show Second Clue"}
        </button>
      </div>

      <AnimatePresence>
        {showSecondClue && clues[1] && (
          <motion.div
            key="clue-2"
            custom={1}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 px-5 py-4 rounded-md shadow-sm flex items-start gap-3"
          >
            <Lightbulb className="w-5 h-5 mt-1 text-yellow-600" />
            <div>
              <div className="font-semibold mb-1">Clue 2</div>
              <div>{clues[1]}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
