import { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { searchCitySuggestions } from "../Services/aqi.service";

interface SearchBarProps {
  city: string;
  loading: boolean;
  onCityChange: (value: string) => void;
  onSearch: (searchTerm?: string) => void;
}

const SearchBar = ({ city, loading, onCityChange, onSearch }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<{ name: string; uid: number }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Debounce logic to prevent API spam while typing
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (city.length >= 3) {
        const results = await searchCitySuggestions(city);
        setSuggestions(results);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [city]);

  const handleSelectCity = (cityName: string) => {
    // Clean up the name (API often returns "Name, Country" -> we might just want the raw string)
    onCityChange(cityName);
    setSuggestions([]);
    setShowDropdown(false);
    onSearch(cityName); // Trigger search immediately
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 mb-8 z-50">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={city}
            onChange={(e) => {
                onCityChange(e.target.value);
                setShowDropdown(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Enter city name (e.g. Delhi)"
            className="w-full pl-12 pr-4 py-4 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            // Close dropdown when clicking outside (simple version)
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
          />
          
          {/* 👇 SUGGESTIONS DROPDOWN */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute w-full bg-white mt-2 rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-50">
              {suggestions.map((s) => (
                <div
                  key={s.uid}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center gap-2 text-gray-700"
                  onClick={() => handleSelectCity(s.name)}
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{s.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onSearch()}
          disabled={loading}
          className="px-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-indigo-700 transition-colors"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>
    </div>
  );
};
export default SearchBar;