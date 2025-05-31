import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRequestToken, useLogout } from '../hooks/useAuth';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const requestToken = useRequestToken();
    const logout = useLogout();

    useEffect(() => {
        const session = localStorage.getItem("tmdb_session_id");
        setIsLoggedIn(!!session);
    }, []);


    const handleLogin = () => {
        requestToken.mutate(undefined, {
            onSuccess: (token) => {
                const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/auth/callback`;
                window.location.href = url;
            },
            onError: () => alert("Failed to create request token."),
        });
    };


    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                alert("Logged out");
                setIsLoggedIn(false);
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search.trim()}`);
        }
    };

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-blue-600">MovieApp</Link>
                <form onSubmit={handleSubmit} className="flex-1 mx-6 max-w-md">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search movies..."
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>
                <div className="flex items-center gap-4">
                    <Link to="/favorite" className="text-gray-700 hover:text-blue-600 font-medium">Favorite</Link>
                    <Link to="/watchlist" className="text-gray-700 hover:text-blue-600 font-medium">Watchlist</Link>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
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
