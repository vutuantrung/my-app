
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName, createPropertiesUPDATEColumns } = require("../helpers");

const columns = ["code", "contentId", "title", "studio", "release_date", "runtime", "note", "favorite", "my_favorite", "thumbs_short", "thumbs", "images", "created_time", "updated_time", "metadata"];

const MOVIE_SORT_COLUMNS = [
	"release_date",
	"updated_time",
	"created_time",
	"code",
	"title",
	"studio",
	"id",
];
function normalizeMovieSort(sort) {
	const s = String(sort || "created_time");
	return MOVIE_SORT_COLUMNS.includes(s) ? s : "created_time";
}
function normalizeOrder(order) {
	const o = String(order || "asc").toUpperCase();
	return o === "DESC" ? "DESC" : "ASC";
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}

function dbAll(db, sql, params = []) {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
	});
}

async function searchMovieByCodeExact(code) {
	if (!code) {
		return { data: null };
	}

	const query = `
		SELECT *
		FROM movie
		WHERE code = ? COLLATE NOCASE
		ORDER BY updated_time DESC, id DESC
		LIMIT 1
	`;

	return new Promise((resolve) => {
		db.get(query, [code], (err, row) => {
			if (err) {
				console.log('[searchMovieByCodeExact]', `Search failed: ${err.message}`);
				return resolve({ err: err.message, data: null });
			}
			resolve(row || null);
		});
	});
}

async function searchMovieByCodeLike(code) {
	if (!code) {
		return { data: null };
	}

	const query = `
		SELECT *
		FROM movie
		WHERE code LIKE ? COLLATE NOCASE
		ORDER BY updated_time DESC, id DESC
		LIMIT 1
	`;

	return new Promise((resolve) => {
		db.all(query, [code], (err, row) => {
			if (err) {
				console.log('[searchMovieByCodeExact]', `Search failed: ${err.message}`);
				return resolve({ err: err.message, data: null });
			}
			resolve(row || null);
		});
	});
}

// GET all or search by codes (comma-separated)
async function searchMoviesByCodes(codesInput) {
	// Normalize to an ordered array of raw patterns (what user typed)
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
			// substring / prefix matching: %pattern%
			const params = chunk.map(pattern => `%${pattern}%`);
			const orClause = chunk
				.map(() => "code LIKE ? COLLATE NOCASE")
				.join(" OR ");

			const sql = `SELECT * FROM movie WHERE ${orClause}`;
			rows.push(...await dbAll(db, sql, params));
		}

		// If you care about "notFound" per pattern:
		const rowWraps = rows.map(r => ({
			row: r,
			codeLower: String(r.code || "").toLowerCase(),
		}));

		const matchedPatterns = new Set();
		for (const pattern of uniqueCodes) {
			const pLower = pattern.toLowerCase();
			if (rowWraps.some(w => w.codeLower.includes(pLower))) {
				matchedPatterns.add(pattern);
			}
		}
		const notFound = uniqueCodes.filter(c => !matchedPatterns.has(c));

		// Now `data` is ALL matching rows, not 1 per pattern
		return { data: rows };
	} catch (err) {
		console.error("[searchMoviesByCodes] Search failed:", err.message);
		return { data: [], notFound: [], err: err.message };
	}
}

async function searchMovieByContentId(contentId) {
	if (!contentId) {
		return { data: null };
	}

	const query = `
		SELECT *
		FROM movie
		WHERE contentId = ?
		ORDER BY updated_time DESC, id DESC
		LIMIT 1
	`;

	return new Promise((resolve) => {
		db.get(query, [contentId], (err, row) => {
			if (err) {
				console.log('[searchMovieByContentId]', `Search failed: ${err.message}`);
				return reject(err)
			}
			return resolve(row || null);
		});
	});
}

async function searchMoviesByContentIds(contentIdList) {
	if (!contentIdList) {
		return;
	}

	const terms = contentIdList ? contentIdList.split(',').map(n => n.trim()).filter(Boolean) : [];
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
				console.log('[searchMoviesByContentIds]', `Search failed: ${err.message}`);
				return reject(err)
			}
			// console.log(rows)
			return resolve({ data: rows });
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

async function searchMoviesPaginated(options = {}) {
	console.log(options)
	const page = clamp(parseInt(options.page || 1, 10) || 1, 1, 1e9);
	const pageSize = clamp(parseInt(options.pageSize || 20, 10) || 20, 1, 200);
	const sort = normalizeMovieSort(options.sortBy);
	const order = normalizeOrder(options.sortOrder);

	const where = [];
	const params = [];

	// ---- Filters ----

	// codes: array or comma-separated string
	let codes = options.codes;
	if (codes && !Array.isArray(codes)) {
		codes = String(codes)
			.split(",")
			.map((x) => x.trim())
			.filter(Boolean);
	}

	if (codes && Array.isArray(codes) && codes.length > 0) {
		const placeholders = codes.map(() => "?").join(",");
		where.push(`code IN (${placeholders}) COLLATE NOCASE`);
		params.push(...codes);
	} else if (options.code) {
		where.push("code = ? COLLATE NOCASE");
		params.push(String(options.code).trim());
	}

	if (options.title) {
		where.push("title LIKE ? COLLATE NOCASE");
		params.push(`%${String(options.title).trim()}%`);
	}

	if (options.studio) {
		where.push("studio LIKE ? COLLATE NOCASE");
		params.push(`%${String(options.studio).trim()}%`);
	}

	if (options.note) {
		where.push("note LIKE ? COLLATE NOCASE");
		params.push(`%${String(options.note).trim()}%`);
	}

	if (options.favorite !== undefined && options.favorite !== null && options.favorite !== "") {
		const f = Number(options.favorite) ? 1 : 0;
		where.push("favorite = ?");
		params.push(f);
	}

	if (options.my_favorite !== undefined) {
		const mf = Number(options.my_favorite) ? 1 : 0;
		where.push("my_favorite = ?");
		params.push(mf);
	}

	const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

	// 1) total count
	const total = await new Promise((resolve, reject) => {
		const sqlCommand = `SELECT COUNT(*) AS cnt FROM movie ${whereSql}`;

		db.get(sqlCommand, params, (err, row) => {
			if (err) return reject(err);
			resolve(row?.cnt || 0);
		});
	});

	// 2) page slice
	const offset = (page - 1) * pageSize;
	const sliceParams = params.slice();
	sliceParams.push(pageSize, offset);

	//const sql = `SELECT * FROM movie ${whereSql} ORDER BY ${sort} ${order}, id DESC LIMIT ? OFFSET ?`;
	const sql = `SELECT * FROM movie ${whereSql} ORDER BY ${sort} ${order}, id DESC LIMIT ? OFFSET ?`;
	const rows = await new Promise((resolve, reject) => {
		db.all(sql, sliceParams, (err, arr) => {
			if (err) return reject(err);
			resolve(arr);
		});
	});

	const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

	return {
		data: rows,
		page,
		pageSize,
		total,
		totalPages,
		offset,
	};
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
				// console.log('[updateMovieByCode]', `Update successfully: ${code}`)
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
	searchMovieByCodeExact,
	searchMoviesByCodes,
	searchMovieByContentId,
	searchMoviesPaginated,
	createMovies,
	updateMovieByCode,
	deleteMovieById,
	searchMovieByNote,
	searchMovieByMyFavorite,
	searchMovieByFavorite,
	updateMovieByContentId,
	searchMoviesByContentIds
}

// searchMovieByContentId("mida00277").then(result => {
// 	console.log(result);
// }).catch(err => {
// 	console.error(err);
// });