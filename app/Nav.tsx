"use client";
import React from "react";
import weatherState from "./State/WeatherState";
import { toJS } from "mobx";
import { CityData } from "@/global";
import Loader from "./Components/Loader";

const Nav = () => {
  const { cityWeather, isLoading } = weatherState;
  console.log(toJS(cityWeather), "cityWeather fronav");
  return (
    <div>
      {!cityWeather ? (
        <Loader />
      ) : (
        <div>
          <p className="font-black font-[briem-hand]">SkySavvy</p>
        </div>
      )}
    </div>
  );
};

export default Nav;
