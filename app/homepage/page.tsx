"use client";
import React from "react";
import Nav from "../Nav";
import ThemeSwitch from "../ThemToggle";
import { IGetCity } from "@/global";

const HomePage = () => {
  return (
    <div className="w-[100%] mx-auto">
      <ThemeSwitch />
      <Nav />
    </div>
  );
};

export default HomePage;
