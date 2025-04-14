"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [contentType, setContentType] = useState("Movies");
  const [duration, setDuration] = useState(120);
  const [releaseYear, setReleaseYear] = useState(2000);
  const [activePanel, setActivePanel] = useState(null);

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Animation",
    "Documentary",
    "Family",
    "Musical",
    "War"
  ];

  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.closest(".filter-panel")) {
        setActivePanel(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      <div className="flex-1 relative">
        <img
          src="https://readdy.ai/api/search-image?query=A%20dramatic%20cinematic%20scene%20with%20pure%20black%20background%20featuring%20a%20mysterious%20silhouette%20emerging%20from%20darkness%2C%20illuminated%20by%20subtle%20rim%20lighting.%20The%20composition%20is%20minimalist%20and%20stark%2C%20with%20deep%20shadows%20and%20controlled%20highlights%20creating%20a%20powerful%20contrast.%20Professional%20studio%20lighting%20setup%20emphasizes%20the%20dramatic%20atmosphere.&width=1440&height=1024&seq=1&orientation=landscape"
          alt="Movie Scene"
          className="w-full h-full object-cover object-top absolute inset-0 z-0"
        />
        <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black to-transparent w-full z-10">
          <h2 className="text-5xl font-bold mb-2">The Silent Echo</h2>
          <div className="flex items-center text-sm mb-3">
            <span className="mr-3">2025</span>
            <span className="mr-3">•</span>
            <span className="mr-3">124 min</span>
            <span className="mr-3">• <i className="fas fa-star text-yellow-400 mr-1"></i>8.7</span>
          </div>
          <div className="flex mb-4">
            <span className="bg-gray-700 text-sm px-3 py-1 rounded-full mr-2">Drama</span>
            <span className="bg-gray-700 text-sm px-3 py-1 rounded-full mr-2">Mystery</span>
            <span className="bg-gray-700 text-sm px-3 py-1 rounded-full">Thriller</span>
          </div>
          <p className="text-gray-300 max-w-2xl">
            A psychological thriller about a detective who loses his hearing in an accident and must solve a high-profile case using his other senses, uncovering dark secrets about the victims and confronting his own past trauma in the process.
          </p>
          <div className="flex mt-6">
            <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full mr-4">
              <i className="fas fa-times text-red-500"></i>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full mr-4">
              <i className="fas fa-info-circle text-blue-400"></i>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full">
              <i className="fas fa-heart text-green-500"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="w-[400px] bg-black p-6 shadow-md z-20 filter-panel">
        <h2 className="text-2xl font-bold mb-6">Genres</h2>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActivePanel(activePanel === "genres" ? null : "genres");
          }}
          className="cursor-pointer"
        >
          <div className="p-4 flex justify-between items-center bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold">Select up to 5 genres</h3>
            <i className={`fas fa-chevron-${activePanel === "genres" ? "up" : "down"}`}></i>
          </div>
          {activePanel === "genres" && (
            <div className="p-4 pt-2">
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
                    <h4 className="text-sm font-semibold">{genre} Weight</h4>
                    <span className="text-gray-400">7.0</span>
                  </div>
                  <input
                    type="range"
                    min="6.0"
                    max="9.0"
                    step="0.1"
                    defaultValue="7.0"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setActivePanel(activePanel === "content" ? null : "content");
          }}
          className="cursor-pointer mt-6"
        >
          <div className="p-4 flex justify-between items-center bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold">Content Type</h3>
            <i className={`fas fa-chevron-${activePanel === "content" ? "up" : "down"}`}></i>
          </div>
          {activePanel === "content" && (
            <div className="p-4 pt-2">
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
          )}
        </div>
      </div>
    </div>
  );
}
