import { makeAutoObservable, toJS } from "mobx";
import { CoordinatesI, CityData } from "@/global";

class WeatherState {
  currCityCoords: CoordinatesI | null = null;
  cityWeather: CityData | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrCityLoc = (coords: CoordinatesI | null, isLoading: boolean) => {
    this.currCityCoords = coords;
    this.isLoading = isLoading;
  };

  setCityWeather = (cityWeatherData: CityData | null, isLoading: boolean) => {
    this.cityWeather = cityWeatherData;
    this.isLoading = isLoading;
  };
}

const weatherState = new WeatherState();
export default weatherState;
