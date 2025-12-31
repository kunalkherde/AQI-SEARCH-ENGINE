import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
// 👇 UNCOMMENT THESE IMPORTS
import { getAqi ,searchCities } from './controllers/aqi.controller'; 
// import { errorHandler } from './middleware/error.middleware'; // Optional if you haven't created this yet

dotenv.config();

const app: Express = express();
// 👇 CHANGE THIS TO 3000 (Your frontend is looking for port 3000)
const PORT = process.env.PORT || 3000;

app.use(helmet());

// CORS: Allow Frontend (running on port 5173 usually)
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this if your frontend runs on a different port
  credentials: true,
}));

app.use(express.json());

// 👇 DEFINING THE ROUTE DIRECTLY (Since route file is commented out)
// If you have a separate routes file, uncomment that instead.
app.get('/api/aqi', getAqi); 
app.get('/api/cities', searchCities);

// Health Check (Optional but good)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Start server
app.listen(PORT, () => {
  console.log('===========================================');
  console.log(`✅ AQI Search Service Started Successfully!`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('===========================================');
});

export default app;