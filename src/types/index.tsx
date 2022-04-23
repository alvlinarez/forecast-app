interface TGeocodingAddress {
  coordinates: {
    x: string;
    y: string;
  };
}

export interface TGeocoding {
  data: {
    result: {
      addressMatches: TGeocodingAddress[];
    };
  };
}

export interface TWeather {
  data: {
    properties: {
      forecast: string;
    };
  };
}

export interface TForecastDay {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string | null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface TForecast {
  data: {
    properties: {
      periods: TForecastDay[];
    };
  };
}
