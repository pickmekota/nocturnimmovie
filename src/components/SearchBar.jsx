import { useState, useEffect } from 'react';
import { searchMovies } from '../api/tmdb';
import { X } from 'lucide-react';

export default function SearchBar({ query, setQuery, onSelectMovie }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const movies = await searchMovies(query);
        setSuggestions(movies.slice(0, 5));
      } catch (err) {
        console.error('Ошибка при поиске:', err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фильмов..."
          className="w-full p-3 pr-10 rounded-2xl border border-purple-700/30
                     bg-[#1a0d3a]/80 text-lime-400 placeholder-lime-300/40 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/20
                     transition-all duration-300"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                       bg-[#2c026d]/80 hover:bg-[#3b0ca3]/90 text-lime-400 rounded-full p-1 shadow-md shadow-purple-700/50 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul
          className="absolute top-full left-0 w-full bg-[#2a124b] 
                       border border-purple-700 rounded-lg mt-1 z-20 text-left shadow-lg shadow-purple-700/50"
        >
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              onClick={() => {
                onSelectMovie(movie.id);
                setSuggestions([]);
              }}
              className="p-2 cursor-pointer hover:bg-purple-700 hover:text-lime-400 
                         transition-all duration-200"
            >
              {movie.title} {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
