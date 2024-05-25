import { IconType } from "react-icons";

export interface CoordinatesI {
  lon: number | null;
  lat: number | null;
}
export interface CityData {
  city: WeatherData;
  list: WeatherForecast[];
}

export interface WeatherData {
  id: number;
  name: string;
  coord: CoordinatesI;
  country: string;
  population: number;
  sunrise: number;
  sunset: number;
  timeZone: number;
}
export interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
}

export interface IGetCity {
  getCityTerm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setCityTerm: React.Dispatch<React.SetStateAction<string>>;
  cityTerm: string;
}

export interface IGetCityWeatherr {
  getCityWeather: (cityTerm: string) => void;
}

export interface IIconSize {
  size: number;
}

export interface NavContentType {
  label: string;
  link: string;
  icon: IconType | React.ComponentType;
  // iconT: React.ComponentType | null;
  size: number;
}
