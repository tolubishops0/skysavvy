import { makeAutoObservable, toJS } from "mobx";
import { CoordinatesI } from "@/global";

class WeatherState {
  currCityLocation: CoordinatesI | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrCityLoc = (coords: CoordinatesI) => {
    this.currCityLocation = coords;
  };
}

const weatherState = new WeatherState();
export default weatherState;
