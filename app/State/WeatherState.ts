import { makeAutoObservable, toJS } from "mobx";
import { CoordinatesI } from "@/global";

class WeatherState {
  currCityCoords: CoordinatesI | null = null;
  isLoadingCurrCityLocation: Boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrCityLoc = (coords: CoordinatesI, isLoadingCurrLoc: Boolean) => {
    this.currCityCoords = coords;
    this.isLoadingCurrCityLocation = isLoadingCurrLoc;
  };
}

const weatherState = new WeatherState();
export default weatherState;
