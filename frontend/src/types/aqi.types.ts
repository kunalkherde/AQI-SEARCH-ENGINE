// frontend/src/types/aqi.types.ts

export interface Pollutant {
  name: string;
  value: number;
  unit: string;
}

export interface AqiTrend {
  direction: "up" | "down" | "stable";
  message: string;
  icon: string;
}

export interface AqiData {
  city: string;
  aqi: number;
  level: string;
  healthImplication: string;
  cautionaryStatement: string;
  pollutants?: Pollutant[];
  sensitiveGroups?: string[];
  trend?: AqiTrend;
  lastUpdated?: string;
}

export interface AqiApiResponse {
  success: boolean;
  data: AqiData;
  message?: string;
}
