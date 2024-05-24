import React, { useState, memo, useEffect } from "react";
import weatherState from "./State/WeatherState";
import { toJS } from "mobx";
import { IGetCity } from "@/global";
import Loader from "./Components/Loader";
import locationicom from "../app/Asset/locicon.svg";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import useFetchLoc from "./hooks/useFetchLoc";

const SearchInput = ({ getCityTerm, setCityTerm, cityTerm }: IGetCity) => {
  return (
    <form className="flex items-center h-12 bg-[transparent] ">
      <input
        onChange={(e) => setCityTerm(e.target.value)}
        className="input"
        type="text"
        placeholder="enter text"
        value={cityTerm}
      />
      {/* <p
        style={{
          borderRadius: "0 .5rem .5rem 0",
          border: "1px solid rgb(234 179 8 1)",
          background: "red",
        }}>
        X
      </p> */}
      <button
        onClick={getCityTerm}
        style={{
          borderRadius: "0 .5rem .5rem 0",
          border: "1px solid rgb(234 179 8 1)",
        }}
        className="w-[30%] lg:w-[10%] h-full flex items-center justify-center bg-goldColor">
        <CiSearch fontWeight={"bold"} />
      </button>
    </form>
  );
};

const Nav = () => {
  const { cityWeather } = weatherState;
  const { getCityWeather } = useFetchLoc();
  const [cityTerm, setCityTerm] = useState<string | "">("");
  const city = cityWeather?.city;
  const list = cityWeather?.list;

  const getCityTerm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getCityWeather(cityTerm);
  };

  return (
    <div>
      {!cityWeather ? (
        <Loader />
      ) : (
        <div className="shadow-gold">
          <div className="w-[90%] mx-auto h-48 lg:h-40 flex flex-col justify-center gap-y-10">
            <div className="flex justify-between items-center ">
              <div>
                <p className="font-black font-[briem-hand]">SkySavvy</p>
              </div>
              <div className="hidden md:block w-[50%]">
                <SearchInput
                  getCityTerm={getCityTerm}
                  setCityTerm={setCityTerm}
                  cityTerm={cityTerm}
                />
              </div>
              <div className="flex gap-x-4 justify-center items-center">
                <Image
                  width={20}
                  height={20}
                  src={locationicom}
                  alt="location-icon"
                />
                <p>{city?.name}</p>
              </div>
            </div>
            <div className="block md:hidden">
              <SearchInput
                getCityTerm={getCityTerm}
                setCityTerm={setCityTerm}
                cityTerm={cityTerm}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
