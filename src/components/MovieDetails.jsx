const MovieDetails = () => (
    <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black to-transparent w-full z-10">
      <h2 className="text-5xl font-bold mb-2">The Silent Echo</h2>
      <div className="flex items-center text-sm mb-3">
        <span className="mr-3">2025</span>
        <span className="mr-3">•</span>
        <span className="mr-3">124 min</span>
        <span className="mr-3">
          • <i className="fas fa-star text-yellow-400 mr-1"></i>8.7
        </span>
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
  );
  
  export default MovieDetails;
  