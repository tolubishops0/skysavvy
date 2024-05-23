"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import weatherState from "../State/WeatherState";
import { CoordinatesI } from "@/global";

const useCuurLoc = () => {
  const [currCityLoc, setCurrCityLoc] = useState<CoordinatesI | null>(null);
  const [isLoadingCurrLoc, setisLoadingCurrLoc] = useState<Boolean>(false);
  const [currLocationweather, setLocationCurrweather] = useState<object | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setisLoadingCurrLoc(true);
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const coords: CoordinatesI = {
        lat: latitude,
        lon: longitude,
      };
      setCurrCityLoc(coords);
      weatherState.setCurrCityLoc(coords);
      setisLoadingCurrLoc(false);
    };
    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      setisLoadingCurrLoc(false);
      toast("Please enable your location");
    };
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);
};

export default useCuurLoc;
