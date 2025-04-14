import { useState } from "react";

const GenreFilterPanel = ({ genres, selectedGenres, setSelectedGenres }) => {
  const [genreWeights, setGenreWeights] = useState(
    Object.fromEntries(genres.map((g) => [g, 7.0]))
  );

  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSliderChange = (genre, value) => {
    setGenreWeights((prev) => ({
      ...prev,
      [genre]: parseFloat(value),
    }));
  };

  return (
    <div className="mb-6">
      <div className="p-4 bg-gray-800 rounded-lg mb-4">
        <h3 className="text-lg font-semibold">Genre</h3>
      </div>
      <div className="p-4 pt-0">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {genres.map((genre) => (
            <div
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={`cursor-pointer p-2 rounded-lg text-sm text-center transition-colors ${
                selectedGenres.includes(genre)
                  ? "bg-gray-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {genre}
            </div>
          ))}
        </div>
        {selectedGenres.map((genre) => (
          <div key={genre} className="mb-4">
            <div className="flex justify-between mb-1">
              <h4 className="text-sm font-semibold">{genre}</h4>
              <span className="text-gray-400">{genreWeights[genre]}</span>
            </div>
            <input
              type="range"
              min="6.0"
              max="9.0"
              step="0.1"
              value={genreWeights[genre]}
              onChange={(e) => handleSliderChange(genre, e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreFilterPanel;
