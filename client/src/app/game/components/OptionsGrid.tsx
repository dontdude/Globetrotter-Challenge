"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface OptionsGridProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  disabled?: boolean;
}

export default function OptionsGrid({
  options,
  selectedOption,
  setSelectedOption,
  disabled = false,
}: OptionsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((option, index) => {
        const isSelected = selectedOption === option;

        return (
          <motion.button
            key={index}
            whileTap={{ scale: 0.97 }}
            onClick={() => !disabled && setSelectedOption(option)}
            disabled={disabled}
            className={clsx(
              "w-full py-3 px-4 text-lg font-medium rounded-xl border transition-colors duration-200",
              isSelected
                ? "bg-indigo-600 text-white border-indigo-700 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}
