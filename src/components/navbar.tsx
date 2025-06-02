import { Link } from 'react-router-dom';
import { useAuthHandlers } from '../hooks/useAuthHandlers';
import SearchWithSuggestions from './search';
import { useSession } from '../hooks/useAuth';

const Navbar = () => {
    const { handleLogin, handleLogout } = useAuthHandlers();

    const { data: session } = useSession();
    const isLoggedIn = !!session;

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <Link to="/" className="text-2xl uppercase font-bold text-blue-600">
                        Cinema
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/favorite" className="text-gray-700 hover:text-blue-600 font-medium">
                            Favorite
                        </Link>
                        <Link to="/watchlist" className="text-gray-700 hover:text-blue-600 font-medium">
                            Watchlist
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="w-full md:w-64 mr-4">
                        <SearchWithSuggestions />
                    </div>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2  rounded-md w-full md:w-auto"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2  rounded-md w-full md:w-auto"
                        >
                            Login TMDB
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
