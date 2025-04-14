const ContentFilterPanel = ({
    contentType,
    setContentType,
    duration,
    setDuration,
    releaseYear,
    setReleaseYear,
  }) => (
    <div className="mt-6">
      <div className="p-4 bg-gray-800 rounded-lg mb-4">
        <h3 className="text-lg font-semibold">Content Type</h3>
      </div>
      <div className="p-4 pt-0">
        <div className="flex mb-6">
          {["Movies", "Series"].map((type) => (
            <button
              key={type}
              onClick={() => setContentType(type)}
              className={`flex-1 py-2 text-center rounded-lg mx-1 ${
                contentType === type
                  ? "bg-gray-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <h4 className="text-sm font-semibold">Duration</h4>
            <span className="text-gray-400">{duration} min</span>
          </div>
          <input
            type="range"
            min="60"
            max="240"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <h4 className="text-sm font-semibold">Release Year</h4>
            <span className="text-gray-400">{releaseYear}</span>
          </div>
          <input
            type="range"
            min="1950"
            max="2025"
            value={releaseYear}
            onChange={(e) => setReleaseYear(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
  
  export default ContentFilterPanel;
  