"use client";

import { useState } from "react";
import BackgroundImage from "@/components/BackgroundImage";
import MovieDetails from "@/components/MovieDetails";
import GenreFilterPanel from "@/components/GenreFilterPanel";
import ContentFilterPanel from "@/components/ContentFilterPanel";

export default function Home() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [contentType, setContentType] = useState("Movies");
  const [duration, setDuration] = useState(120);
  const [releaseYear, setReleaseYear] = useState(2000);

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

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      <div className="flex-1 relative">
        <BackgroundImage />
        <MovieDetails />
      </div>
      <div className="w-[400px] bg-black p-6 shadow-md z-20 filter-panel">
        <GenreFilterPanel
          genres={genres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <ContentFilterPanel
          contentType={contentType}
          setContentType={setContentType}
          duration={duration}
          setDuration={setDuration}
          releaseYear={releaseYear}
          setReleaseYear={setReleaseYear}
        />
      </div>
    </div>
  );
}