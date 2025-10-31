
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName, createPropertiesUPDATEColumns } = require("../helpers");

const columns = ["code", "contentId", "title", "studio", "release_date", "runtime", "note", "favorite", "my_favorite", "thumbs_short", "thumbs", "images", "created_time", "updated_time", "metadata"];

function dbAll(db, sql, params = []) {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
	});
}

async function searchMoviesByCodes(codesInput) {
	// Normalize to an ordered, de-duplicated array of codes
	const codes = (Array.isArray(codesInput) ? codesInput : String(codesInput || "").split(","))
		.map(s => String(s).trim())
		.filter(Boolean);

	if (codes.length === 0) return { data: [], notFound: [] };

	const seen = new Set();
	const uniqueCodes = codes.filter(c => (seen.has(c) ? false : (seen.add(c), true)));

	// Chunk to respect SQLite's usual 999 bind-parameter limit
	const PARAM_LIMIT = 999;
	const chunks = [];
	for (let i = 0; i < uniqueCodes.length; i += PARAM_LIMIT) {
		chunks.push(uniqueCodes.slice(i, i + PARAM_LIMIT));
	}

	try {
		const rows = [];
		for (const chunk of chunks) {
			const placeholders = chunk.map(() => "?").join(",");
			const sql = `SELECT * FROM movie WHERE code IN (${placeholders})`;
			rows.push(...await dbAll(db, sql, chunk));
		}

		// Map by code for O(1) reconstruction in input order
		const byCode = new Map(rows.map(r => [r.code, r]));
		const data = codes.map(c => byCode.get(c)).filter(Boolean);
		const notFound = uniqueCodes.filter(c => !byCode.has(c));

		return { data, notFound };
	} catch (err) {
		console.error("[searchMoviesByCodes] Search failed:", err.message);
		return { data: [], notFound: [], err: err.message };
	}
}

// GET all or search by codes (comma-separated)
async function searchMovieByCode(code) {
	if (!code) {
		return;
	}

	const terms = code ? code.split(',').map(n => n.trim()).filter(Boolean) : [];
	let query = 'SELECT * FROM movie';
	let params = [];

	if (terms.length > 0) {
		const orClause = terms.map(() => 'code = ?').join(' OR ');
		query += ` WHERE ${orClause}`;
		params = terms;
	}

	return new Promise((resolve, reject) => {
		db.all(query, params, (err, rows) => {
			if (err) {
				console.log('[searchMoviesByCode]', `Search failed: ${err.message}`);
				resolve({ err: err.message });
			}
			// console.log(rows)
			resolve({ data: rows });
		});
	})
}

async function searchMovieByContentId(contentId) {
	if (!contentId) {
		return;
	}

	const terms = contentId ? contentId.split(',').map(n => n.trim()).filter(Boolean) : [];
	let query = 'SELECT * FROM movie';
	let params = [];

	if (terms.length > 0) {
		const orClause = terms.map(() => 'contentId = ?').join(' OR ');
		query += ` WHERE ${orClause}`;
		params = terms;
	}

	return new Promise((resolve, reject) => {
		db.all(query, params, (err, rows) => {
			if (err) {
				console.log('[searchMoviesByCode]', `Search failed: ${err.message}`);
				resolve({ err: err.message });
			}
			// console.log(rows)
			resolve({ data: rows });
		});
	})
}

async function searchMovieByFavorite(favorite) {
	const sql = "SELECT * FROM movie WHERE favorite = ?";
	return new Promise((resolve, reject) => {
		db.all(sql, [favorite], (err, rows) => {
			if (err) {
				console.log('[searchMovieByFavorite]', `Search failed: ${err.message}`);
				return reject(err);
			}
			resolve({ data: rows });
		});
	});
}

/** my_favorite = 1 */
async function searchMovieByMyFavorite() {
	const sql = "SELECT * FROM movie WHERE my_favorite = 1";
	return new Promise((resolve, reject) => {
		db.all(sql, [], (err, rows) => {
			if (err) {
				console.log('[searchMovieByMyFavorite]', `Search failed: ${err.message}`);
				return reject(err);
			}
			resolve({ data: rows });
		});
	});
}

/** note LIKE %keyword% (case-insensitive). */
async function searchMovieByNote(keyword) {
	const sql = "SELECT * FROM movie WHERE note LIKE ? COLLATE NOCASE";
	return new Promise((resolve, reject) => {
		db.all(sql, [`%${keyword}%`], (err, rows) => {
			if (err) {
				console.log('[searchMovieByNote]', `Search failed: ${err.message}`);
				return reject(err);
			}
			resolve({ data: rows });
		});
	});
}

// GET single by ID
async function searchMovieById(id) {
	throw new Error("Not implementation exception")
}

// CREATE
async function createMovies(movies) {
	if (Array.isArray(movies) && movies.length === 0) return "Empty";

	const sql = `INSERT OR IGNORE INTO movie ${createPropertiesCREATEColumns(columns)}
                VALUES ${createPropertiesValues(columns)}`;
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`BEGIN TRANSACTION`);
			const stmt = db.prepare(sql);
			for (const movie of movies) {
				stmt.run(createRecordArrayByPropertyName(columns, movie), err => {
					if (err) {
						console.log('[createMovies]', `Create failed: ${err.message}`);
						reject(err);
					};
				});
			}
			stmt.finalize();
			db.run(`COMMIT`, (err) => {
				if (err) {
					console.log('[createMovies]', `Create failed: ${err.message}`);
					reject(err)
				}
				console.log('[createMovies]', `Create successfully: ${movies.length} movie(s).`);
				resolve(true)
			});
		});
	})
}

// UPDATE
async function updateMovieById(id, updateData /* Map */) {
	const sql = `UPDATE movie SET ${setString} WHERE id = ?`;
	const { setString, valuesArr } = createPropertiesUPDATEColumns(updateData);
	return new Promise((resolve, reject) => {
		db.run(sql, [...valuesArr, id], function (err) {
			if (err) {
				console.log('[updateMovieById]', `Update failed: ${err.message}`);
				resolve(null);
			}
			console.log('[updateMovieById]', `Update successfully: ${id}`);
			resolve(id);
		});
	});
}

async function updateMovieByCode(code, updateData /* Map */) {
	const { setString, valuesArr } = createPropertiesUPDATEColumns(updateData);
	const sql = `UPDATE movie SET ${setString} WHERE code = ?`;
	return new Promise((resolve, reject) => {
		db.run(sql, [...valuesArr, code],
			function (err) {
				if (err) {
					console.log('[updateMovieByCode]', `Update failed: ${err.message}`)
					resolve(null);
				}
				console.log('[updateMovieByCode]', `Update successfully: ${code}`)
				resolve(code);
			}
		);
	});
}

async function updateMovieByContentId(contentId, updateData /* Map */) {
	const { setString, valuesArr } = createPropertiesUPDATEColumns(updateData);
	const sql = `UPDATE movie SET ${setString} WHERE contentId = ?`;
	return new Promise((resolve, reject) => {
		db.run(sql, [...valuesArr, contentId],
			function (err) {
				if (err) {
					console.log('[updateMovieByContentId]', `Update failed: ${err.message}`)
					resolve(null);
				}
				console.log('[updateMovieByContentId]', `Update successfully: ${contentId}`)
				resolve(contentId);
			}
		);
	});
}

// DELETE
async function deleteMovieById(id) {
	const sql = "DELETE FROM movie WHERE id = ?";
	return new Promise((resolve, reject) => {
		db.run(sql, [id],
			function (err) {
				if (err) {
					console.log('[deleteMovieById]', `Delete failed: ${err.message}`);
					resolve(null);
				}
				console.log('[deleteMovieById]', `Delete successfully: ${id}`);
				resolve(id);
			});
	});
}

module.exports = {
	searchMovieByCode,
	searchMoviesByCodes,
	searchMovieByContentId,
	createMovies,
	updateMovieByCode,
	deleteMovieById,
	searchMovieByNote,
	searchMovieByMyFavorite,
	searchMovieByFavorite,
	updateMovieByContentId
}