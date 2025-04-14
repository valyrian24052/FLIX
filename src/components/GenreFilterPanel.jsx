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
      <div className="p-4 bg-[var(--panel-bg)] rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Genre</h3>
      </div>
      <div className="p-4 pt-0">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {genres.map((genre) => (
            <div
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={`cursor-pointer p-2 rounded-lg text-sm text-center transition-colors text-[var(--text-primary)] ${
                selectedGenres.includes(genre)
                  ? "bg-[var(--chip-selected)]"
                  : "bg-[var(--chip-default)] hover:bg-[var(--chip-hover)]"
              }`}
            >
              {genre}
            </div>
          ))}
        </div>
        {selectedGenres.map((genre) => (
          <div key={genre} className="mb-4">
            <div className="flex justify-between mb-1">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">{genre}</h4>
              <span className="text-[var(--text-secondary)]">{genreWeights[genre]}</span>
            </div>
            <input
              type="range"
              min="6.0"
              max="9.0"
              step="0.1"
              value={genreWeights[genre]}
              onChange={(e) => handleSliderChange(genre, e.target.value)}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--slider-bg)]"
              style={{
                accentColor: "var(--slider-thumb)",
                borderRadius: "9999px",
                WebkitAppearance: "none",
              }}
            />
            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                height: 12px;
                width: 12px;
                background: var(--slider-thumb);
                border-radius: 50%;
                border: 2px solid var(--slider-thumb-border);
                cursor: pointer;
                margin-top: -7px;
              }
              input[type='range']::-moz-range-thumb {
                height: 8px;
                width: 8px;
                background: var(--slider-thumb);
                border-radius: 50%;
                border: 2px solid var(--slider-thumb-border);
                cursor: pointer;
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreFilterPanel;
