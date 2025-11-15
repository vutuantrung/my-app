
const db = require("../database/db");
const { createPropertiesCREATEColumns, createPropertiesValues, createRecordArrayByPropertyName } = require("../helpers");

const properties = ["model_name", "album_id"];

async function getAll() {
    const sql = "SELECT model_name, album_id FROM model_album";
    return new Promise((resolve, reject) => {
        db.all(sql, [],
            (err, rows) => {
                if (err) {
                    console.log('[getAll]', `Search failed: ${err.message}`);
                    reject(err);
                } else {
                    resolve(rows || null);
                }
            });
    });
}

async function searchAlbumByModelName(modelName) {
    const sql = "SELECT * FROM model_album WHERE model_name = ?";
    return new Promise((resolve, reject) => {
        db.all(sql, [modelName],
            (err, row) => {
                if (err) {
                    console.log('[searchAlbumByModelName]', `Search failed: ${err.message}`);
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
    });
}

async function searchModelsByAlbumId(albumId) {
    const sql = "SELECT * FROM model_album WHERE album_id = ?";
    return new Promise((resolve, reject) => {
        db.all(sql, [albumId],
            (err, row) => {
                if (err) {
                    console.log('[searchModelsByAlbumId]', `Search failed: ${err.message}`);
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
    });
}

// CREATE
async function createModelAlbum(modelAlbums) {
    if (Array.isArray(modelAlbums) && modelAlbums.length === 0) return "Empty";

    const sql = `INSERT OR IGNORE INTO model_album ${createPropertiesCREATEColumns(properties)}
                VALUES ${createPropertiesValues(properties)}`
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`);
            const stmt = db.prepare(sql);
            for (const modelAlbum of modelAlbums) {
                console.log('[modelAlbum]', modelAlbum);
                stmt.run(createRecordArrayByPropertyName(properties, modelAlbum), err => {
                    if (err) {
                        console.log('[createModelAlbum]', `Create failed: ${err.message}`);
                        reject(err);
                    }
                });
            }
            stmt.finalize();
            db.run(`COMMIT`, (err) => {
                if (err) {
                    console.log('[createModelAlbum]', `Create failed: ${err.message}`);
                    reject(err);
                }
                console.log('[createModelAlbum]', `Create successfully: ${modelAlbums.length} model-album(s).`)
                resolve(true);
            });
        });
    })
}

module.exports = {
    getAll,
    createModelAlbum,
    searchModelsByAlbumId,
    searchAlbumByModelName
}