import { FaHeart, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Tmdb from '../assets/imdb.png';
import Ceri from '../assets/ceri.png';
import type { CardMovieProps } from '../types/movie';
import { genreMap } from '../constant/genre';
import { useAddToWatchlist, useMarkAsFavorite } from '../hooks/useAccount';


const CardMovie = ({
    id,
    title,
    release_date,
    poster_path,
    vote_average,
    vote_count,
    genre_ids = [],
}: CardMovieProps & { genre_ids?: number[] }) => {
    const genres = genre_ids.map((id) => genreMap[id]).filter(Boolean).join(', ');

    const favoriteMutation = useMarkAsFavorite();
    const watchlistMutation = useAddToWatchlist();

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        favoriteMutation.mutate({ media_id: id, favorite: true });
    };

    const handleWatchlist = (e: React.MouseEvent) => {
        e.preventDefault();
        watchlistMutation.mutate({ media_id: id, watchlist: true });
    };

    return (
        <Link
            to={`/movie/${id}`}
            className="block w-[250px] rounded-xl overflow-hidden shadow-lg group bg-white"
        >
            <div className="relative">
                <img
                    className="w-full h-[350px] object-cover"
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-4 transition-opacity duration-300">
                    <button
                        className="bg-white hover:bg-gray-200 text-red-600 p-2 rounded-full shadow"
                        onClick={handleFavorite}
                    >
                        <FaHeart size={18} />
                    </button>
                    <button
                        className="bg-white hover:bg-gray-200 text-blue-600 p-2 rounded-full shadow"
                        onClick={handleWatchlist}
                    >
                        <FaBookmark size={18} />
                    </button>
                </div>
            </div>
            <div className="p-4 flex flex-col justify-between h-[150px]">
                <div className="space-y-1">
                    <div className="text-xs text-gray-400 font-semibold">
                        {new Date(release_date).getFullYear()}
                    </div>
                    <h2 className="text-md font-bold text-gray-900 line-clamp-2 leading-tight">{title}</h2>
                    {genres && (
                        <div className="text-xs text-gray-400 font-semibold">{genres}</div>
                    )}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                    <div className="flex items-center gap-1">
                        <img src={Tmdb} alt="TMDB" className="w-6 h-4 object-contain" />
                        <span className="text-gray-900 font-semibold">
                            {vote_average.toFixed(1)} / 10
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={Ceri} alt="Ceri" className="w-4 h-4 object-contain" />
                        <span>{vote_count}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CardMovie;
