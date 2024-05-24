"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import weatherState from "../State/WeatherState";
import { CoordinatesI, IGetCityWeatherr } from "@/global";

const useFetchLoc = (): IGetCityWeatherr => {
  const [currCityLoc, setCurrCityLoc] = useState<CoordinatesI | null>(null);
  const [isLoading, setisLoading] = useState<boolean | false>(false);
  const [currLocationweather, setLocationCurrweather] = useState<object | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setisLoading(true);
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const coords: CoordinatesI = {
        lat: latitude,
        lon: longitude,
      };
      setCurrCityLoc(coords);
      setisLoading(false);
      weatherState.setCurrCityLoc(coords, isLoading);
    };

    const handleError = (error: GeolocationPositionError) => {
      weatherState.setCurrCityLoc(null, false);
      setError(error.message);
      setisLoading(false);
      toast("Please enable your location");
    };
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  useEffect(() => {
    setisLoading(true);
    if (currCityLoc) {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${currCityLoc.lat}&lon=${currCityLoc.lon}&appid=${apikey}&cnt=5&units=metric`;
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          setisLoading(false);
          setLocationCurrweather(response);
          weatherState.setCityWeather(response, isLoading);
        })
        .catch((error) => {
          setisLoading(false);
          toast(error.message);
        });
    }
  }, [currCityLoc]);

  const getCityWeather = (cityTerm: string) => {
    setisLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityTerm}&appid=${apikey}&cnt=5&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setisLoading(false);
        setLocationCurrweather(response);
        weatherState.setCityWeather(response, isLoading);
      })
      .catch((error) => {
        setisLoading(false);
        toast(error.message);
      });
  };
  return { getCityWeather };
};

export default useFetchLoc;
