import { useMutation, useQuery } from "@tanstack/react-query";
import { tmdb } from "../api/tmdb";

const sessionId = localStorage.getItem("tmdb_session_id");

export const useMarkAsFavorite = () => {
    return useMutation({
        mutationFn: ({ media_id, favorite }: { media_id: number; favorite: boolean }) =>
            tmdb.post(`/account/{account_id}/favorite`, {
                media_type: "movie",
                media_id,
                favorite,
            }, {
                params: { session_id: sessionId }
            }),
    });
};

export const useAddToWatchlist = () => {
    return useMutation({
        mutationFn: ({ media_id, watchlist }: { media_id: number; watchlist: boolean }) =>
            tmdb.post(`/account/{account_id}/watchlist`, {
                media_type: "movie",
                media_id,
                watchlist,
            }, {
                params: { session_id: sessionId }
            }),
    });
};

export const useFavoriteMovies = () => {
    return useQuery({
        queryKey: ["favorite-movies"],
        queryFn: async () => {
            const { data } = await tmdb.get(`/account/{account_id}/favorite/movies`, {
                params: { session_id: sessionId },
            });
            return data.results;
        },
    });
};

export const useWatchlistMovies = () => {
    return useQuery({
        queryKey: ["watchlist-movies"],
        queryFn: async () => {
            const { data } = await tmdb.get(`/account/{account_id}/watchlist/movies`, {
                params: { session_id: sessionId },
            });
            return data.results;
        },
    });
};
