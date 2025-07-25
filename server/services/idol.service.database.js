
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName, createPropertiesUPDATEColumns } = require("../helpers");

const properties = ["name", "dob", "measurements", "height", "country", "cup", "movies_count", "note", "favorite", "jp", "my_favorite", "metadata"]

// GET all or search by names (comma-separated)
async function searchIdolsByName(name) {
	if (!name) {
		return;
	}

	const terms = name ? name.split(',').map(n => n.trim()).filter(Boolean) : [];
	let query = 'SELECT * FROM idol_profile';
	let params = [];

	if (terms.length > 0) {
		const orClause = terms.map(() => 'name LIKE ?').join(' OR ');
		query += ` WHERE ${orClause}`;
		params = terms.map(term => `%${term}%`);
	}

	return new Promise((resolve, reject) => {
		db.all(query, params, (err, rows) => {
			if (err) {
				console.log('[searchIdolsByName]', err.message)
				resolve({ err: err.message });
			}
			// console.log(rows)
			resolve({ data: rows });
		});
	})
}

// GET single by ID
async function searchIdolByFavorite(id) {
	throw new Error("Not implementation exception")
}
async function searchIdolByMyFavorite(id) {
	throw new Error("Not implementation exception")
}
async function searchIdolByNote(id) {
	throw new Error("Not implementation exception")
}

// CREATE
async function createIdols(idols) {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`BEGIN TRANSACTION`);
			const stmt = db.prepare(`
            INSERT OR IGNORE INTO idol_profile ${createPropertiesCREATEColumns(properties)}
            VALUES ${createPropertiesValues(properties)}`);
			for (const idol of idols) {
				stmt.run(createRecordArrayByPropertyName(properties, idol), err => {
					if (err) reject(`Insert failed: ${err.message}`);
				});
			}
			stmt.finalize();
			db.run(`COMMIT`, (err) => { if (err) reject(err); resolve(true) });
		});
	})
}

// UPDATE
async function updateIdol(id, idolUpdateData) {
	const { setString, valuesArr } = createPropertiesUPDATEColumns(idolUpdateData);
	db.run(`UPDATE idol_profile SET ${setString} WHERE id = ?`,
		[...valuesArr, id],
		function (err) {
			if (err) return res.status(500).json({ error: err.message });
			if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
			res.json({ message: 'Updated' });
		}
	);
}

// DELETE
async function deleteIdol(id) {
	throw new Error("Not implementation exception")
}

module.exports = { searchIdolsByName, createIdols, updateIdol }