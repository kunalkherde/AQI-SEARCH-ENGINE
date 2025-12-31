import axios from 'axios';
import { config } from '../config/app.config';
import { cacheService } from './cache.service';
import { IAqiData } from '../types/aqi.types';

export class AqiService {
  
  public async getAqiByCity(city: string): Promise<{ data: IAqiData, source: 'cache' | 'api' }> {
    const normalizedCity = city.toLowerCase().trim();
    
    // 1. Check Cache
    const cachedData = cacheService.get<IAqiData>(normalizedCity);
    if (cachedData) {
      return { data: cachedData, source: 'cache' };
    }

    // 2. Fetch from External API
    try {
      const url = `${config.aqiApiUrl}/${normalizedCity}/?token=${config.aqiApiKey}`;
      const response = await axios.get(url);

      if (response.data.status !== 'ok') {
        throw new Error('City not found or API error');
      }

      const data = response.data.data;

      // 3. Store in Cache
      cacheService.set(normalizedCity, data);
      
      return { data, source: 'api' };
    } catch (error: any) {
      // Log the error internally for debugging, but throw a clean message
      console.error(`[AQI Service Error] Failed to fetch data for ${city}:`, error.message);
      throw error;
    }
  }
  public async searchCities(keyword: string) {
    try {
      // API requires at least 3 chars for good results
      if (keyword.length < 3) return [];

      const url = `https://api.waqi.info/search/?token=${config.aqiApiKey}&keyword=${keyword}`;
      const response = await axios.get(url);

      if (response.data.status === 'ok') {
        // We map the results to just get the names
        return response.data.data.map((item: any) => ({
           name: item.station.name,
           uid: item.uid
        }));
      }
      return [];
    } catch (error) {
      console.error("Search Error:", error);
      return [];
    }
  }
}

export const aqiService = new AqiService();