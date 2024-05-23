"use client";
import ThemeSwitch from "./ThemToggle";
import GetStarted from "./GetStarted";
import useCuurLoc from "./hooks/useCuurLoc";

export default function Home() {
  useCuurLoc();
  return (
    <div className="h-full w-[90%] mx-auto">
      <ThemeSwitch />
      <GetStarted />
    </div>
  );
}
