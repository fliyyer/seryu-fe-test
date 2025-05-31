import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tmdb } from "../api/tmdb";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


export const useRequestToken = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await tmdb.get(`/authentication/token/new?api_key=${API_KEY}`);
            return res.data.request_token;
        },
    });
};

export const useCreateSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (requestToken: string) => {
            const res = await tmdb.post(`/authentication/session/new?api_key=${API_KEY}`, {
                request_token: requestToken,
            });
            localStorage.setItem("tmdb_session_id", res.data.session_id);
            queryClient.invalidateQueries();
            return res.data.session_id;
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const sessionId = localStorage.getItem("tmdb_session_id");
            if (!sessionId) throw new Error("No session ID found");

            await tmdb.delete(`/authentication/session?api_key=${API_KEY}`, {
                data: { session_id: sessionId },
            });
            localStorage.removeItem("tmdb_session_id");
            queryClient.invalidateQueries();
        },
    });
};

export const useAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const sessionId = localStorage.getItem("tmdb_session_id");
        if (sessionId) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);
    return { isAuthenticated, loading };
}
