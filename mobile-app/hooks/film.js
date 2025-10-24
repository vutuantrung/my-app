import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getFilm, listFilms, listFilmsByActress } from '../api/film';

export function useFilm(id) {
	return useQuery({
		queryKey: ['film', id],
		queryFn: () => getFilm(id),
		staleTime: 60_000,
		enabled: !!id,
	});
}

export function useFilms(params) {
	return useInfiniteQuery({
		queryKey: ['films', params],
		queryFn: ({ pageParam }) => listFilms({ ...(params || {}), cursor: pageParam }),
		initialPageParam: undefined,
		getNextPageParam: (last) => last.nextCursor,
	});
}

export function useActressFilms(actressId, limit = 20) {
	return useInfiniteQuery({
		queryKey: ['actressFilms', actressId, limit],
		queryFn: ({ pageParam }) => listFilmsByActress(actressId, pageParam, limit),
		enabled: !!actressId,
		initialPageParam: undefined,
		getNextPageParam: (last) => last.nextCursor,
	});
}
