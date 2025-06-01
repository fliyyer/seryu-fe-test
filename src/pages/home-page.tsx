import ErrorMessage from "../components/error-message";
import LoadingSpinner from "../components/loading-spinner";
import MovieSlider from "../components/movie-slider";
import Navbar from "../components/navbar";
import MovieHeroSlider from "../components/movie-hero-slider";
import { useFavoriteWatchlistStatus } from "../hooks/useAccount";
import { useNowPlaying, useTopRated } from "../hooks/useGetMovie";

const Homepage = () => {
    const { data: nowPlaying, isLoading, error } = useNowPlaying();
    const { data: topRated } = useTopRated();
    const { markMovies } = useFavoriteWatchlistStatus();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <main className="min-h-screen bg-[#eaeaea]">
            <Navbar />
            <MovieHeroSlider movies={nowPlaying} />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:px-0">
                <MovieSlider title="Now Playing" movies={markMovies(nowPlaying)} />
                <MovieSlider title="Top Rated" movies={markMovies(topRated)} />
            </div>
        </main>
    );
};

export default Homepage;