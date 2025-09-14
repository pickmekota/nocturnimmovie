import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/tmdb';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieDetails(id, {
          append_to_response: 'videos,credits',
        });
        setMovie(data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      }
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-white p-4">Загрузка...</p>;

  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const cast = movie.credits?.cast ?? [];
  const genres = movie.genres ?? [];

  return (
    <div className="p-4 text-white">
      <Link to="/" className="text-blue-400 mb-4 inline-block hover:underline">
        ← Назад
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            className="rounded shadow-[0_0_20px] shadow-purple-500 transition-transform transform hover:scale-105"
          />
        ) : (
          <div className="w-48 h-72 bg-gray-700 rounded flex items-center justify-center text-gray-400">
            Нет постера
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold mb-3 text-gradient-neon">{movie.title}</h1>

          {movie.overview && <p className="mb-3 leading-relaxed">{movie.overview}</p>}

          {genres.length > 0 && (
            <p className="mb-2">
              <strong>Жанры:</strong> {genres.map((g) => g.name).join(', ')}
            </p>
          )}
          <p className="mb-2">
            <strong>Рейтинг:</strong> ⭐ {movie.vote_average?.toFixed(1) ?? '—'}
          </p>
          <p className="mb-4">
            <strong>Дата релиза:</strong> {movie.release_date || '—'}
          </p>

          {trailer && (
            <div className="mb-6">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                className="w-full h-full rounded"
              />
            </div>
          )}

          <h2 className="text-xl font-bold mt-4 mb-3">Актёры</h2>
          {cast.length === 0 ? (
            <p className="text-gray-400">Информация недоступна</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cast.slice(0, 12).map((actor) => (
                <li key={actor.id} className="bg-gray-800 rounded p-2 text-center">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-700 flex items-center justify-center rounded mb-2 text-gray-400 text-sm">
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
  );
}
