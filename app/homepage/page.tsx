"use client";
import React from "react";
import Nav from "../Nav";
import useFetchLoc from "../hooks/useFetchLoc";
import ThemeSwitch from "../ThemToggle";

const HomePage = () => {
  useFetchLoc();
  return (
    <div>
      <ThemeSwitch />
      <Nav />
    </div>
  );
};

export default HomePage;
