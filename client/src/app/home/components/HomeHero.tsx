import { Sparkles } from "lucide-react";

export const HomeHero = () => (
  <div className="text-center mb-8">
    <h1 className="text-5xl font-bold text-white drop-shadow-lg">
      <Sparkles
        className="inline-block mr-2 text-yellow-300 animate-pulse"
        size={40}
      />
      Globetrotter Challenge
    </h1>
    <p className="text-lg mt-2 text-white/90">Guess the city. Share the fun!</p>
  </div>
);
