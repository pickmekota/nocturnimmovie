export default function FavoritesSidebar({
  favorites,
  onClose,
  onSelectMovie,
  isOpen,
  removeFavorite,
  clearFavorites,
}) {
  return (
    <div
      className={`fixed top-16 right-0 h-[80vh] w-80 bg-[#1a0d3a]/80 rounded-l-lg shadow-lg z-50
                  transition-transform duration-300
                  ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-3 border-b border-purple-700/30">
        <h2 className="text-lg font-bold text-lime-400">Избранные</h2>
        <div className="flex gap-2 items-center">
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="text-sm text-lime-400 hover:text-green-400 transition"
            >
              Очистить
            </button>
          )}
          <button
            onClick={onClose}
            className="text-lime-400 text-xl hover:text-green-400 transition"
          >
            ✖
          </button>
        </div>
      </div>

      <div className="p-3 overflow-y-auto h-[calc(100%-48px)]">
        {favorites.length === 0 ? (
          <p className="text-gray-400 text-sm">Нет избранных фильмов</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {favorites.map((movie) => (
              <li
                key={movie.id}
                onClick={() => onSelectMovie(movie.id)}
                className="relative rounded bg-[#2a124b] cursor-pointer overflow-hidden 
                           shadow-md shadow-purple-700 hover:shadow-purple-900 hover:scale-105 
                           transition-transform duration-300"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(movie.id);
                  }}
                  className="absolute top-1 right-1 text-lime-400 hover:text-green-400 transition"
                >
                  ✖
                </button>

                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-40 object-cover"
                  />
                )}

                <h3 className="text-lime-400 text-xs font-semibold text-center p-1 truncate">
                  {movie.title}
                </h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
