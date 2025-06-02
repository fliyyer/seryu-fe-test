import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMovieSuggestions } from "../hooks/useGetMovie";
import { FaSearch, FaSpinner } from "react-icons/fa";

const SearchWithSuggestions = () => {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { data: suggestions = [], isFetching } = useGetMovieSuggestions(query);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return;
        if (suggestions.length === 0) return;
        navigate(`/movie/${suggestions[0].id}`);
        setShowSuggestions(false);
        setQuery("");
    };



    const handleSuggestionClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
        setShowSuggestions(false);
        setQuery("");
    };

    const renderSuggestionItem = (movie: typeof suggestions[0]) => (
        <li
            key={movie.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
            onClick={() => handleSuggestionClick(movie.id)}
        >
            <img
                src={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/no-image.jpg"
                }
                alt={movie.title}
                className="w-10 h-14 object-cover rounded-sm"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/no-image.jpg";
                }}
            />
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{movie.title}</p>
                <p className="text-xs text-gray-500">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                </p>
            </div>
        </li>
    );

    return (
        <div ref={inputRef} className="relative w-full max-w-md mx-4">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center">
                    <FaSearch className="absolute left-3 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        placeholder="Search movies..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white/90 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                        onFocus={() => setShowSuggestions(true)}
                    />
                    {isFetching && <FaSpinner className="absolute right-3 text-gray-400 animate-spin" />}
                </div>
            </form>

            {showSuggestions && (
                <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                    {isFetching ? (
                        <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                            <FaSpinner className="animate-spin" />
                            Searching...
                        </div>
                    ) : suggestions.length > 0 ? (
                        <ul className="max-h-80 overflow-y-auto">
                            {suggestions.map(renderSuggestionItem)}
                        </ul>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            {query.length > 0 ? "No results found" : "Start typing to search"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchWithSuggestions;
