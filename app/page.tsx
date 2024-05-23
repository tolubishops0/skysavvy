"use client";
import React, { useEffect, useState } from "react";
import ThemeSwitch from "./ThemToggle";
import GetStarted from "./Components/GetStarted";
import AccessLocation from "./Components/AccessLocation";
import useCuurLoc from "./hooks/useCuurLoc";
import weatherState from "./State/WeatherState";
import Loader from "./Components/Loader";
import { ToastContainer } from "react-toastify";

export default function Home() {
  useCuurLoc();
  const { isLoadingCurrCityLocation, currCityCoords } = weatherState;
  const [intialLoad, setIntialLoad] = useState<Boolean | null>(false);

  useEffect(() => {
    setIntialLoad(true);
    setTimeout(() => {
      setIntialLoad(false);
    }, 2000);
  }, []);

  return (
    <div className="h-full w-[90%] mx-auto">
      <ThemeSwitch />
      {intialLoad ? (
        <Loader />
      ) : currCityCoords ? (
        <GetStarted isLoadingCurrCityLocation={isLoadingCurrCityLocation} />
      ) : (
        <AccessLocation />
      )}
    </div>
  );
}
