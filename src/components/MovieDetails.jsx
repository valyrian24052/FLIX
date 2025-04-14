const MovieDetails = () => (
    <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black to-transparent w-full z-10 font-[var(--font-sans)]">
      <h2 className="text-5xl font-bold mb-2 text-[var(--text-primary)]">The Silent Echo</h2>
      <div className="flex items-center text-sm mb-3 text-[var(--text-secondary)]">
        <span className="mr-3">2025</span>
        <span className="mr-3">•</span>
        <span className="mr-3">124 min</span>
        <span className="mr-3">
          • <i className="fas fa-star text-yellow-400 mr-1"></i>8.7
        </span>
      </div>
      <div className="flex mb-4">
        <span className="bg-[var(--chip-default)] text-sm px-3 py-1 rounded-full mr-2 text-[var(--text-primary)]">Drama 4.9</span>
        <span className="bg-[var(--chip-default)] text-sm px-3 py-1 rounded-full mr-2 text-[var(--text-primary)]">Mystery 8.1</span>
        <span className="bg-[var(--chip-default)] text-sm px-3 py-1 rounded-full text-[var(--text-primary)]">Thriller 9.2</span>
      </div>
      <p className="text-[var(--text-secondary)] max-w-2xl">
        A psychological thriller about a detective who loses his hearing in an accident and must solve a high-profile case using his other senses, uncovering dark secrets about the victims and confronting his own past trauma in the process.
      </p>
      <div className="flex mt-6">
        <button className="bg-[var(--panel-bg)] hover:bg-[var(--chip-hover)] p-3 rounded-full mr-4">
          <i className="fas fa-times text-red-500"></i>
        </button>
        <button className="bg-[var(--panel-bg)] hover:bg-[var(--chip-hover)] p-3 rounded-full mr-4">
          <i className="fas fa-info-circle text-blue-400"></i>
        </button>
        <button className="bg-[var(--panel-bg)] hover:bg-[var(--chip-hover)] p-3 rounded-full">
          <i className="fas fa-heart text-green-500"></i>
        </button>
      </div>
    </div>
  );
  
  export default MovieDetails;