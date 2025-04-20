"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsername } from "@/hooks/useUsername";
import { sanitizeUsername } from "@/lib/sanitizeUsername";
import { motion } from "framer-motion";
import { registerUser } from "../service";
import { notifyError, notifySuccess } from "@/lib/notify";
import { HomeHero } from "./HomeHero";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

const HomeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingUsername = useUsername();
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");
  const invitedBy = searchParams.get("invitedBy");

  useEffect(() => {
    if (existingUsername) {
      setInputName(existingUsername);
    }
  }, [existingUsername]);

  const handleStart = async () => {
    const username = sanitizeUsername(inputName);

    if (!username) {
      setError("Please enter a valid username (letters, numbers, _, -)");
      return;
    }

    await registerUser(
      { username },
      (data) => notifySuccess(data?.message || "User registered successfully"),
      notifyError
    );

    setError("");
    localStorage.setItem("username", username);

    let url = `/game?username=${username}`;
    if (invitedBy) url += `&invitedBy=${invitedBy}`;

    router.push(url);
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#8EC5FC] to-[#E0C3FC]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <HomeHero />
      </motion.div>

      <motion.div
        className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center w-[90%] max-w-md backdrop-blur-xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label className="text-xl font-semibold text-gray-800 mb-3">
          Enter Your Username
        </label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="e.g., Chandan"
          className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-3 text-center text-lg"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 shadow-md"
        >
          🚀 Start Game
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Your progress will be saved under this username
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-6 text-white text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {invitedBy ? (
          <span>
            You were invited by <strong>{invitedBy}</strong>! Challenge your
            friends now!
          </span>
        ) : (
          "Invite your friends and challenge them!"
        )}
      </motion.div>
    </main>
  );
};
