import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateSession } from "../hooks/useAuth";
import { showError, showSuccess } from "../lib/toast";

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
                onSuccess: (sessionId) => {
                    localStorage.setItem("tmdb_session_id", sessionId);
                    showSuccess("Login successful");

                    if (window.opener) {
                        window.opener.postMessage("tmdb_login_success", "*");
                        window.close();
                    } else {
                        navigate("/");
                    }
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
    }, [search, createSession, navigate]);

    return <p>Authenticating...</p>;
};

export default AuthCallback;
