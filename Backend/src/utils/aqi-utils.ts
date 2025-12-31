// frontend/src/utils/aqi-utils.ts

/**
 * Get AQI level category based on AQI value
 */
export function getAqiLevel(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export function getHealthImplication(aqi: number): string {
  if (aqi <= 50) return "Air quality is satisfactory, and air pollution poses little or no risk.";
  if (aqi <= 100) return "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.";
  if (aqi <= 150) return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
  if (aqi <= 200) return "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.";
  if (aqi <= 300) return "Health alert: The risk of health effects is increased for everyone.";
  return "Health warning of emergency conditions: everyone is more likely to be affected.";
}

export function getCautionaryStatement(aqi: number): string {
  if (aqi <= 50) return "None";
  if (aqi <= 100) return "Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion.";
  if (aqi <= 150) return "Sensitive groups should reduce prolonged or heavy outdoor exertion.";
  if (aqi <= 200) return "People with respiratory or heart disease, the elderly and children should limit prolonged outdoor exertion.";
  if (aqi <= 300) return "People with respiratory or heart disease, the elderly and children should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.";
  return "Everyone should avoid all outdoor exertion.";
}

export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return "from-green-400 to-green-600";
  if (aqi <= 100) return "from-yellow-400 to-yellow-600";
  if (aqi <= 150) return "from-orange-400 to-orange-600";
  if (aqi <= 200) return "from-red-400 to-red-600";
  if (aqi <= 300) return "from-purple-400 to-purple-600";
  return "from-red-700 to-red-900";
}

export function getAqiTextColor(aqi: number): string {
  if (aqi <= 50) return "text-green-600";
  if (aqi <= 100) return "text-yellow-600";
  if (aqi <= 150) return "text-orange-600";
  if (aqi <= 200) return "text-red-600";
  if (aqi <= 300) return "text-purple-600";
  return "text-red-800";
}

export function getSensitiveGroups(aqi: number): string[] {
  if (aqi <= 50) return [];
  if (aqi <= 100) return ["Unusually sensitive people"];
  if (aqi <= 150) return ["Children", "Elderly", "People with respiratory conditions"];
  if (aqi <= 200) return ["Children", "Elderly", "People with respiratory or heart disease"];
  return ["Everyone"];
}

export function getAqiTrend(currentAqi: number, previousAqi: number): {
  direction: 'up' | 'down' | 'stable';
  message: string;
  icon: string;
} {
  const difference = currentAqi - previousAqi;
  // Prevent division by zero if previousAqi is 0
  const percentChange = previousAqi === 0 ? 0 : Math.abs((difference / previousAqi) * 100);
  
  if (Math.abs(difference) < 5) {
    return { direction: 'stable', message: 'Air quality is stable', icon: '➡️' };
  } else if (difference > 0) {
    return { direction: 'up', message: `Air quality worsened by ${percentChange.toFixed(1)}%`, icon: '📈' };
  } else {
    return { direction: 'down', message: `Air quality improved by ${percentChange.toFixed(1)}%`, icon: '📉' };
  }
}