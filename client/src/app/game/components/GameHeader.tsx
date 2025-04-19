"use client";

import { ArrowLeftCircle } from "lucide-react";

type Props = {
  score: { score: number; totalQuestions: number };
  onPlayAgain: () => void;
};

export default function GameHeader({ score, onPlayAgain }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex items-center justify-between rounded-b-2xl">
      <div className="text-xl font-semibold text-gray-800">
        🌍 Globetrotter Challenge
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-sm md:text-base text-gray-600">
          Score:{" "}
          <span className="font-bold text-indigo-600">{score.score}</span> /{" "}
          {score.totalQuestions}
        </div>

        <button
          onClick={onPlayAgain}
          className="flex items-center gap-2 text-sm md:text-base text-red-500 hover:text-red-600 font-medium transition"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </header>
  );
}
