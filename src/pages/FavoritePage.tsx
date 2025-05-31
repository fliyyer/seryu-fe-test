import CardMovie from "../components/card-movie";
import { useFavoriteMovies } from "../hooks/useAccount";
import type { GetMovie } from "../types/movie";

const FavoritePage = () => {
    const { data = [], isLoading } = useFavoriteMovies();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.map((movie: GetMovie) => (
                <CardMovie key={movie.id} {...movie} />
            ))}
        </div>
    );
};

export default FavoritePage;
