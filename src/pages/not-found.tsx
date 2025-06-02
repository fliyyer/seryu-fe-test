import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import notFoundImg from "../assets/notfound.png";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center text-center px-4 py-12">
            <img
                src={notFoundImg}
                alt="404 Not Found"
                className="w-full max-w-xs mb-8"
            />
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
                Oops! Page Not Found
            </h1>
            <p className="text-gray-600 text-lg mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all duration-200"
            >
                <FaHome />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
