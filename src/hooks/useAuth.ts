import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRequestToken, createSessionId, deleteSessionId } from "../api/auth";
import { showError, showSuccess } from "../lib/toast";


export const useSession = () => {
    return useQuery({
        queryKey: ["session"],
        queryFn: () => {
            const sessionId = localStorage.getItem("tmdb_session_id");
            return sessionId;
        },
        staleTime: Infinity,
    });
};

export const useRequestToken = () => {
    return useMutation({
        mutationFn: getRequestToken,
        onError: () => showError("Failed to get request token"),
    });
};

export const useCreateSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSessionId,
        onSuccess: (sessionId) => {
            localStorage.setItem("tmdb_session_id", sessionId);
            showSuccess("Login successful");
            queryClient.invalidateQueries({ queryKey: ["session"] });
        },
        onError: () => showError("Failed to create session"),
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const sessionId = localStorage.getItem("tmdb_session_id");
            if (!sessionId) throw new Error("No session ID found");

            await deleteSessionId(sessionId);
            localStorage.removeItem("tmdb_session_id");
            queryClient.removeQueries();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["session"] });
            queryClient.invalidateQueries({ queryKey: ["favorite-movies"] });
            queryClient.invalidateQueries({ queryKey: ["watchlist-movies"] });
            showSuccess("Logout successful");
            window.location.reload();
        },
        onError: () => showError("Failed to logout"),
    });
};


export const useAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const sessionId = localStorage.getItem("tmdb_session_id");
            setIsAuthenticated(!!sessionId);
            setLoading(false);
        };

        checkAuth();

        const handleStorageChange = () => checkAuth();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { isAuthenticated, loading };
};