import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRequestToken, createSessionId, deleteSessionId } from "../api/auth";
import { showError, showSuccess } from "../lib/toast";

// Authentication status hook
export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem("tmdb_session_id");
        setIsAuthenticated(!!sessionId);
        setIsLoading(false);
    }, []);

    return { isAuthenticated, isLoading };
};

// Request token hook
export const useRequestToken = () => {
    return useMutation({
        mutationFn: getRequestToken,
        onError: () => showError("Gagal membuat token"),
    });
};

// Create session hook
export const useCreateSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSessionId,
        onSuccess: (sessionId) => {
            localStorage.setItem("tmdb_session_id", sessionId);
            queryClient.invalidateQueries();
            showSuccess("Login berhasil");
        },
        onError: () => showError("Gagal membuat sesi"),
    });
};

// Logout hook
export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const sessionId = localStorage.getItem("tmdb_session_id");
            if (!sessionId) throw new Error("Tidak ada sesi");
            await deleteSessionId(sessionId);
            localStorage.removeItem("tmdb_session_id");
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            showSuccess("Logout berhasil");
        },
        onError: () => showError("Gagal logout"),
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