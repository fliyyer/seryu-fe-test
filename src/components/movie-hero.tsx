import type { GetMovie } from "../types/movie";
import { FaCalendarAlt, FaStar } from "react-icons/fa";

const MovieHero = ({ movie }: { movie: GetMovie }) => (
    <div className="relative h-[70vh] bg-cover bg-center flex items-end" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"
        />
        <div className="relative z-10 flex items-end w-full max-w-7xl mx-auto p-6 lg:px-0 gap-6 text-white">
            <img
                className="w-48 md:w-64 rounded-lg shadow-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(movie.release_date).getFullYear()}</span>
                </div>
                <p className="text-gray-200 max-w-2xl text-sm md:text-base line-clamp-3">{movie.overview}</p>
                <div className="flex items-center gap-2 mt-2 text-yellow-400 text-lg font-semibold">
                    <FaStar />
                    <span>{movie.vote_average.toFixed(1)} / 10</span>
                </div>
            </div>
        </div>
    </div>
);

export default MovieHero;
