import axios from 'axios';
import { AqiData } from '../types/aqi.types'; 

// This points to your Node.js Backend URL
const API_URL = 'http://localhost:8080/api/aqi';

export const fetchAqiByCity = async (city: string): Promise<AqiData> => {
    try {
        // We call the Backend API, NOT the external API directly
        const response = await axios.get<{ success: boolean; data: AqiData }>(API_URL, {
            params: { city }
        });
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch AQI data. City might not exist.');
    }
};
export const searchCitySuggestions = async (keyword: string) => {
  if (keyword.length < 3) return [];
  try {
    // Note: We are calling the new 'cities' endpoint
    const response = await axios.get('http://localhost:8080/api/cities', { 
      params: { keyword } 
    });
    return response.data.data || [];
  } catch (error) {
    return [];
  }
};