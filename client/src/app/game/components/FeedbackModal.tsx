import React, { useEffect, useState } from "react";
import Lottie, { LottieOptions } from "lottie-react";
import confettiAnimation from "../../../../public/assets/lottie/confetti.json"; // Correct answer animation
import sadFaceAnimation from "../../../../public/assets/lottie/sad-face.json"; // Incorrect answer animation

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: {
    correct: boolean;
    emoji: string;
    correct_city: string;
    fun_fact: string;
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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-sm w-full space-y-6">
        <div className="text-center">
          <Lottie animationData={animationData} loop={false} />
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold">
            {feedback.emoji} {feedback.correct ? "Correct!" : "Incorrect"}
          </h2>
          <p className="text-lg">
            {feedback.correct_city} was the correct city!
          </p>
          <p className="text-sm text-gray-600">{feedback.fun_fact}</p>

          <div className="mt-4">
            <p className="text-xl font-semibold">
              Score: {feedback.updatedScore}/{feedback.totalQuestions}
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={onClose}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 w-full"
            >
              {feedback.correct ? "Next" : "Try Another"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
