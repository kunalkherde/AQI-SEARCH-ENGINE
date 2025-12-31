import { Activity } from 'lucide-react';

interface AqiGaugeProps {
  aqi: number;
  level?: string;
}

const getGaugeColor = (aqi: number) => {
  if (aqi <= 50) return 'text-green-500';
  if (aqi <= 100) return 'text-yellow-500';
  if (aqi <= 150) return 'text-orange-500';
  if (aqi <= 200) return 'text-red-500';
  if (aqi <= 300) return 'text-purple-600';
  return 'text-rose-800';
};

const getRotation = (aqi: number) => {
  // AQI range 0–500 mapped to -90° to +90°
  const capped = Math.min(Math.max(aqi, 0), 500);
  return -90 + (capped / 500) * 180;
};

const AqiGauge = ({ aqi, level }: AqiGaugeProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Activity className="text-indigo-600" />
        AQI Gauge
      </h3>

      {/* Gauge Container */}
      <div className="relative w-56 h-28 overflow-hidden">
        {/* Arc */}
        <div className="absolute inset-0 rounded-t-full border-12 border-gray-200" />

        {/* Needle */}
        <div
          className="absolute bottom-0 left-1/2 w-1 h-24 bg-gray-800 origin-bottom transition-transform duration-700"
          style={{ transform: `rotate(${getRotation(aqi)}deg)` }}
        />

        {/* Center Dot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full" />
      </div>

      {/* AQI Value */}
      <div className={`mt-6 text-5xl font-bold ${getGaugeColor(aqi)}`}>
        {aqi}
      </div>

      {/* AQI Level */}
      <div className="text-lg font-semibold text-gray-700 mt-1">
        {level}
      </div>

      {/* Scale */}
      <div className="flex justify-between w-full text-xs text-gray-500 mt-4 px-2">
        <span>0</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
        <span>500</span>
      </div>
    </div>
  );
};

export default AqiGauge;
