
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName, createPropertiesUPDATEColumns } = require("../helpers");

const columns = ["code", "title", "studio", "release_date", "runtime", "note", "favorite", "my_favorite", "thumbs_short", "thumbs", "images", "created_time", "updated_time", "metadata"];

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
                console.log('[searchMoviesByCode]', `Search failed: ${err.message}`)
                resolve({ err: err.message });
            }
            // console.log(rows)
            resolve({ data: rows });
        });
    })
}

async function searchMovieByFavorite(favorite) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM movie WHERE favorite = ?`, [favorite], (err, rows) => {
            if (err) return reject(err);
            resolve({ data: rows });
        });
    });
}

/** my_favorite = 1 */
async function searchMovieByMyFavorite() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM movie WHERE my_favorite = 1`, [], (err, rows) => {
            if (err) return reject(err);
            resolve({ data: rows });
        });
    });
}

/** note LIKE %keyword% (case-insensitive). */
async function searchMovieByNote(keyword) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM movie WHERE note LIKE ? COLLATE NOCASE`, [`%${keyword}%`], (err, rows) => {
            if (err) return reject(err);
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
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`);
            const stmt = db.prepare(`
            INSERT OR IGNORE INTO movie ${createPropertiesCREATEColumns(columns)}
            VALUES ${createPropertiesValues(columns)}`);
            for (const movie of movies) {
                stmt.run(createRecordArrayByPropertyName(columns, movie), err => {
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
async function updateMovieById(id, updateData /* Map */) {
    const { setString, valuesArr } = createPropertiesUPDATEColumns(updateData);
    return new Promise((resolve, reject) => {
        db.run(`UPDATE movie SET ${setString} WHERE id = ?`, [...valuesArr, id], function (err) {
            if (err) {
                console.log('[updateMovieById]', `Update failed: ${err.message}`);
                resolve(false);
            }
            resolve(true);
        });
    });
}

async function updateMovieByCode(code, updateData /* Map */) {
    const { setString, valuesArr } = createPropertiesUPDATEColumns(updateData);
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE movie SET ${setString} WHERE code = ?`,
            [...valuesArr, code],
            function (err) {
                if (err) {
                    console.log('[updateMovieByCode]', `Update failed: ${err.message}`)
                    resolve(false);
                }
                resolve(true);
            }
        );
    });
}

// DELETE
async function deleteMovieById(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM movie WHERE id = ?`, [id],
            function (err) {
                if (err) {
                    console.log('[deleteMovieById]', `Delete failed: ${err.messages}`);
                    resolve(false);
                }
                resolve(true);
            });
    });
}

module.exports = {
    searchMovieByCode,
    createMovies,
    updateMovieByCode,
    deleteMovieById,
    searchMovieByNote,
    searchMovieByMyFavorite,
    searchMovieByFavorite
}