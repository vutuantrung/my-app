
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName } = require("../helpers");

const properties = ["idol_name", "movie_code", "movie_contentId"];

// GET all or search by codes (comma-separated)
async function getAll() {
	const sql = "SELECT idol_name, movie_code FROM idol_movie";
	return new Promise((resolve, reject) => {
		db.all(sql, [],
			(err, rows) => {
				if (err) {
					console.log('[getAll]', `Search failed: ${err.message}`);
					reject(err);
				} else {
					resolve({ data: rows || [] });
				}
			});
	});
}

async function searchMoviesByIdolName(idolName) {
	const sql = "SELECT * FROM idol_movie WHERE idol_name = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [idolName],
			(err, rows) => {
				if (err) {
					console.log('[searchMoviesByIdolName]', `Search failed: ${err.message}`);
					reject(err);
				} else {
					resolve({ data: rows || [] });
				}
			});
	});
}

async function searchIdolsByMovieCode(movieCode) {
	const sql = "SELECT * FROM idol_movie WHERE movie_code = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [movieCode],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolsByMovieCode]', `Search failed: ${err.message}`);
					reject(err);
				} else {
					resolve({ data: rows || [] });
				}
			});
	});
}

async function searchIdolsByMovieCodeContentId(movieCode, movieContentId) {
	const sql = "SELECT * FROM idol_movie WHERE movie_code = ? AND movie_contentId = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [movieCode, movieContentId],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolsByMovieCode]', `Search failed: ${err.message}`);
					reject(err);
				} else {
					resolve({ data: rows || null });
				}
			});
	});
}

// CREATE
async function createIdolMovies(idolMovies) {
	if (Array.isArray(idolMovies) && idolMovies.length === 0) return "Empty";

	const sql = `INSERT OR IGNORE INTO idol_movie ${createPropertiesCREATEColumns(properties)}
                VALUES ${createPropertiesValues(properties)}`
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`BEGIN TRANSACTION`);
			const stmt = db.prepare(sql);
			for (const idolMovie of idolMovies) {
				stmt.run(createRecordArrayByPropertyName(properties, idolMovie), err => {
					if (err) {
						console.log('[createIdolMovies]', `Create failed: ${err.message}`);
						reject(err);
					}
				});
			}
			stmt.finalize();
			db.run(`COMMIT`, (err) => {
				if (err) {
					console.log('[createIdolMovies]', `Create failed: ${err.message}`);
					reject(err);
				}
				console.log('[createIdolMovies]', `Create successfully: ${idolMovies.length} idol-movie(s).`)
				resolve(true);
			});
		});
	})
}

module.exports = { getAll, createIdolMovies, searchIdolsByMovieCode, searchIdolsByMovieCodeContentId, searchMoviesByIdolName }