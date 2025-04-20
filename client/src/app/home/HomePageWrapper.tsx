import dynamic from "next/dynamic";
import { Suspense } from "react";

const HomePageContent = dynamic(() => import("./components/HomePageContent"), {
  ssr: false,
});

export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
