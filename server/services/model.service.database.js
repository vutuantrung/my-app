const db = require("../database/db");
const {
    createPropertiesCREATEColumns,
    createPropertiesValues,
    createRecordArrayByPropertyName,
    createPropertiesUPDATEColumns
} = require("../helpers");

const columns = ["name", "dob", "measurements", "height", "country", "cup", "albums_count", "favorite", "my_favorite", "created_time", "updated_time", "metadata"]

async function searchModelByName(name) {
    return new Promise((resolve, reject) => {
        const terms = name ? name.split(',').map(n => n.trim()).filter(Boolean) : [];
        let sqlCommand = 'SELECT * FROM model_profile';
        let params = [];

        if (terms.length > 0) {
            const orClause = terms.map(() => 'name = ?').join(' OR ');
            sqlCommand += ` WHERE ${orClause}`;
            params = terms; // exact values, no wildcards
        }

        db.all(sqlCommand, params, (err, rows) => {
            if (err) {
                console.error('[searchModelByName]', `Search failed: ${err.message}`);
                return reject(err);
            }
            resolve({ data: rows });
        });
    });
}

// CREATE
async function createModels(models) {
    if (Array.isArray(models) && models.length === 0) return "Empty";
    const sqlCommand = `INSERT OR IGNORE INTO model_profile ${createPropertiesCREATEColumns(columns)}
                        VALUES ${createPropertiesValues(columns)}`;
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`);
            const stmt = db.prepare(sqlCommand);
            for (const model of models) {
                stmt.run(createRecordArrayByPropertyName(columns, model), err => {
                    if (err) {
                        console.log('[createModels]', `Create failed: ${err.message}`);
                        reject(err);
                    };
                });
            }
            stmt.finalize();
            db.run(`COMMIT`, (err) => {
                if (err) {
                    console.log('[createModels]', `Create failed: ${err.message}`);
                    reject(err);
                }
                console.log('[createModels]', `Create successfully: ${models.length} model(s).`);
                resolve(true)
            })
        })
    })
}

// UPDATE
async function updateModelByName(name, modelUpdateData) {
    const { setString, valuesArr } = createPropertiesUPDATEColumns(modelUpdateData);
    const sqlCommand = `UPDATE model_profile SET ${setString} WHERE name = ?`
    return new Promise((resolve, reject) => {
        db.run(sqlCommand, [...valuesArr, name], function (err) {
            if (err) {
                console.log('[updateModelByName]', `Update failed: ${err.message}`);
                resolve(false);
            }
            console.log('[updateModelByName]', `Update successfully: ${name}`);
            return resolve(this.changes > 0);       // true only if a row was changed
        });
    });
}

module.exports = { createModels, updateModelByName, searchModelByName }