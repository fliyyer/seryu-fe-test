import { useQuery } from "@tanstack/react-query";
import { getMovieDetail, getNowPlaying, getTopRated } from "../api/movieService";

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