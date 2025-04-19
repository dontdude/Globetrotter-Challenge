import connectDB from "./config/db.js";
import City from "./models/city.js";
import cities from "./data/cities.json" assert { type: "json" };

const seedDatabase = async () => {
  await connectDB();

  try {
    await City.deleteMany(); // Clear existing data
    await City.insertMany(cities); // Seed new data
    console.log("🌱 Cities Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Database Seeding failed:", err);
    process.exit(1);
  }
};

seedDatabase();
