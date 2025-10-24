// Normalize backend DTOs to app models the UI expects.

// FilmDTO -> Film (map `cover` => `image`)
export const mapFilm = (dto) => ({
	id: dto.id,
	code: dto.code,
	title: dto.title,
	image: dto.cover,
	previewUrl: dto.previewUrl,
	rating: dto.rating || 0,
	releaseDate: dto.releaseDate,
	runtime: dto.runtime,
	tags: dto.tags || [],
	actresses: dto.actresses || [],
});

// ActressDTO -> Actress
export const mapActress = (dto) => ({
	...dto,
	tags: dto.tags || [],
	socials: dto.socials || {},
	videosCount: dto.videosCount || 0,
});
