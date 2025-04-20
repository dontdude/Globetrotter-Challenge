"use client";

import { motion } from "framer-motion";
import { ArrowLeftCircle, SendHorizonal } from "lucide-react";
import { useCallback } from "react";
import { notifySuccess } from "@/lib/notify";
import { handleInvite } from "@/lib/shareInviteLink";

type Props = {
  score: { score: number; totalQuestions: number };
  onPlayAgain: () => void;
  username?: string;
};

export default function GameHeader({
  score,
  onPlayAgain,
  username = "Your friend",
}: Props) {
  const onChallenge = useCallback(() => {
    handleInvite(username, score.score, score.totalQuestions);
    notifySuccess("Challenge link copied! 🔗 Send it to your friend.");
  }, [username, score]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg px-8 py-6 flex flex-col md:flex-row items-center justify-between rounded-b-3xl gap-4 md:gap-0"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-500 drop-shadow-sm tracking-tight"
      >
        Globetrotter Challenge
      </motion.div>

      <div className="flex items-center flex-wrap gap-4 md:gap-6">
        <div
          title="Your current score"
          className="relative px-4 py-2 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-800 font-semibold shadow-sm flex items-center justify-center text-base"
        >
          🏆
          <span className="text-indigo-600 text-lg font-bold mx-1">
            {score.score}
          </span>
          <span className="text-gray-600 text-sm">
            / {score.totalQuestions}
          </span>
        </div>
        <motion.button
          onClick={onChallenge}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-all flex items-center gap-2 text-sm md:text-base"
          title="Invite your friend to beat your score!"
        >
          <SendHorizonal className="w-5 h-5" />
          Invite a Friend
        </motion.button>
        <motion.button
          onClick={onPlayAgain}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm md:text-base transition"
          title="Restart the quiz"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Play Again
        </motion.button>
      </div>
    </motion.header>
  );
}
