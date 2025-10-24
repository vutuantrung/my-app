import { http } from './http';
import { mapFilm } from './mappers';

// q: { cursor?, limit?, q?, sort?, dir?, tag?, actressId? }
export async function listFilms(q = {}) {
	const res = await http('GET', '/films', { params: q });
	return {
		items: (res.items || []).map(mapFilm),
		nextCursor: res.nextCursor,
		total: res.total,
	};
}

export async function getFilm(id) {
	const dto = await http('GET', `/films/${id}`);
	return mapFilm(dto);
}

export const searchFilms = (q, limit = 20) => listFilms({ q, limit });
export const listFilmsByActress = (actressId, cursor, limit = 20) =>
	listFilms({ actressId, cursor, limit });
