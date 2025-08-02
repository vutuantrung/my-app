
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName, createPropertiesUPDATEColumns } = require("../helpers");

const columns = ["name", "dob", "measurements", "height", "country", "cup", "movies_count", "note", "favorite", "jp", "my_favorite", "created_time", "updated_time", "metadata"]

// GET all or search by names (comma-separated)
async function searchIdolsByName(name) {
	return new Promise((resolve, reject) => {
		const terms = name ? name.split(',').map(n => n.trim()).filter(Boolean) : [];
		let query = 'SELECT * FROM idol_profile';
		let params = [];

		if (terms.length > 0) {
			const orClause = terms.map(() => 'name = ?').join(' OR ');
			query += ` WHERE ${orClause}`;
			params = terms.map(term => `%${term}%`);
		}

		db.all(query, params, (err, rows) => {
			if (err) {
				console.log('[searchIdolsByName]', `Search failed: ${err.message}`)
				resolve({ data: null });
			};
			resolve({ data: rows });
			// console.log(rows)
			resolve({ data: rows });
		});
	})
}

async function searchIdolByMyFavorite() {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM idol_profile WHERE my_favorite = 1`,
			[],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolByMyFavorite]', `Search failed: ${err.message}`)
					resolve({ data: null });
				};
				resolve({ data: rows });
			});
	});
}

// GET idols by keyword in 'note' (partial match)
async function searchIdolByNote(keyword) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM idol_profile WHERE note LIKE ?`,
			[`%${keyword}%`],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolByNote]', `Search failed: ${err.message}`)
					resolve({ data: null });
				};
				resolve({ data: rows });
			});
	});
}

async function searchIdolByFavorite(favorite) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM idol_profile WHERE favorite = ?`,
			[favorite],
			(err, rows) => {
				if (err) {
					console.log('[searchIdolByFavorite]', `Search failed: ${err.message}`)
					resolve({ data: null });
				};
				resolve({ data: rows });
			});
	});
}

// CREATE
async function createIdols(idols) {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`BEGIN TRANSACTION`);
			const stmt = db.prepare(`
            INSERT OR IGNORE INTO idol_profile ${createPropertiesCREATEColumns(columns)}
            VALUES ${createPropertiesValues(columns)}`);
			for (const idol of idols) {
				stmt.run(createRecordArrayByPropertyName(columns, idol), err => {
					if (err) {
						console.log('[createIdols]', `Create failed: ${err.message}`)
						reject(`Create failed: ${err.message}`)
					};
				});
			}
			stmt.finalize();
			db.run(`COMMIT`, (err) => { if (err) reject(err); resolve(true) });
		});
	})
}

// UPDATE
async function updateIdolById(id, idolUpdateData) {
	return new Promise((resolve, reject) => {
		const { setString, valuesArr } = createPropertiesUPDATEColumns(idolUpdateData);
		db.run(`UPDATE idol_profile SET ${setString} WHERE id = ?`,
			[...valuesArr, id],
			function (err) {
				if (err) {
					console.log('[updateIdolById]', `Update failed: ${err.message}`);
					resolve(false);
				}
				resolve(true);
			}
		);
	})
}

async function updateIdolByName(name, idolUpdateData) {
	return new Promise((resolve, reject) => {
		const { setString, valuesArr } = createPropertiesUPDATEColumns(idolUpdateData);
		db.run(`UPDATE idol_profile SET ${setString} WHERE name = ?`,
			[...valuesArr, name],
			function (err) {
				if (err) {
					console.log('[updateIdolByName]', `Update failed: ${err.message}`);
					resolve(false);
				}
				resolve(true);
			}
		);
	})
}

// DELETE
async function deleteIdolById(id) {
	return new Promise((resolve, reject) => {
		db.run(`DELETE FROM idol_profile WHERE id = ?`,
			[id],
			function (err) {
				if (err) {
					console.log('[deleteIdolById]', `Delete failed: ${err.messages}`);
					resolve(false);
				}
				resolve(true);
			});
	});
}

module.exports = {
	searchIdolsByName,
	searchIdolByFavorite,
	searchIdolByMyFavorite,
	searchIdolByNote,
	createIdols,
	updateIdolById,
	updateIdolByName,
	deleteIdolById
};