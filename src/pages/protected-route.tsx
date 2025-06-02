import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthenticated } from "../hooks/useAuth";
import { showError } from "../lib/toast";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuthenticated();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            showError("You must log in to access this page.");
        }
    }, [loading, isAuthenticated]);

    if (loading) return <p className="text-center mt-10">Checking authentication...</p>;
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return <Outlet />;
};

export default ProtectedRoute;
