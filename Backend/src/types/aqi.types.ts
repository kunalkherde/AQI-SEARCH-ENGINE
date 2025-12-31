// Structure of data coming from the External API (waqi.info)
export interface IAqiData {
  aqi: number;
  city: {
    name: string;
    url: string;
  };
  iaqi?: {
    pm25?: { v: number };
    pm10?: { v: number };
    no2?: { v: number };
    o3?: { v: number };
    t?: { v: number }; // Temperature
    h?: { v: number }; // Humidity
    w?: { v: number }; // Wind
  };
  time: {
    s: string;
  };
}

// Structure of the response your backend sends to the frontend
export interface IApiResponse {
  success: boolean;
  data: IAqiData;
  source?: 'cache' | 'api'; // Useful for debugging
}