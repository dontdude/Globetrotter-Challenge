"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { CheckCircle, ArrowRightCircle } from "lucide-react";
import GameHeader from "./components/GameHeader";
import CityClues from "./components/CityClues";
import OptionsGrid from "./components/OptionsGrid";
import FeedbackModal from "./components/FeedbackModal";
import { useUsername } from "@/hooks/useUsername";
import { notifyError, notifySuccess } from "@/lib/notify";
import { useSearchParams } from "next/navigation";
import { fetchRandomDestination, fetchScore, submitAnswer } from "./service";
import { RandomDestinationResponse, AnswerResponse } from "./type";
import { Suspense } from "react";

export default function GamePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GamePageContent />
    </Suspense>
  );
}

const GamePageContent = () => {
  const storedUsername = useUsername() || "";
  const searchParams = useSearchParams();
  const invitedBy = searchParams.get("invitedBy");
  const [username, setUsername] = useState("");
  const [cityData, setCityData] = useState<RandomDestinationResponse | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<AnswerResponse | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState({ score: 0, totalQuestions: 0 });
  const [inviter, setInviter] = useState<null | {
    name: string;
    score: number;
    totalQuestions: number;
  }>(null);

  const loadNewCity = useCallback(async () => {
    setSelectedOption("");
    setCityData(null);
    await fetchRandomDestination(setCityData, notifyError);
  }, []);

  useEffect(() => {
    setUsername(storedUsername);
    loadNewCity();
    if (storedUsername) {
      fetchScore(
        storedUsername,
        (data) =>
          setScore({ score: data.score, totalQuestions: data.totalQuestions }),
        notifyError
      );
    }
  }, [storedUsername, loadNewCity]);

  useEffect(() => {
    if (invitedBy) {
      fetchScore(
        invitedBy,
        (data) =>
          setInviter({
            name: invitedBy,
            score: data.score,
            totalQuestions: data.totalQuestions,
          }),
        notifyError
      );
    }
  }, [invitedBy]);

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    setFeedback(null);
    loadNewCity();
  }, [loadNewCity]);

  useEffect(() => {
    if (feedback?.correct && !showFeedback) {
      const timer = setTimeout(() => handleNext(), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback, showFeedback, handleNext]);

  const handleSubmit = async () => {
    if (!cityData || !selectedOption) return;
    const payload = { cityId: cityData.id, guess: selectedOption, username };

    await submitAnswer(
      payload,
      setLoading,
      (data) => {
        setFeedback(data);
        setScore({
          score: data.updatedScore,
          totalQuestions: data.totalQuestions,
        });
        setShowFeedback(true);
        notifySuccess(
          data.correct
            ? "Correct! 🎉"
            : `Incorrect! The correct answer was ${data.correct_city}.`
        );
      },
      notifyError
    );
  };

  const handlePlayAgain = () => {
    if (window.confirm("Are you sure you want to start over?")) {
      localStorage.removeItem("username");
      window.location.href = "/home";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 pb-10">
      <GameHeader
        score={score}
        onPlayAgain={handlePlayAgain}
        username={username}
      />
      {cityData ? (
        <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-xl shadow-xl space-y-6">
          {inviter && (
            <div className="text-center bg-indigo-100 p-3 rounded-xl text-indigo-700 font-medium">
              🎉 <strong>{inviter.name}</strong> invited you!
              <br />
              Score: {inviter.score} / {inviter.totalQuestions} – Beat it!
            </div>
          )}

          <CityClues clues={cityData.clues} />

          <OptionsGrid
            options={cityData.options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            disabled={loading || !!feedback}
            isCorrect={feedback?.correct}
          />

          <div className="flex justify-center gap-4 pt-4">
            {!feedback ? (
              <motion.button
                onClick={handleSubmit}
                disabled={!selectedOption || loading}
                className={`bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 shadow-md ${
                  (!selectedOption || loading) &&
                  "opacity-50 cursor-not-allowed"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="animate-spin" size={20} />{" "}
                    Checking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle size={20} /> Submit Answer
                  </span>
                )}
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNext}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <ArrowRightCircle size={20} /> Next Challenge
                </span>
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500 text-lg animate-pulse">
          🌐 Fetching your next city...
        </div>
      )}

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        feedback={feedback}
      />
    </div>
  );
};
