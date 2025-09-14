import { useFavoritesStore } from '../store/favorites';

export default function MovieModal({ movie, onClose }) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  if (!movie) return null;

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const cast = movie.credits?.cast ?? [];

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 
                 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-black/40 text-white rounded-xl p-6
                   w-full max-w-4xl md:max-w-5xl lg:max-w-6xl
                   max-h-[90vh] overflow-y-auto
                   shadow-[0_0_25px] shadow-purple-900
                   transform transition-transform duration-300 scale-95 hover:scale-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lime-300 text-2xl font-bold hover:text-lime-500 transition-colors"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center w-[362px]">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                className="w-[362px] h-[482px] rounded shadow-lg mb-4"
              />
            ) : (
              <div className="w-full h-[482px] bg-gray-700 flex items-center justify-center rounded text-gray-400 mb-4">
                Нет постера
              </div>
            )}

            <button
              onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie))}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                isFavorite
                  ? 'bg-[#2c026d] hover:bg-[#3b0ca3] text-white'
                  : 'bg-[#2c026d] hover:bg-[#3b0ca3] text-white'
              }`}
            >
              {isFavorite ? 'Убрать из избранного' : 'В избранное'}
            </button>

            <div className="mt-6 w-full bg-gray-800 p-4 rounded-lg shadow-md shadow-purple-900">
              <h2 className="text-xl font-bold mb-2 text-lime-400">{movie.title}</h2>
              <p>
                <span className="font-semibold">Год:</span>{' '}
                {movie.release_date ? movie.release_date.split('-')[0] : '—'}
              </p>
              <p>
                <span className="font-semibold">Страна:</span>{' '}
                {movie.production_countries?.[0]?.name || '—'}
              </p>
              <p>
                <span className="font-semibold">Жанры:</span>{' '}
                {movie.genres?.map((g) => g.name).join(', ') || '—'}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2 text-lime-400">{movie.title}</h2>
            <p className="text-sm mb-1">⭐ {movie.vote_average}</p>
            <p className="text-sm mb-2">{movie.overview}</p>

            {trailer && (
              <iframe
                width="100%"
                height="250"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Трейлер"
                allowFullScreen
                className="w-full h-64 md:h-80 rounded shadow-[0_0_15px] shadow-purple-900"
              ></iframe>
            )}

            <div className="mt-6"></div>
            <h3 className="text-xl font-bold mb-4 text-left text-lime-400">Актёры</h3>
            {cast.length === 0 ? (
              <p className="text-gray-400">Информация недоступна</p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {cast.slice(0, 10).map((actor, index) => (
                  <li
                    key={`${actor.id}-${index}`}
                    className="bg-gray-800 rounded p-2 text-center shadow-md shadow-purple-900 hover:scale-105 transition-transform"
                  >
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded mb-1 text-gray-400 text-xs">
                        Нет фото
                      </div>
                    )}
                    <p className="font-semibold text-sm">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
