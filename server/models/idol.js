// models/idolModel.js
const db = require("../database/db");

// Whitelist to prevent SQL injection in ORDER BY
const SORTABLE = new Set(["id", "name", "created_time", "updated_time", "movies_count"]);
function normalizeSort(sort) {
	const s = String(sort || "name").toLowerCase();
	return SORTABLE.has(s) ? s : "name";
}
function normalizeOrder(order) {
	const o = String(order || "asc").toLowerCase();
	return o === "desc" ? "DESC" : "ASC";
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}

/**
 * Paginated list with optional filters:
 * options = { page, pageSize, search, favorite, my_favorite, sort, order }
 */
async function getIdolsPaginated(options = {}) {
	const page = clamp(parseInt(options.page || 1, 10) || 1, 1, 1e9);
	const pageSize = clamp(parseInt(options.pageSize || 20, 10) || 20, 1, 200);
	const sort = normalizeSort(options.sort);
	const order = normalizeOrder(options.order);

	const where = [];
	const params = [];

	if (options.search) {
		where.push("(name LIKE ? COLLATE NOCASE OR jp LIKE ? COLLATE NOCASE)");
		const k = `%${options.search}%`;
		params.push(k, k);
	}
	if (options.favorite) {
		where.push("favorite = ?");
		params.push(options.favorite);
	}
	if (options.my_favorite !== undefined) {
		where.push("my_favorite = ?");
		params.push(options.my_favorite ? 1 : 0);
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

	const sql = `SELECT * FROM idol_profile ${whereSql} ORDER BY ${sort} ${order}, id ASC LIMIT ? OFFSET ?`;
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

module.exports = {
	// …your existing exports
	// getIdolsPaginated,
};
