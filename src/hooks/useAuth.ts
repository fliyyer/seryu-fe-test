import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRequestToken, createSessionId, deleteSessionId } from "../api/auth";
import { showError, showSuccess } from "../lib/toast";
import { getSessionId } from "../utils/session";


export const useSession = () => {
    return useQuery({
        queryKey: ["session"],
        queryFn: () => getSessionId(),
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
            const sessionId = getSessionId();
            if (!sessionId) throw new Error("No session ID");
            await deleteSessionId(sessionId);
            localStorage.removeItem("tmdb_session_id");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["session"] });
            showSuccess("Logout successful");
        },
        onError: () => showError("Failed to logout"),
    });
};

export const useAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = () => {
            setIsAuthenticated(!!getSessionId());
            setLoading(false);
        };

        check();
        window.addEventListener("storage", check);
        return () => window.removeEventListener("storage", check);
    }, []);

    return { isAuthenticated, loading };
};