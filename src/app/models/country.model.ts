export interface Country {
  countryName: string;
  capitalName: string;
  flag: string;
  coordinates: Coordinates;
  weather?: Weather;
  forecast?: Forecast[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface WeatherApiResponse {
  coord: {};
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export interface Weather {
  coordinates: {};
  temp: number;
  description: string;
  icon: string;
}

export interface ForecastApiResponse {
  list: {
    dt_txt: string;
    main: { temp_min: number; temp_max: number };
  }[];
}

export interface Forecast {
  date: string;
  temp_max: number;
  temp_min: number;
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
