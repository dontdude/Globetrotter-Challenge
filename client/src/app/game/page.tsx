"use client";

import { useEffect, useState } from "react";
import GameHeader from "./components/GameHeader";
import CityClues from "./components/CityClues";
import OptionsGrid from "./components/OptionsGrid";
import FeedbackModal from "./components/FeedbackModal";
import { useUsername } from "@/hooks/useUsername";
import { handleInvite } from "@/lib/shareInviteLink";
import { notifyError, notifySuccess } from "@/lib/notify";
import { useSearchParams } from "next/navigation";
import { fetchRandomDestination, fetchScore, submitAnswer } from "./service";
import { RandomDestinationResponse, AnswerResponse } from "./type";

export default function GamePage() {
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

  // ✅ Load username and fetch score
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
  }, [storedUsername]);

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

  // ✅ Fetch a new city on mount and on next
  const loadNewCity = async () => {
    setSelectedOption("");
    setCityData(null);
    await fetchRandomDestination((data) => setCityData(data), notifyError);
  };

  // ✅ Submit answer
  const handleSubmit = async () => {
    if (!cityData || !selectedOption) return;

    const submitAnswerPayload = {
      cityId: cityData.id,
      guess: selectedOption,
      username,
    };

    const handleSubmitAnswerSuccess = (data: AnswerResponse) => {
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
    };

    await submitAnswer(
      submitAnswerPayload,
      setLoading,
      handleSubmitAnswerSuccess,
      notifyError
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
          {inviter && (
            <div className="text-center bg-white shadow-md p-4 rounded-xl text-purple-800 font-semibold mb-4">
              🎉 <span className="text-lg font-bold">{inviter.name}</span>{" "}
              invited you to play!
              <br />
              Their Score: {inviter.score} / {inviter.totalQuestions}
              <br />
              Can you beat them?
            </div>
          )}

          <CityClues clues={cityData.clues} />
          <OptionsGrid
            options={cityData.options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            disabled={loading || !!feedback}
          />

          <div className="flex justify-between items-center mt-4">
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
            {feedback && (
              <button
                onClick={() =>
                  handleInvite(username, score.score, score.totalQuestions)
                }
                className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600"
              >
                🤝 Challenge a Friend
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
