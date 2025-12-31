// backend/src/config/app.config.ts
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: 3000, 
  aqiApiUrl: 'https://api.waqi.info/feed',
  aqiApiKey: process.env.AQI_API_KEY || 'demo', 
};