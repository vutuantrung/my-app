
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
					resolve(rows || null);
				}
			});
	});
}

async function searchMovieByIdolName(idolName) {
	const sql = "SELECT * FROM idol_movie WHERE idol_name = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [idolName],
			(err, row) => {
				if (err) {
					console.log('[searchMovieByIdolName]', `Search failed: ${err.message}`);
					reject(err);
				} else {
					resolve(row || null);
				}
			});
	});
}

async function searchIdolsByMovieCode(movieCode) {
	const sql = "SELECT * FROM idol_movie WHERE movie_code = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [movieCode],
			(err, row) => {
				if (err) {
					console.log('[searchIdolsByMovieCode]', `Search failed: ${err.message}`);
					reject(err);
				} else {
					resolve(row || null);
				}
			});
	});
}

async function searchIdolsByMovieCodeContent(movieCode, movieContentId) {
	const sql = "SELECT * FROM idol_movie WHERE movie_code = ? AND movie_contentId = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [movieCode, movieContentId],
			(err, row) => {
				if (err) {
					console.log('[searchIdolsByMovieCode]', `Search failed: ${err.message}`);
					reject(err);
				} else {
					resolve(row || null);
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

module.exports = { getAll, createIdolMovies, searchIdolsByMovieCode, searchIdolsByMovieCodeContent, searchMovieByIdolName }

// getAll().then(rows => {
//     const map = new Map();

//     for (const r of rows) {
//         if (!r.idol_name) continue;
//         if (!map.has(r.idol_name)) map.set(r.idol_name, new Set());
//         if (r.movie_code) map.get(r.idol_name).add(r.movie_code);
//     }

//     const result = [...map.entries()]
//         .map(([idol, codes]) => ({
//             idolName: idol,
//             movieCodes: [...codes].sort((a, b) => a.localeCompare(b)),
//         }))
//         .sort((a, b) => a.idolName.localeCompare(b.idolName));

//     console.log(result);
// });