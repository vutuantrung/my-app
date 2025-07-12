
const db = require("../database/db")

const properties = ["code", "title", "studio", "release_date", "runtime", "note", "favorite", "my_favorite", "thumbs_short", "thumbs", "metadata"];

// GET all or search by codes (comma-separated)
async function searchMovieByCode(code = '') {
	if (!code) {
		return;
	}

	const terms = code ? code.split(',').map(n => n.trim()).filter(Boolean) : [];
	let query = 'SELECT * FROM movie';
	let params = [];

	if (terms.length > 0) {
		const orClause = terms.map(() => 'code LIKE ?').join(' OR ');
		query += ` WHERE ${orClause}`;
		params = terms.map(term => `%${term}%`);
	}

	return db.all(query, params, (err, rows) => {
		if (err) {
			console.log(err.message);
			return null;
		}
		return rows;
	});
}

// GET single by ID
async function searchMovieById(id) {
	throw new Error("Not implementation exception")
}

// CREATE
async function createMovie(data) {
	const { code, title, studio, release_date, runtime, note, favorite, my_favorite, thumbs_short, thumbs, metadata } = data;

	return new Promise((resolve, reject) => {
		db.run(
			`INSERT INTO movie ${createPropertiesColumns()} VALUES ${createPropertiesValues()}`,
			[code, title, studio, release_date, runtime, note, favorite, my_favorite, thumbs_short, thumbs, metadata],
			function (err) {
				if (err) {
					console.log(err.message);
					reject(err);
				} else {
					resolve({ id: this.lastID });
				}
			}
		);
	})
}

async function createMovies(data) {
	const movies = data.map(m => {
		return `(${m.code}, ${m.title}, ${m.studio}, ${m.release_date}, ${m.runtime}, ${m.note}, ${m.favorite}, ${m.my_favorite}, ${m.thumbs_short}, ${m.thumbs}, ${m.metadata})`;
	})
	db.exec(
		`INSERT INTO movie ${createPropertiesColumns()}
		 VALUES ` + movies.join(', '),
		function (err) {
			if (err) {
				console.log(err.message);
				return false;
			}
			return true;
		}
	);
}

// UPDATE
async function updateMovie(id, model) {
	throw new Error("Not implementation exception")
}

// DELETE
async function deleteMovie(id) {
	throw new Error("Not implementation exception")
}

function createPropertiesColumns() {
	return `(${properties.join(', ')})`;
}

function createPropertiesValues() {
	return `(${properties.map(() => '?').join(', ')})`;
}

module.exports = { searchMovieByCode, createMovie, createMovies }