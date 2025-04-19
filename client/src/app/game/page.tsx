"use client";

import { useEffect, useState } from "react";
import GameHeader from "./components/GameHeader";
import CityClues from "./components/CityClues";
import OptionsGrid from "./components/OptionsGrid";
import FeedbackModal from "./components/FeedbackModal";

import { fetchRandomDestination, fetchScore, submitAnswer } from "./service";
import { RandomDestinationResponse, AnswerResponse } from "./type";

export default function GamePage() {
  const [username, setUsername] = useState("");
  const [cityData, setCityData] = useState<RandomDestinationResponse | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<AnswerResponse | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState({ score: 0, totalQuestions: 0 });

  // ✅ Load username and fetch score
  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);

    if (storedUsername) {
      fetchScore(
        storedUsername,
        (data) =>
          setScore({ score: data.score, totalQuestions: data.totalQuestions }),
        (err) => console.error(err)
      );
    }
  }, []);

  // ✅ Fetch a new city on mount and on next
  const loadNewCity = () => {
    setSelectedOption("");
    setCityData(null);
    fetchRandomDestination(
      (data) => setCityData(data),
      (err) => console.error(err)
    );
  };

  useEffect(() => {
    loadNewCity();
  }, []);

  // ✅ Submit answer
  const handleSubmit = () => {
    if (!cityData || !selectedOption) return;

    submitAnswer(
      {
        cityId: cityData.id,
        guess: selectedOption,
        username,
      },
      setLoading,
      (data) => {
        setFeedback(data);
        setScore({
          score: data.updatedScore,
          totalQuestions: data.totalQuestions,
        });
        setShowFeedback(true);
      },
      (err) => console.error(err)
    );
  };

  const handleNext = () => {
    setShowFeedback(false);
    setFeedback(null);
    loadNewCity();
  };

  const handlePlayAgain = () => {
    localStorage.removeItem("username");
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <GameHeader score={score} onPlayAgain={handlePlayAgain} />

      {cityData ? (
        <div className="max-w-2xl mx-auto mt-6 space-y-6">
          <CityClues clues={cityData.clues} />
          <OptionsGrid
            options={cityData.options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            disabled={loading || !!feedback}
          />

          <div className="flex justify-center">
            {!feedback ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption || loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Checking..." : "Submit"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">Loading city...</div>
      )}

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        feedback={feedback}
      />
    </div>
  );
}
