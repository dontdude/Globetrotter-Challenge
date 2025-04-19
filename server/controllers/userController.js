import User from "../models/user.js";

// POST /register-user
export const registerUser = async (req, res) => {
  const { username } = req.body;

  if (!username)
    return res.status(400).json({ error: "Username is required." });

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username });
    }

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: "User registration failed." });
  }
};

// GET /score/:username
export const getScore = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found." });

    res.status(200).json({
      score: user.score,
      totalQuestions: user.totalQuestions,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user score." });
  }
};
