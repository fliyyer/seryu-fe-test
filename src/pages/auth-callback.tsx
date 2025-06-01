import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateSession } from "../hooks/useAuth";
import { showError } from "../lib/toast";
import LoadingSpinner from "../components/loading-spinner";

const AuthCallback = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const createSession = useCreateSession();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const approved = params.get("approved");
        const requestToken = params.get("request_token");

        if (approved === "true" && requestToken) {
            createSession.mutate(requestToken, {
                onSuccess: () => {
                    navigate("/");
                },
                onError: () => {
                    showError("Failed to create session.");
                    navigate("/");
                },
            });
        } else {
            showError("Authorization failed or denied.");
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-screen flex justify-center items-center text-xl text-gray-700">
            <div className="flex flex-col items-center space-y-4">
                <LoadingSpinner />
                <span>Authenticating with TMDB...</span>
            </div>
        </div>
    );
};

export default AuthCallback;
