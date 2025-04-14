const ContentFilterPanel = ({
    contentType,
    setContentType,
    duration,
    setDuration,
    releaseYear,
    setReleaseYear,
  }) => (
    <div className="mt-6">
      <div className="p-4 bg-[var(--panel-bg)] rounded-lg mb-2">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Content</h3>
      </div>
      <div className="p-4 pt-0">
        <div className="flex mb-6">
          {["Movies", "Series"].map((type) => (
            <button
              key={type}
              onClick={() => setContentType(type)}
              className={`flex-1 py-2 text-center rounded-lg mx-1 text-[var(--text-primary)] ${
                contentType === type
                  ? "bg-[var(--chip-selected)]"
                  : "bg-[var(--chip-default)] hover:bg-[var(--chip-hover)]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Duration</h4>
            <span className="text-[var(--text-secondary)]">{duration} min</span>
          </div>
          <input
            type="range"
            min="60"
            max="240"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--slider-bg)]"
            style={{
              accentColor: "var(--slider-thumb)",
              borderRadius: "9999px",
              WebkitAppearance: "none",
            }}
          />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Release Year</h4>
            <span className="text-[var(--text-secondary)]">{releaseYear}</span>
          </div>
          <input
            type="range"
            min="1950"
            max="2025"
            value={releaseYear}
            onChange={(e) => setReleaseYear(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--slider-bg)]"
            style={{
              accentColor: "var(--slider-thumb)",
              borderRadius: "9999px",
              WebkitAppearance: "none",
            }}
          />
        </div>
      </div>
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
          margin-top: -5px;
        }
        input[type='range']::-moz-range-thumb {
          height: 12px;
          width: 12px;
          background: var(--slider-thumb);
          border-radius: 50%;
          border: 2px solid var(--slider-thumb-border);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
  
  export default ContentFilterPanel;
  