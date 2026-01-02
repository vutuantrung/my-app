const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName, createPropertiesUPDATEColumns } = require("../helpers");

const columns = ["name", "dob", "measurements", "height", "country", "cup", "movies_count", "note", "favorite", "jp", "my_favorite", "created_time", "updated_time", "metadata"];

const IDOL_SORT_COLUMNS = new Set(["id", "cup", "note", "name", "created_time", "updated_time", "movies_count"]);
function normalizeIdolSort(sort) {
	const s = String(sort || "name").toLowerCase();
	return IDOL_SORT_COLUMNS.has(s) ? s : "name";
}
function normalizeIdolOrder(order) {
	const o = String(order || "asc").toLowerCase();
	return o === "desc" ? "DESC" : "ASC";
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}


async function searchIdolByName(name) {
	return new Promise((resolve, reject) => {
		const sqlCommand = 'SELECT * FROM idol_profile WHERE name = ? COLLATE NOCASE';
		db.get(sqlCommand, [name], (err, row) => {
			if (err) {
				console.error('[searchIdolByName]', `Search failed: ${err.message}`);
				return reject(err);
			}
			resolve(row || null);
		});
	});
}

// GET all or search by names (comma-separated)
async function searchIdolsByNames(names) {
	return new Promise((resolve, reject) => {
		const terms = names ? names.split(',').map(n => n.trim()).filter(Boolean) : [];
		let sqlCommand = 'SELECT * FROM idol_profile';
		let params = [];

		if (terms.length > 0) {
			const orClause = terms.map(() => 'name = ?').join(' OR ');
			sqlCommand += ` WHERE ${orClause}`;
			params = terms; // exact values, no wildcards
		}

		db.all(sqlCommand, params, (err, rows) => {
			if (err) {
				console.error('[searchIdolsByNames]', `Search failed: ${err.message}`);
				return reject(err);
			}
			resolve({ data: rows || [] });
		});
	});
}

async function searchIdolsByNameLike(name) {
	return new Promise((resolve, reject) => {
		const terms = name ? name.split(',').map(n => n.trim()).filter(Boolean) : [];
		let sqlCommand = 'SELECT * FROM idol_profile';
		let params = [];

		if (terms.length > 0) {
			const orClause = terms.map(() => 'name LIKE ?').join(' OR ');
			sqlCommand += ` WHERE ${orClause}`;
			params = terms.map(term => `%${term}%`);
		}

		db.all(sqlCommand, params, (err, rows) => {
			if (err) {
				console.error('[searchIdolsByNameLike]', `Search failed: ${err.message}`);
				return reject(err);
			}
			resolve({ data: rows });
		});
	});
}

async function searchIdolByMyFavorite() {
	const sqlCommand = `SELECT * FROM idol_profile WHERE my_favorite = 1`
	return new Promise((resolve, reject) => {
		db.all(sqlCommand, [],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolByMyFavorite]', `Search failed: ${err.message}`)
					return reject(err);
				};
				resolve({ data: rows });
			});
	});
}

async function searchIdolsByAliasName(name) {
	return new Promise((resolve, reject) => {
		const aliasName = name.trim();
		const sqlCommand = `SELECT * FROM idol_profile WHERE alias IS NOT NULL AND (',' || alias || ',') LIKE ?`;
		// token-safe pattern: %,name,%
		const params = [`%,${aliasName},%`];
		db.all(sqlCommand, params, (err, rows) => {
			if (err) {
				console.error('[searchIdolsByAliasName]', err.message);
				return reject(err);
			}
			resolve({ data: rows || [] });
		});
	});
}


async function searchIdolsPaginated(options = {}) {
	const page = clamp(parseInt(options.page || 1, 10) || 1, 1, 1e9);
	const pageSize = clamp(parseInt(options.pageSize || 20, 10) || 20, 1, 200);
	const sort = normalizeIdolSort(options.sortBy);
	const order = normalizeIdolOrder(options.sortOrder);

	const where = [];
	const params = [];

	if (options.search) {
		where.push("(name LIKE ? COLLATE NOCASE OR jp LIKE ? COLLATE NOCASE)");
		const k = `%${options.search}%`;
		params.push(k, k);
	}
	if (options.my_favorite !== undefined) {
		const mf = Number(options.my_favorite) ? 1 : 0;
		where.push("my_favorite = ?");
		params.push(mf);
	}

	const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

	// 1) total count
	const total = await new Promise((resolve, reject) => {
		db.get(`SELECT COUNT(*) AS cnt FROM idol_profile ${whereSql}`, params, (err, row) => {
			if (err) return reject(err);
			resolve(row?.cnt || 0);
		});
	});

	// 2) page slice
	const offset = (page - 1) * pageSize;
	const sliceParams = params.slice();
	sliceParams.push(pageSize, offset);

	const sql = `SELECT id, name, movies_count FROM idol_profile ${whereSql} ORDER BY ${sort} ${order}, id ASC LIMIT ? OFFSET ?`;
	const rows = await new Promise((resolve, reject) => {
		db.all(sql, sliceParams, (err, arr) => {
			if (err) return reject(err);
			resolve(arr);
		});
	});

	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	return {
		data: rows,
		page,
		pageSize,
		total,
		totalPages,
	};
}

// GET idols by keyword in 'note' (partial match)
async function searchIdolByNote(keyword) {
	const sqlCommand = `SELECT * FROM idol_profile WHERE note LIKE ?`;
	return new Promise((resolve, reject) => {
		db.all(sqlCommand, [`%${keyword}%`],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolByNote]', `Search failed: ${err.message}`)
					return reject(err);
				};
				resolve({ data: rows });
			});
	});
}

async function searchIdolByFavorite(favorite) {
	const sqlCommand = `SELECT * FROM idol_profile WHERE favorite = ?`;
	return new Promise((resolve, reject) => {
		db.all(sqlCommand, [favorite],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolByFavorite]', `Search failed: ${err.message}`);
					return reject(err);
				};
				resolve({ data: rows });
			});
	});
}

// CREATE
async function createIdols(idols) {
	if (Array.isArray(idols) && idols.length === 0) return "Empty";
	const sqlCommand = `INSERT OR IGNORE INTO idol_profile ${createPropertiesCREATEColumns(columns)}
                        VALUES ${createPropertiesValues(columns)}`;
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`BEGIN TRANSACTION`);
			const stmt = db.prepare(sqlCommand);
			for (const idol of idols) {
				stmt.run(createRecordArrayByPropertyName(columns, idol), err => {
					if (err) {
						console.log('[createIdols]', `Create failed: ${err.message}`);
						reject(err);
					};
				});
			}
			stmt.finalize();
			db.run(`COMMIT`, (err) => {
				if (err) {
					console.log('[createIdols]', `Create failed: ${err.message}`);
					reject(err);
				}
				console.log('[createIdols]', `Create successfully: ${idols.length} idol(s).`);
				resolve(true)
			});
		});
	})
}

// UPDATE
async function updateIdolById(id, idolUpdateData) {
	const { setString, valuesArr } = createPropertiesUPDATEColumns(idolUpdateData);
	const sqlCommand = `UPDATE idol_profile SET ${setString} WHERE id = ?`;
	return new Promise((resolve, reject) => {
		db.run(sqlCommand, [...valuesArr, id],
			function (err) {
				if (err) {
					console.log('[updateIdolById]', `Update failed: ${err.message}`);
					resolve(false);
				}
				console.log('[updateIdolById]', `Update successfully: ${id}`);
				resolve(id);
			}
		);
	})
}

async function updateIdolByName(name, idolUpdateData) {
	const { setString, valuesArr } = createPropertiesUPDATEColumns(idolUpdateData);
	const sqlCommand = `UPDATE idol_profile SET ${setString} WHERE name = ?`;

	return new Promise((resolve, reject) => {
		db.run(sqlCommand, [...valuesArr, name], function (err) {
			if (err) {
				console.log('[updateIdolByName]', `Update failed: ${err.message}`);
				return reject(err);
			}
			console.log('[updateIdolByName]', `Update successfully: ${name}`);
			return resolve(this.changes > 0);       // true only if a row was changed
		});
	});
}

// DELETE
async function deleteIdolById(id) {
	const sqlCommand = `DELETE FROM idol_profile WHERE id = ?`;
	return new Promise((resolve, reject) => {
		db.run(sqlCommand, [id],
			function (err) {
				if (err) {
					console.log('[deleteIdolById]', `Delete failed: ${err.message}`);
					return reject(err);
				}
				console.log('[deleteIdolById]', `Delete successfully: ${id}`);
				resolve(id);
			});
	});
}

module.exports = {
	searchIdolByName,
	searchIdolsByNames,
	searchIdolsByNameLike,
	searchIdolByFavorite,
	searchIdolByMyFavorite,
	searchIdolByNote,
	searchIdolsByAliasName,
	searchIdolsPaginated,
	createIdols,
	updateIdolByName,
	updateIdolById,
	deleteIdolById
};