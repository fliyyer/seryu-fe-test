import { useQuery } from "@tanstack/react-query";
import { getMovieDetail, getNowPlaying, getTopRated, searchMovies } from "../api/movieService";
import type { GetMovie } from "../types/movie";

export const useNowPlaying = (page: number = 1) => {
    return useQuery({
        queryKey: ['nowPlaying', page],
        queryFn: () => getNowPlaying(page),
        select: (data) => data.results,
        staleTime: 1000 * 60 * 5,
    })
}

export const useTopRated = (page: number = 1) => {
    return useQuery({
        queryKey: ['topRated', page],
        queryFn: () => getTopRated(page),
        select: (data) => data.results,
        staleTime: 1000 * 60 * 5,
    })
}

export const useMovieDetail = (id: string) => {
    return useQuery({
        queryKey: ['movieDetail', id],
        queryFn: () => getMovieDetail(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}

export const useGetMovieSuggestions = (query: string) => {
    return useQuery<GetMovie[]>({
        queryKey: ['movie-suggestions', query],
        queryFn: () => searchMovies(query),
        enabled: query.trim().length > 0,
        staleTime: 1000 * 60 * 5,
        select: (data) => data.slice(0, 8),
        retry: 1,
    });
}