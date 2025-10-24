import { http } from './http';
import { mapActress, mapFilm } from './mappers';

export async function listActresses(q = {}) {
	const res = await http('GET', '/actresses', { params: q });
	return {
		items: (res.items || []).map(mapActress),
		nextCursor: res.nextCursor,
		total: res.total,
	};
}

export async function getActress(id) {
	const dto = await http('GET', `/actresses/${id}`);
	return mapActress(dto);
}

export async function listActressFilms(id, cursor, limit = 20) {
	const res = await http('GET', `/actresses/${id}/films`, { params: { cursor, limit } });
	return {
		items: (res.items || []).map(mapFilm),
		nextCursor: res.nextCursor,
		total: res.total,
	};
}
