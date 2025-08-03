
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName } = require("../helpers");

const properties = ["code", "title", "studio", "release_date", "runtime", "note", "favorite", "my_favorite", "thumbs_short", "thumbs", "images", "created_time", "updated_time", "metadata"];

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
        params = terms.map(term => `%${term}%`);
    }

    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                console.log('[searchMoviesByCode]', `Search failed: ${err.message}`)
                resolve({ err: err.message });
            }
            // console.log(rows)
            resolve({ data: rows });
        });
    })
}

// GET single by ID
async function searchMovieById(id) {
    throw new Error("Not implementation exception")
}

// CREATE
async function createMovies(movies) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`);
            const stmt = db.prepare(`
            INSERT OR IGNORE INTO movie ${createPropertiesCREATEColumns(properties)}
            VALUES ${createPropertiesValues(properties)}`);
            for (const movie of movies) {
                stmt.run(createRecordArrayByPropertyName(properties, movie), err => {
                    if (err) {
                        console.log('[createMovies]', `Create failed: ${err.message}`)
                        reject(`Create failed: ${err.message}`);
                    };
                });
            }
            stmt.finalize();
            db.run(`COMMIT`, (err) => { if (err) reject(err); resolve(true) });
        });
    })
}

// UPDATE
async function updateMovie(id, model) {
    throw new Error("Not implementation exception")
}

// DELETE
async function deleteMovie(id) {
    throw new Error("Not implementation exception")
}

module.exports = { searchMovieByCode, createMovies, createMovies }