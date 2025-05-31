import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaCalendarAlt } from 'react-icons/fa';
import { getMovieDetail, getRecommendations } from '../api/movieService';
import CardMovie from '../components/card-movie';
import type { GetMovie } from '../types/movie';
import Navbar from '../components/navbar';


const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: movie, isLoading, isError } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieDetail(id!),
        enabled: !!id,
    });

    const { data: recommendations } = useQuery({
        queryKey: ['recommendations', id],
        queryFn: () => getRecommendations(id!),
        enabled: !!id,
    });

    if (isLoading) return <div className="text-center mt-20">Loading...</div>;
    if (isError || !movie) return <div className="text-center mt-20">Failed to load movie.</div>;

    return (
        <div className="text-white min-h-screen">
            <Navbar />
            <div className="relative mt-1 h-[70vh] bg-cover bg-center flex items-end" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="relative z-10 flex items-end max-w-6xl mx-auto p-6 gap-6">
                    <img
                        className="w-48 md:w-64 rounded-lg shadow-lg"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                            <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(movie.release_date).getFullYear()}</span>
                            <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {movie.vote_average.toFixed(1)} / 10</span>
                            <span>{movie.runtime} mins</span>
                            <span>{movie.genres.map((g: { name: string }) => g.name).join(', ')}</span>
                        </div>
                        <p className="text-gray-200 max-w-2xl text-sm md:text-base">{movie.overview}</p>
                    </div>
                </div>
            </div>
            <section className="flex flex-col max-w-7xl mx-auto px-4 py-8 lg:px-0">
                <h1 className="text-4xl text-gray-900 font-bold mb-6">Recommendations</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {recommendations?.map((rec: GetMovie) => (
                        <CardMovie
                            key={rec.id}
                            id={rec.id}
                            title={rec.title}
                            release_date={rec.release_date}
                            poster_path={rec.poster_path}
                            vote_average={rec.vote_average}
                            vote_count={rec.vote_count}
                            genre_ids={rec.genre_ids}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MovieDetailPage;