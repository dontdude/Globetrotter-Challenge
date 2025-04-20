"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface OptionsGridProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  disabled?: boolean;
  isCorrect?: boolean;
}

export default function OptionsGrid({
  options,
  selectedOption,
  setSelectedOption,
  disabled = false,
  isCorrect,
}: OptionsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((option, index) => {
        const isSelected = selectedOption === option;

        const showFeedback = isSelected && isCorrect !== undefined;
        const correct = showFeedback && isCorrect;
        const incorrect = showFeedback && !isCorrect;

        return (
          <motion.button
            key={option}
            whileTap={{ scale: 0.97 }}
            onClick={() => !disabled && setSelectedOption(option)}
            disabled={disabled}
            className={clsx(
              "w-full relative group py-3 px-5 text-base sm:text-lg font-medium rounded-xl border transition-all duration-200 flex items-center gap-3",
              !isSelected &&
                "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50 hover:border-indigo-500",

              correct && "bg-green-100 border-green-500 text-green-800", // Correct answer style
              incorrect && "bg-red-100 border-red-500 text-red-800", // Incorrect answer style
              isSelected &&
                !showFeedback &&
                "bg-indigo-600 text-white border-indigo-700 shadow-lg",

              disabled && "cursor-not-allowed opacity-90"
            )}
          >
            <div
              className={clsx(
                "w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold",
                isSelected
                  ? "bg-white text-indigo-600"
                  : "bg-indigo-100 text-indigo-600"
              )}
            >
              {index + 1}
            </div>

            <span className="flex-1 text-left">{option}</span>

            {correct && <CheckCircle className="w-5 h-5 text-green-500" />}
            {incorrect && <XCircle className="w-5 h-5 text-red-500" />}
          </motion.button>
        );
      })}
    </div>
  );
}
