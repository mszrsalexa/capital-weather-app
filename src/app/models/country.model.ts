export interface Country {
  country: string;
  capital: string;
  flag: string;
  coordinates: Coordinates;
  weather?: Weather;
  fiveDayForecast?: { coordinates: Coordinates; forecast: Forecast[] };
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface WeatherApiResponse {
  main: { temp: number; temp_min: number; temp_max: number };
  weather: { description: string; icon: string }[];
}

export interface Weather {
  coordinates: Coordinates;
  temp: number;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}

export interface ForecastApiResponse {
  list: {
    dt_txt: string;
    main: { temp: number; temp_min: number; temp_max: number };
    weather: { description: string; icon: string }[];
  }[];
}

export interface Forecast {
  date: string;
  day: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}

export interface DistanceMatrixResponse {
  rows: {
    elements: DistanceMatrixElement[];
  }[];
}

export interface DistanceMatrixElement {
  status: 'OK' | 'ZERO_RESULTS';
  distance: {
    value: number;
  };
}

export interface SortConfig {
  type: SortType;
  order: SortOrder;
}

export type MapType = 'roadmap' | 'satellite';
export type SortType = 'country' | 'capital' | 'weather.temp';
export type SortOrder = 'asc' | 'desc';
