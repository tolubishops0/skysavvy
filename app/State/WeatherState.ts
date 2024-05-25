import { makeAutoObservable, toJS } from "mobx";
import { CoordinatesI, CityData } from "@/global";

class WeatherState {
  currCityCoords: CoordinatesI | null = null;
  cityWeather: CityData | null = null;
  isLoading: boolean = false;
  error: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setError = (errors: number | null, isLoading: boolean) => {
    this.error = errors;
    this.isLoading = isLoading;
  };

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
