const sqlite3 = require('sqlite3').verbose();

const sourceDB = new sqlite3.Database('./database/migrate/my-db-source');
const targetDB = new sqlite3.Database('./database/migrate/my-db-target');

// const TABLE = 'idol_profile';
// const KEY = 'name'; // or 'code' for movie, or composite key for relation tables

// function transferTableRecords() {
//     sourceDB.all(`SELECT * FROM ${TABLE}`, [], (err, rows) => {
//         if (err) return console.error(`[SOURCE] Failed to fetch: ${err.message}`);
//         if (!rows.length) return console.log('No records to migrate.');
//         for (const row of rows) {
//             upsertIdolProfile(row);
//         }
//     });
// }

// function cleanup() {
//     sourceDB.close();
//     targetDB.close();
// }

// function upsertIdolProfile(row) {
//     const keys = Object.keys(row);
//     const values = keys.map(k => row[k]);

//     const updateSQL = `UPDATE idol_profile SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE name = ?`;
//     const insertSQL = `INSERT INTO idol_profile (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;

//     targetDB.get(`SELECT * FROM idol_profile WHERE name = ?`, [row.name], (err, existing) => {
//         if (err) return console.error(`Query failed: ${err.message}`);
//         if (existing) {
//             // Optionally: compare row vs existing and skip if identical
//             targetDB.run(updateSQL, [...values, row.name], err => {
//                 if (err) console.error(`Update failed: ${err.message}`);
//             });
//         } else {
//             targetDB.run(insertSQL, values, err => {
//                 if (err) console.error(`Insert failed: ${err.message}`);
//             });
//         }
//     });
// }


// const sqlite3 = require('sqlite3').verbose();
// const sourceDB = new sqlite3.Database('./source.db');
// const targetDB = new sqlite3.Database('./target.db');

function migrateTable(tableName, keyField) {
    sourceDB.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
        if (err) return console.error(`Error reading ${tableName} from source:`, err.message);

        for (const row of rows) {
            const keyValue = row[keyField];
            const { updated_time } = row;

            targetDB.get(`SELECT updated_time FROM ${tableName} WHERE ${keyField} = ?`, [keyValue], (err, targetRow) => {
                if (err) return console.error(`Error checking ${tableName} in target:`, err.message);

                const rowTime = new Date(updated_time);
                const targetTime = targetRow ? new Date(targetRow.updated_time) : null;

                if (!targetRow || rowTime > targetTime) {
                    const columns = Object.keys(row).filter(k => k !== 'id');
                    const values = columns.map(k => row[k]);

                    const placeholders = columns.map(() => '?').join(', ');
                    const updateSet = columns.map(k => `${k} = ?`).join(', ');

                    if (!targetRow) {
                        const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
                        targetDB.run(sql, values, err => {
                            if (err) console.error(`Insert failed for ${keyValue} in ${tableName}:`, err.message);
                            else console.log(`✅ Inserted ${keyValue} in ${tableName}`);
                        });
                    } else {
                        const sql = `UPDATE ${tableName} SET ${updateSet} WHERE ${keyField} = ?`;
                        targetDB.run(sql, [...values, keyValue], err => {
                            if (err) console.error(`Update failed for ${keyValue} in ${tableName}:`, err.message);
                            else console.log(`🔄 Updated ${keyValue} in ${tableName}`);
                        });
                    }
                }
            });
        }
    });
}

function migrateAll() {
    migrateTable('idol_profile', 'name');
    migrateTable('movie', 'code');
}

migrateAll();



// // Start migration
// transferTableRecords();