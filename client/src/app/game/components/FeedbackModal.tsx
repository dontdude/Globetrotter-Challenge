import React, { useEffect, useState } from "react";
import Lottie, { LottieOptions } from "lottie-react";
import { ArrowRightCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import confettiAnimation from "../../../../public/assets/lottie/confetti.json";
import sadFaceAnimation from "../../../../public/assets/lottie/sad-face.json";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: {
    correct: boolean;
    emoji: string;
    correct_city: string;
    fun_fact: string[];
    updatedScore: number;
    totalQuestions: number;
  } | null;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  feedback,
}) => {
  const [animationData, setAnimationData] = useState<
    LottieOptions["animationData"] | null
  >(null);

  useEffect(() => {
    if (feedback?.correct) {
      setAnimationData(confettiAnimation);
    } else {
      setAnimationData(sadFaceAnimation);
    }
  }, [feedback]);

  if (!isOpen || !feedback) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white rounded-2xl px-6 py-8 max-w-lg w-full shadow-xl"
        >
          <div className="text-center">
            <Lottie
              animationData={animationData}
              loop={true}
              className="h-40 mx-auto"
            />
          </div>

          <div className="text-center mt-4 space-y-4">
            <h2 className="text-4xl font-extrabold">
              {feedback.emoji} {feedback.correct ? "Correct!" : "Incorrect"}
            </h2>

            <p className="text-lg text-gray-800">
              <strong>{feedback.correct_city}</strong> was the correct city!
            </p>

            <div className="mt-6 text-left space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-indigo-600">
                <Sparkles className="w-5 h-5" /> Fun Facts
              </h3>
              {feedback.fun_fact.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.2 }}
                  className="bg-indigo-50 text-indigo-900 px-4 py-3 rounded-lg border-l-4 border-indigo-400 shadow-sm"
                >
                  {fact}
                </motion.div>
              ))}
            </div>

            <div className="mt-3">
              <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1 rounded-xl inline-block">
                <div className="bg-white px-6 py-2 rounded-xl text-xl font-semibold text-gray-800">
                  Score: {feedback.updatedScore} / {feedback.totalQuestions}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundPosition: "right center" }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 text-white px-6 py-3 rounded-xl font-bold w-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <ArrowRightCircle size={20} />
              {feedback.correct ? "Next Challenge" : "Try Another"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
