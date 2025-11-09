// scripts/cleanup-duplicate-movies.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/my-db');

function getDuplicateMovieRows() {
	return new Promise((resolve, reject) => {
		const sql = `
      SELECT *
      FROM movie
      WHERE code IN (
        SELECT code
        FROM movie
        GROUP BY code
        HAVING COUNT(*) > 1
      )
      ORDER BY code COLLATE NOCASE, id ASC
    `;
		db.all(sql, [], (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
}

function deleteMovieById(id) {
	return new Promise((resolve, reject) => {
		db.run(`DELETE FROM movie WHERE id = ?`, [id], function (err) {
			if (err) return reject(err);
			resolve(this.changes);
		});
	});
}

// (async () => {
// 	try {
// 		const rows = await getDuplicateMovieRows();
// 		if (!rows.length) {
// 			console.log('No duplicate codes found.');
// 			return;
// 		}

// 		// group by code
// 		const grouped = rows.reduce((acc, row) => {
// 			acc[row.code] = acc[row.code] || [];
// 			acc[row.code].push(row);
// 			return acc;
// 		}, {});

// 		let deleteCount = 0;

// 		for (const [code, items] of Object.entries(grouped)) {
// 			// separate rows with and without contentId
// 			const withContent = items.filter(
// 				r => r.contentId !== null && r.contentId !== undefined && r.contentId !== ''
// 			);
// 			const withoutContent = items.filter(
// 				r => r.contentId === null || r.contentId === undefined || r.contentId === ''
// 			);

// 			if (withContent.length > 0) {
// 				// we have at least one "good" row with contentId
// 				// delete all rows for this code that do NOT have contentId
// 				for (const row of withoutContent) {
// 					await deleteMovieById(row.id);
// 					deleteCount++;
// 					console.log(`Deleted movie id=${row.id} (code=${code}) because contentId is empty.`);
// 				}
// 			} else {
// 				// all rows for this code have no contentId
// 				// keep the first one, delete the rest
// 				const [keep, ...toDelete] = items;
// 				for (const row of toDelete) {
// 					await deleteMovieById(row.id);
// 					deleteCount++;
// 					console.log(
// 						`Deleted movie id=${row.id} (code=${code}) because all duplicates had empty contentId; kept id=${keep.id}.`
// 					);
// 				}
// 			}
// 		}

// 		console.log(`Cleanup done. Deleted ${deleteCount} row(s).`);
// 	} catch (err) {
// 		console.error('Error:', err.message);
// 	} finally {
// 		db.close();
// 	}
// })();
