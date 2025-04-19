"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      router.push("/game");
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-purple-400">
      <motion.h1
        className="text-5xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🌍 Globetrotter Challenge
      </motion.h1>

      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center w-[90%] max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label className="text-lg font-medium text-gray-700 mb-2">
          Enter Your Name
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g., Chandan"
          className="w-full p-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
        />

        <button
          onClick={handleStart}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl transition-all"
        >
          🚀 Start Game
        </button>
      </motion.div>
    </main>
  );
}
