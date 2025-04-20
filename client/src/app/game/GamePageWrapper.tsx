"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GamePageContent = dynamic(() => import("./components/GamePageContent"), {
  ssr: false,
});

export default function GamePageWrapper() {
  return (
    <Suspense fallback={<div>Loading game...</div>}>
      <GamePageContent />
    </Suspense>
  );
}
