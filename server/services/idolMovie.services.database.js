
const db = require("../database/db");
const { createPropertiesColumns, createPropertiesValues, createRecordArrayByPropertyName } = require("../helpers");

const properties = ["idol_name", "movie_code"];

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

async function searchMovieByIdolName(idolName) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM idol_movie WHERE idol_name = ?`,
            [idolName],
            (err, row) => {
                if (err) {
                    reject(`Database error: ${err.message}`);
                } else {
                    resolve(row || null);
                }
            });
    });
}

async function searchIdolByMovieCode(movieCode) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM idol_movie WHERE code = ?`,
            [movieCode],
            (err, row) => {
                if (err) {
                    reject(`Database error: ${err.message}`);
                } else {
                    resolve(row || null);
                }
            });
    });
}

// CREATE
async function createIdolMovies(idolMovies) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`);
            const stmt = db.prepare(`
            INSERT OR IGNORE INTO idol_movie ${createPropertiesColumns(properties)}
            VALUES ${createPropertiesValues(properties)}`);
            for (const idolMovie of idolMovies) {
                stmt.run(createRecordArrayByPropertyName(properties, idolMovie), err => {
                    if (err) reject(`Insert failed: ${err.message}`);
                });
            }
            stmt.finalize();
            db.run(`COMMIT`, (err) => { if (err) reject(err); resolve(true) });
        });
    })
}

module.exports = { createIdolMovies, searchIdolByMovieCode, searchMovieByIdolName }