// frontend/src/App.tsx
import { useState } from "react";
import { Wind, AlertCircle } from "lucide-react";

import SearchBar from "./Components/SearchBar";
import AqiCard from "./Components/AqiCard";
import AqiGauge from "./Components/AqiGauge";
import PollutantChart from "./Components/PollutantChart";
import RecentSearches from "./Components/RecentSearches";

import { AqiData } from "./types/aqi.types";
import { fetchAqiByCity } from "./Services/aqi.service";

const App = () => {
  const [city, setCity] = useState("");
  const [aqiData, setAqiData] = useState<AqiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // FIX 1: Handle both String input (from RecentSearches) and Event (from SearchBar button)
  const handleSearch = async (term?: string | any) => {
    // If 'term' is a string, use it. Otherwise, use the state 'city'.
    const cityToSearch = typeof term === 'string' ? term : city;

    if (!cityToSearch.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAqiByCity(cityToSearch);
      
      if (!data) {
        throw new Error("City not found or data unavailable");
      }
      
      setAqiData(data);

      if (!recentSearches.includes(cityToSearch)) {
        setRecentSearches((prev) => [cityToSearch, ...prev.slice(0, 4)]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch AQI data");
      setAqiData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-3">
          <Wind className="w-10 h-10 text-indigo-600" />
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Air Quality Index</h1>
            <p className="text-gray-600 text-sm">Real-time air quality monitoring</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <SearchBar
          city={city}
          loading={loading}
          onCityChange={setCity}
          onSearch={() => handleSearch(city)} // Explicitly pass city string
        />

        <RecentSearches
          searches={recentSearches}
          onSelect={(selectedCity) => {
            setCity(selectedCity);
            handleSearch(selectedCity);
          }}
        />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700">Error</p>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {aqiData && (
          <div className="space-y-6">
            {/* FIX 2: Pass data correctly. AqiCard needs to accept 'AqiData' type now. */}
            <AqiCard data={aqiData} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* FIX 3: AqiGauge only takes 'aqi' unless you updated it to take 'level' */}
               <AqiGauge aqi={aqiData.aqi} />
               
               {/* FIX 4: Pass 'pollutants' array, not 'iaqi' object */}
               {aqiData.pollutants && aqiData.pollutants.length > 0 && (
                 <PollutantChart pollutants={aqiData.pollutants} />
               )}
            </div>
          </div>
        )}

        {!aqiData && !loading && !error && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <Wind className="w-20 h-20 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Search Air Quality</h2>
            <p className="text-gray-600 mt-2">Enter a city name to view real-time AQI data</p>
          </div>
        )}
      </main>
      
      {/* Footer code ... */}
    </div>
  );
};

export default App;