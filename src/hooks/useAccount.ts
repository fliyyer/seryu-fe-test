import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../lib/toast";
import {
    addToWatchlist,
    getFavoriteMovies,
    getWatchlistMovies,
    markAsFavorite
} from "../api/accountService";
import type { GetMovie } from "../types/movie";


export const useMarkAsFavorite = () => {
    const QueryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ media_id, favorite }: { media_id: number; favorite: boolean }) => {
            const sessionId = localStorage.getItem("tmdb_session_id");
            if (!sessionId) throw new Error("No session ID");
            return await markAsFavorite(sessionId, media_id, favorite);
        },
        onSuccess: (_data, variables) => {
            const message = variables.favorite
                ? "Added to favorites!"
                : "Removed from favorites!";
            showSuccess(message);
            QueryClient.invalidateQueries({ queryKey: ["favorite-movies"] });
        },
        onError: () => showError("Please log in to change favorite list"),
    })
};


export const useAddToWatchlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ media_id, watchlist }: { media_id: number; watchlist: boolean }) => {
            const sessionId = localStorage.getItem("tmdb_session_id");
            if (!sessionId) throw new Error("No session ID");
            return await addToWatchlist(sessionId, media_id, watchlist);
        },
        onSuccess: (_data, variables) => {
            const message = variables.watchlist
                ? "Added to watchlist!"
                : "Removed from watchlist!";
            showSuccess(message);
            queryClient.invalidateQueries({ queryKey: ["watchlist-movies"] });
        },
        onError: () => showError("Please log in to change watchlist"),
    });
};


export const useGetFavoriteMovies = () => {
    const sessionId = localStorage.getItem("tmdb_session_id");
    return useQuery({
        queryKey: ["favorite-movies"],
        queryFn: async () => {
            if (!sessionId) throw new Error("No session ID");
            return await getFavoriteMovies(sessionId);
        },
        enabled: !!sessionId,
    });
};

export const useGetWatchlistMovies = () => {
    const sessionId = localStorage.getItem("tmdb_session_id");
    return useQuery({
        queryKey: ["watchlist-movies"],
        queryFn: async () => {
            if (!sessionId) throw new Error("No session ID");
            return await getWatchlistMovies(sessionId);
        },
        enabled: !!sessionId,
    });
};

export const useFavoriteWatchlistStatus = () => {
    const { data: favoriteMovies = [] } = useGetFavoriteMovies();
    const { data: watchlistMovies = [] } = useGetWatchlistMovies();

    const markMovies = (movies: GetMovie[] = []) => {
        return movies.map((movie) => ({
            ...movie,
            is_favorite: favoriteMovies.some((fav: { id: number; }) => fav.id === movie.id),
            is_watchlist: watchlistMovies.some((wl: { id: number; }) => wl.id === movie.id),
        }));
    };

    return { markMovies };
};

export const useFavoriteWatchlistActions = (mediaId: number) => {
    const favoriteMutation = useMarkAsFavorite();
    const watchlistMutation = useAddToWatchlist();

    const handleFavorite = (favorite: boolean) => {
        favoriteMutation.mutate({ media_id: mediaId, favorite });
    };

    const handleWatchlist = (watchlist: boolean) => {
        watchlistMutation.mutate({ media_id: mediaId, watchlist });
    };

    return { handleFavorite, handleWatchlist };
};