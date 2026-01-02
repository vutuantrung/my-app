const db = require("../database/db");
const {
	createPropertiesCREATEColumns,
	createPropertiesValues,
	createRecordArrayByPropertyName,
	createPropertiesUPDATEColumns
} = require("../helpers");

const columns = ["name", "alias", "dob", "measurements", "height", "country", "cup", "albums_count", "favorite", "my_favorite", "created_time", "updated_time", "metadata"]
const MODEL_SORT_COLUMNS = new Set(["id", "name", "created_time", "updated_time", "albums_count"]);

function normalizeIdolSort(sort) {
	const s = String(sort || "name").toLowerCase();
	return MODEL_SORT_COLUMNS.has(s) ? s : "name";
}
function normalizeIdolOrder(order) {
	const o = String(order || "asc").toLowerCase();
	return o === "desc" ? "DESC" : "ASC";
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}

async function searchModelByName(name) {
	return new Promise((resolve, reject) => {
		const terms = name ? name.split(',').map(n => n.trim()).filter(Boolean) : [];
		let sqlCommand = 'SELECT * FROM model_profile';
		let params = [];

		if (terms.length > 0) {
			const orClause = terms.map(() => 'name = ?').join(' OR ');
			sqlCommand += ` WHERE ${orClause}`;
			params = terms; // exact values, no wildcards
		}
		db.all(sqlCommand, params, (err, rows) => {
			if (err) {
				console.error('[searchModelByName]', `Search failed: ${err.message}`);
				return reject(err);
			}
			resolve({ data: rows });
		});
	});
}

// CREATE
async function createModels(models) {
	if (Array.isArray(models) && models.length === 0) return "Empty";
	const sqlCommand = `INSERT OR IGNORE INTO model_profile ${createPropertiesCREATEColumns(columns)}
                        VALUES ${createPropertiesValues(columns)}`;
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`BEGIN TRANSACTION`);
			const stmt = db.prepare(sqlCommand);
			for (const model of models) {
				stmt.run(createRecordArrayByPropertyName(columns, model), err => {
					if (err) {
						console.log('[createModels]', `Create failed: ${err.message}`);
						reject(err);
					};
				});
			}
			stmt.finalize();
			db.run(`COMMIT`, (err) => {
				if (err) {
					console.log('[createModels]', `Create failed: ${err.message}`);
					reject(err);
				}
				console.log('[createModels]', `Create successfully: ${models.length} model(s).`);
				resolve(true)
			})
		})
	})
}

// UPDATE
async function updateModelByName(name, modelUpdateData) {
	const { setString, valuesArr } = createPropertiesUPDATEColumns(modelUpdateData);
	const sqlCommand = `UPDATE model_profile SET ${setString} WHERE name = ?`
	return new Promise((resolve, reject) => {
		db.run(sqlCommand, [...valuesArr, name], function (err) {
			if (err) {
				console.log('[updateModelByName]', `Update failed: ${err.message}`);
				resolve(false);
			}
			console.log('[updateModelByName]', `Update successfully: ${name}`);
			return resolve(this.changes > 0);       // true only if a row was changed
		});
	});
}

async function searchModelsPaginated(options = {}) {
	console.log(options)
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
		db.get(`SELECT COUNT(*) AS cnt FROM model_profile ${whereSql}`, params, (err, row) => {
			if (err) return reject(err);
			resolve(row?.cnt || 0);
		});
	});

	// 2) page slice
	const offset = (page - 1) * pageSize;
	const sliceParams = params.slice();
	sliceParams.push(pageSize, offset);

	const sql = `SELECT id, name, albums_count FROM model_profile ${whereSql} ORDER BY ${sort} ${order}, id ASC LIMIT ? OFFSET ?`;
	console.log(sql)
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

module.exports = { createModels, updateModelByName, searchModelByName, searchModelsPaginated }