import { Link } from "react-router-dom";
import CardMovie from "../components/card-movie";
import LoadingSpinner from "../components/loading-spinner";
import Navbar from "../components/navbar";
import { useFavoriteWatchlistStatus, useGetFavoriteMovies } from "../hooks/useAccount";
import type { GetMovie } from "../types/movie";
import { FaRegHeart } from "react-icons/fa";

const FavoritePage = () => {
    const { data = [], isLoading } = useGetFavoriteMovies();
    const { markMovies } = useFavoriteWatchlistStatus();
    const datas = markMovies(data);
    if (isLoading) return <LoadingSpinner />;
    const isEmpty = datas.length === 0;

    return (
        <main className="min-h-screen bg-[#eaeaea]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:px-0">
                <h1 className="text-4xl text-gray-900 font-bold mb-6">
                    Favorite Movies
                </h1>
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
                        <FaRegHeart className="text-6xl mb-4 text-gray-400" />
                        <p className="text-xl font-medium">Favorite empty</p>
                        <p className="text-sm mt-1">No movies found in your favorite.</p>
                        <Link
                            to="/"
                            className="mt-6 inline-block px-5 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition"
                        >
                            Explore Movies
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {datas.map((movie: GetMovie) => (
                            <CardMovie key={movie.id} {...movie} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default FavoritePage;
