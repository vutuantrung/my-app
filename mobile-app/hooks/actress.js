import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getActress, listActresses } from '../api/actress';

export function useActress(id) {
	return useQuery({
		queryKey: ['actress', id],
		queryFn: () => getActress(id),
		staleTime: 60_000,
		enabled: !!id,
	});
}

export function useActresses(params) {
	return useInfiniteQuery({
		queryKey: ['actresses', params],
		queryFn: ({ pageParam }) => listActresses({ ...(params || {}), cursor: pageParam }),
		initialPageParam: undefined,
		getNextPageParam: (last) => last.nextCursor,
	});
}
