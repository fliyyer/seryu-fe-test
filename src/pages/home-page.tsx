import MovieSlider from "../components/movie-slider";
import Navbar from "../components/navbar";
import { useNowPlaying, useTopRated } from "../hooks/useGetMovie";

const Homepage = () => {
    const { data: now_playing, isLoading, error } = useNowPlaying();
    const { data: top_rated } = useTopRated();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading movies</p>;

    return (
        <main className="min-h-screen bg-[#eaeaea]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:px-0">
                <MovieSlider title="Now Playing" movies={now_playing} />
                <MovieSlider title="Top Rated" movies={top_rated} />
            </div>
        </main>
    );
};

export default Homepage;
