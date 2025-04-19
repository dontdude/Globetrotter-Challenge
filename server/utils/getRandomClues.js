export const getRandomClues = (clues) => {
  const shuffled = clues.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};
