const db = require("../database/db");
const {
    createPropertiesCREATEColumns,
    createPropertiesValues,
    createRecordArrayByPropertyName,
    createPropertiesUPDATEColumns
} = require("../helpers");

const columns = ["id", "title", "type", "release_date", "my_favorite", "images", "thumbs_short", "thumbs", "created_time", "updated_time", "metadata"];

async function createAlbums(albums) {
    if (Array.isArray(albums) && albums.length === 0) return "Empty";

    const sql = `INSERT OR IGNORE INTO album ${createPropertiesCREATEColumns(columns)}
                VALUES ${createPropertiesValues(columns)}`;
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`);
            const stmt = db.prepare(sql);
            for (const movie of albums) {
                stmt.run(createRecordArrayByPropertyName(columns, movie), err => {
                    if (err) {
                        console.log('[createAlbums]', `Create failed: ${err.message}`);
                        reject(err);
                    };
                });
            }
            stmt.finalize();
            db.run(`COMMIT`, (err) => {
                if (err) {
                    console.log('[createAlbums]', `Create failed: ${err.message}`);
                    reject(err)
                }
                console.log('[createAlbums]', `Create successfully: ${albums.length} movie(s).`);
                resolve(true)
            });
        });
    })
}

async function updateAlbumById(id, updateData /* Map */) {
    const { setString, valuesArr } = createPropertiesUPDATEColumns(updateData);
    const sql = `UPDATE album SET ${setString} WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [...valuesArr, id],
            function (err) {
                if (err) {
                    console.log('[updateAlbumById]', `Update failed: ${err.message}`)
                    resolve(null);
                }
                console.log('[updateAlbumById]', `Update successfully: ${code}`)
                resolve(code);
            }
        );
    });
}

async function searchAlbumByIds(albumIds) {
    // Normalize to an ordered, de-duplicated array of codes
    const idsArr = Array.isArray(albumIds)
        ? albumIds
        : String(albumIds || "").split(",")
    const ids = idsArr
        .map(s => String(s).trim())
        .filter(Boolean);

    if (ids.length === 0) return { data: [], notFound: [] };

    const seen = new Set();
    const uniqueIds = ids.filter(c => (seen.has(c) ? false : (seen.add(c), true)));

    // Chunk to respect SQLite's usual 999 bind-parameter limit
    const PARAM_LIMIT = 999;
    const chunks = [];
    for (let i = 0; i < uniqueIds.length; i += PARAM_LIMIT) {
        chunks.push(uniqueIds.slice(i, i + PARAM_LIMIT));
    }

    try {
        const rows = [];
        for (const chunk of chunks) {
            const placeholders = chunk.map(() => "?").join(",");
            const sql = `SELECT * FROM album WHERE id IN (${placeholders})`;
            rows.push(...await dbAll(db, sql, chunk));
        }

        // Map by code for O(1) reconstruction in input order
        const byIds = new Map(rows.map(r => [r.code, r]));
        const data = ids.map(c => byIds.get(c)).filter(Boolean);
        const notFound = uniqueIds.filter(c => !byIds.has(c));

        return { data, notFound };
    } catch (err) {
        console.error("[searchAlbumByIds] Search failed:", err.message);
        return { data: [], notFound: [], err: err.message };
    }
}

module.exports = { createAlbums, updateAlbumById, searchAlbumByIds }