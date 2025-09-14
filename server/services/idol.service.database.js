
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName, createPropertiesUPDATEColumns } = require("../helpers");

const columns = ["name", "dob", "measurements", "height", "country", "cup", "movies_count", "note", "favorite", "jp", "my_favorite", "created_time", "updated_time", "metadata"]

// GET all or search by names (comma-separated)
async function searchIdolsByName(name) {
    return new Promise((resolve, reject) => {
        const terms = name ? name.split(',').map(n => n.trim()).filter(Boolean) : [];
        let sqlCommand = 'SELECT * FROM idol_profile';
        let params = [];

        if (terms.length > 0) {
            const orClause = terms.map(() => 'name = ?').join(' OR ');
            sqlCommand += ` WHERE ${orClause}`;
            params = terms; // exact values, no wildcards
        }

        db.all(sqlCommand, params, (err, rows) => {
            if (err) {
                console.error('[searchIdolsByName]', `Search failed: ${err.message}`);
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
                    resolve({ data: null });
                };
                resolve({ data: rows });
            });
    });
}

// GET idols by keyword in 'note' (partial match)
async function searchIdolByNote(keyword) {
    const sqlCommand = `SELECT * FROM idol_profile WHERE note LIKE ?`;
    return new Promise((resolve, reject) => {
        db.all(sqlCommand, [`%${keyword}%`],
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
    const sqlCommand = `SELECT * FROM idol_profile WHERE favorite = ?`;
    return new Promise((resolve, reject) => {
        db.all(sqlCommand, [favorite],
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
    const sqlCommand = `INSERT OR IGNORE INTO idol_profile ${createPropertiesCREATEColumns(columns)}
                        VALUES ${createPropertiesValues(columns)}`;
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`);
            const stmt = db.prepare(sqlCommand);
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
    const { setString, valuesArr } = createPropertiesUPDATEColumns(idolUpdateData);
    const sqlCommand = `UPDATE idol_profile SET ${setString} WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(sqlCommand, [...valuesArr, id],
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
    const { setString, valuesArr } = createPropertiesUPDATEColumns(idolUpdateData);
    const sqlCommand = `UPDATE idol_profile SET ${setString} WHERE name = ?`
    return new Promise((resolve, reject) => {
        db.run(sqlCommand, [...valuesArr, name], function (err) {
            if (err) {
                console.log('[updateIdolByName]', `Update failed: ${err.messages}`);
                resolve(false);
            }          // <-- don't swallow errors
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