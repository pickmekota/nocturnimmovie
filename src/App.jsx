import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, searchMovies, getGenres, getMovieDetails } from './api/tmdb';
import { useFavoritesStore } from './store/favorites';
import MovieModal from './components/MovieModal';
import FavoritesSidebar from './components/FavoritesSidebar';
import SearchBar from './components/SearchBar';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });
  const [sort, setSort] = useState('popularity.desc');
  const [selected, setSelected] = useState(null);
  const [favOpen, setFavOpen] = useState(false);

  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const loaderRef = useRef();
  const debounce = useRef();

  const { data: genres = [] } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  useEffect(() => {
    loadMovies(1);
  }, []);

  async function loadMovies(nextPage) {
    try {
      const data = await getPopularMovies(nextPage);
      setMovies((prev) => {
        const all = [...prev, ...data.results];
        const unique = Array.from(new Map(all.map((m) => [m.id, m])).values());
        return unique;
      });
      setPage(nextPage);
      setTotalPages(data.total_pages);
    } catch (e) {
      console.error('Ошибка загрузки:', e);
    }
  }

  useEffect(() => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      if (!query.trim()) {
        setMovies([]);
        loadMovies(1);
      } else {
        try {
          const results = await searchMovies(query);
          const unique = Array.from(new Map(results.map((m) => [m.id, m])).values());
          setMovies(unique);
        } catch (e) {
          console.error('Ошибка поиска:', e);
        }
      }
    }, 500);

    return () => clearTimeout(debounce.current);
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages && !query) {
          loadMovies(page + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [page, totalPages, query]);

  function toggleFavorite(movie) {
    favorites.find((m) => m.id === movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  }

  async function openMovie(id) {
    try {
      const full = await getMovieDetails(id);
      setSelected(full);
    } catch (e) {
      console.error('Ошибка деталей:', e);
    }
  }

  const filtered = movies.filter((m) => {
    const byGenre = !filters.genre || m.genre_ids?.includes(Number(filters.genre));
    const byYear = !filters.year || m.release_date?.startsWith(filters.year);
    const byRating = !filters.rating || m.vote_average >= Number(filters.rating);
    return byGenre && byYear && byRating;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'popularity.asc':
        return a.popularity - b.popularity;
      case 'vote_average.desc':
        return b.vote_average - a.vote_average;
      case 'vote_average.asc':
        return a.vote_average - b.vote_average;
      case 'release_date.desc':
        return new Date(b.release_date) - new Date(a.release_date);
      case 'release_date.asc':
        return new Date(a.release_date) - new Date(b.release_date);
      case 'title.asc':
        return a.title.localeCompare(b.title);
      case 'title.desc':
        return b.title.localeCompare(a.title);
      default:
        return b.popularity - a.popularity;
    }
  });

  return (
    <div className="text-center mb-8">
      <h1
        className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent
                 bg-gradient-to-r from-lime-400 via-green-400 to-green-600 drop-shadow-[0_0_8px]"
      >
        Nocturnum
      </h1>
      <p className="text-gray-200 mt-2 text-lg md:text-xl animate-pulse">
        Каталог фильмов для уютных вечеров
      </p>

      <div className="flex justify-center my-6">
        <SearchBar query={query} setQuery={setQuery} onSelectMovie={openMovie} />
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="p-2 rounded-xl bg-[#2c026d]/25 border border-purple-700/30 text-lime-400 
                     transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px] hover:shadow-purple-700/50"
        >
          <option value="" className="bg-[#1a0d3a]/80 text-lime-400">
            Все жанры
          </option>
          {genres.map((g) => (
            <option key={g.id} value={g.id} className="bg-[#1a0d3a]/80 text-lime-400">
              {g.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Год"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="p-2 rounded-xl bg-[#2c026d]/25 border border-purple-700/30 text-lime-400
                     transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px] hover:shadow-purple-700/50"
        />

        <input
          type="number"
          placeholder="Мин. рейтинг"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          min="0"
          max="10"
          step="0.1"
          className="p-2 rounded-xl bg-[#2c026d]/25 border border-purple-700/30 text-lime-400
                     transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px] hover:shadow-purple-700/50"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded-xl bg-[#2c026d]/25 border border-purple-700/30 text-lime-400 
                     transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px] hover:shadow-purple-700/50"
        >
          <option value="popularity.desc" className="bg-[#1a0d3a]/90 text-lime-400">
            Популярные ↓
          </option>
          <option value="popularity.asc" className="bg-[#1a0d3a]/90 text-lime-400">
            Популярные ↑
          </option>
          <option value="vote_average.desc" className="bg-[#1a0d3a]/90 text-lime-400">
            Рейтинг ↑
          </option>
          <option value="vote_average.asc" className="bg-[#1a0d3a]/90 text-lime-400">
            Рейтинг ↓
          </option>
          <option value="release_date.desc" className="bg-[#1a0d3a]/90 text-lime-400">
            Дата ↑
          </option>
          <option value="release_date.asc" className="bg-[#1a0d3a]/90 text-lime-400">
            Дата ↓
          </option>
          <option value="title.asc" className="bg-[#1a0d3a]/90 text-lime-400">
            Название A-Z
          </option>
          <option value="title.desc" className="bg-[#1a0d3a]/90 text-lime-400">
            Название Z-A
          </option>
        </select>

        <button
          onClick={() => setFilters({ genre: '', year: '', rating: '' })}
          className="bg-[#2c026d]/30 px-4 py-2 rounded-xl text-lime-400 font-semibold
             hover:scale-105 hover:shadow-[0_0_20px] hover:shadow-purple-700/50 transition-all duration-300"
        >
          Сбросить
        </button>

        <button
          onClick={() => setFavOpen(true)}
          className="bg-[#2c026d]/40 px-4 py-2 rounded-xl text-lime-400 font-semibold
             hover:scale-105 hover:shadow-[0_0_20px] hover:shadow-purple-700/50 transition-all duration-300"
        >
          Избранное ({favorites.length})
        </button>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-7 gap-6">
        {sorted.map((m) => (
          <li
            key={m.id}
            className="relative bg-purple-300/5 rounded-xl overflow-hidden shadow-md 
             transition-all duration-300 transform hover:scale-105 cursor-pointer
             hover:shadow-[0_0_20px] hover:shadow-[#2c026d]/80"
          >
            {m.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                alt={m.title}
                className="w-full h-64 md:h-72 object-cover"
                onClick={() => openMovie(m.id)}
              />
            )}
            <h2 className="font-bold text-sm md:text-base truncate">{m.title}</h2>
            <p className="text-xs text-lime-400 mt-1">⭐ {m.vote_average}</p>
            <p className="text-xs text-gray-200">{m.release_date}</p>
            <button
              onClick={() => toggleFavorite(m)}
              className="absolute top-2 right-2 px-2 rounded-full text-lg font-bold
             transition-all duration-300
             bg-[#2c026d]/80 hover:bg-[#3b0ca3]/90 text-white shadow-[0_0_5px] shadow-purple-500/50"
            >
              {favorites.find((f) => f.id === m.id) ? '♥' : '♡'}
            </button>
          </li>
        ))}
      </ul>

      <div ref={loaderRef} className="h-8"></div>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
      <FavoritesSidebar
        favorites={favorites}
        isOpen={favOpen}
        onClose={() => setFavOpen(false)}
        onSelectMovie={(id) => {
          openMovie(id);
          setFavOpen(false);
        }}
        removeFavorite={removeFavorite}
        clearFavorites={() => favorites.forEach((m) => removeFavorite(m.id))}
      />

      <ScrollToTop />
    </div>
  );
}
