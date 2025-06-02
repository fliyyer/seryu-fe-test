import { useQuery } from "@tanstack/react-query";
import {
    getMovieDetail,
    getNowPlaying,
    getTopRated,
    searchMovies,
} from "../api/movieService";
import type { GetMovie } from "../types/movie";

const STALE_TIME = 1000 * 60 * 5;

export const useNowPlaying = (page = 1) =>
    useQuery({
        queryKey: ["nowPlaying", page],
        queryFn: () => getNowPlaying(page),
        select: (data) => data.results,
        staleTime: STALE_TIME,
    });

export const useTopRated = (page = 1) =>
    useQuery({
        queryKey: ["topRated", page],
        queryFn: () => getTopRated(page),
        select: (data) => data.results,
        staleTime: STALE_TIME,
    });

export const useMovieDetail = (id: string) =>
    useQuery({
        queryKey: ["movieDetail", id],
        queryFn: () => getMovieDetail(id),
        enabled: !!id,
        staleTime: STALE_TIME,
    });

export const useGetMovieSuggestions = (query: string) =>
    useQuery<GetMovie[]>({
        queryKey: ["movie-suggestions", query],
        queryFn: () => searchMovies(query),
        enabled: query.trim().length > 0,
        staleTime: STALE_TIME,
        select: (data) => data.slice(0, 8),
        retry: 1,
    });
