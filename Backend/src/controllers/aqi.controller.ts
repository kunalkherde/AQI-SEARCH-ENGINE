import { Request, Response, NextFunction } from 'express';
import { aqiService } from '../services/aqi.service';

export const getAqi = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const city = req.query.city as string;
    
    if (!city) {
      return res.status(400).json({ success: false, message: 'City name is required' });
    }

    const result = await aqiService.getAqiByCity(city);
    
    res.json({
      success: true,
      data: result.data,
      source: result.source
    });
  } catch (error: any) {
    // If city not found, send 404, otherwise 500
    const status = error.message.includes('City not found') ? 404 : 500;
    res.status(status).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};
export const searchCities = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    const results = await aqiService.searchCities(keyword || "");
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, data: [] });
  }
};