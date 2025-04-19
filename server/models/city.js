import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  clues: [String],
  fun_fact: [String],
  trivia: [String],
});

const City = mongoose.model("City", citySchema);

export default City;
