interface RecentSearchesProps {
  searches: string[];
  onSelect: (city: string) => void;
}

const RecentSearches = ({ searches, onSelect }: RecentSearchesProps) => {
  if (searches.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
      <div className="flex flex-wrap gap-2">
        {searches.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
