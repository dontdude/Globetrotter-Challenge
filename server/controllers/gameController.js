import City from "../models/city.js";
import User from "../models/user.js";
import { getRandomClues } from "../utils/getRandomClues.js";

// GET /destination/random
export const getRandomDestination = async (req, res) => {
  try {
    const count = await City.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const city = await City.findOne().skip(randomIndex);

    const clues = getRandomClues(city.clues);

    // Generate decoy cities (excluding the correct one)
    const decoyCities = await City.aggregate([
      { $match: { _id: { $ne: city._id } } },
      { $sample: { size: 3 } },
      { $project: { city: 1 } },
    ]);

    const options = [...decoyCities.map((c) => c.city), city.city];

    const shuffledOptions = options.sort(() => 0.5 - Math.random());

    res.json({
      clues,
      options: shuffledOptions,
      id: city._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch destination" });
  }
};

// POST /answer
export const checkAnswer = async (req, res) => {
  const { cityId, guess, username } = req.body;

  if (!cityId || !guess || !username) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const city = await City.findById(cityId);
    const user = await User.findOne({ username });

    if (!city || !user) {
      return res.status(404).json({ error: "City or user not found." });
    }

    const isCorrect = city.city.toLowerCase() === guess.trim().toLowerCase();
    const funFact =
      city.fun_fact[Math.floor(Math.random() * city.fun_fact.length)];

    // Update user score and attempt count
    user.totalQuestions += 1;
    if (isCorrect) {
      user.score += 1;
    }

    await user.save();

    // Response payload
    res.status(200).json({
      correct: isCorrect,
      emoji: isCorrect ? "🎉" : "😢",
      correct_city: city.city,
      fun_fact: funFact,
      updatedScore: user.score,
      totalQuestions: user.totalQuestions,
    });
  } catch (error) {
    console.error("Answer check failed:", error);
    res.status(500).json({ error: "Answer check failed." });
  }
};
