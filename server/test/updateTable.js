const fs = require("fs");

const allCodes = [];
(() => {
	const files = fs.readdirSync("database/movie-thumbs");
	console.log(files.length);
	const REG = /(?<code>.*)-thumbs-cover\.jpg/;

	for (const file of files) {
		if (!REG.test(file)) continue;

		const regSegs = REG.exec(file);
		const code = regSegs.groups["code"];
		if (code.length === "ba5db2a7d0fb56ea476c7d29537b33cb".length) continue;
		allCodes.push(code);
	}
})()

const sqlite3 = require('sqlite3').verbose();

/**
 * Fetch metadata for movies whose code is in the provided list (case-insensitive).
 * 
 * @param {string} dbPath - Path to the SQLite database file.
 * @param {string[]} codeList - Array of code values to query.
 * @returns {Promise<Object[]>} Array of movie records with { code, metadata }
 */
function fetchMovieMetadata(dbPath, codeList) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(codeList) || codeList.length === 0) {
			return resolve([]); // No codes, return empty result
		}

		const db = new sqlite3.Database(dbPath, (err) => {
			if (err) return reject(err);
		});

		// Generate placeholders (?, ?, ?, ...)
		const placeholders = codeList.map(() => '?').join(',');

		// Using COLLATE NOCASE for case-insensitive matching
		const query = `SELECT code, metadata FROM movie WHERE code COLLATE NOCASE IN (${placeholders});`;
		db.all(query, codeList, (err, rows) => {
			db.close();

			if (err) return reject(err);
			resolve(rows);
		});
	});
}

// Example usage
(async () => {
	const dbPath = './database/my-db';
	const codes = allCodes; // mixed case input

	try {
		const results = await fetchMovieMetadata(dbPath, codes);
		const data = results.map(e => {
			let contentId = "--------";
			if (e.metadata) {
				const metaData = JSON.parse(e.metadata);
				contentId = metaData.content_id;
			}
			return contentId + "<>" + e.code;
		})
	} catch (error) {
		console.error('Error fetching metadata:', error);
	}
})();


// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./database/my-db', (err) => {
//     if (err) {
//         console.error('Failed to connect to database:', err.message);
//         process.exit(1);
//     }
//     console.log('Connected to SQLite database.');
// });

// db.serialize(() => {
//     // 1) Read first
//     db.all('SELECT movie_code FROM idol_movie', (err, rows) => {
//         if (err) {
//             console.error('Error fetching rows:', err.message);
//             // Close and bail
//             return db.close(() => { });
//         }

//         console.log(`Found ${rows.length} records. Starting updates...`);

//         // 2) Begin a transaction
//         db.run('BEGIN TRANSACTION', (err) => {
//             if (err) {
//                 console.error('Could not begin transaction:', err.message);
//                 return db.close(() => { });
//             }

//             // 3) Prepared statement with placeholders
//             const stmt = db.prepare(`DELETE FROM movie WHERE code = ?`);

//             let updated = 0;
//             let skipped = 0;

//             const skippedCodeString = fs.readFileSync("test/skippedCode.txt", "utf-8");
//             const skippedCodes = skippedCodeString.replaceAll("\r", "").split("\n");

//             for (const item of rows) {
//                 const code = item.movie_code;
//                 const hasUpperCase = /[A-Z]/.test(code);
//                 if (hasUpperCase) {
//                     console.log(code, hasUpperCase ? "upper case" : "lower case");
//                 }
//                 // const metadata = item.metadata;
//                 // stmt.run([code], (err) => {
//                 //     if (err) {
//                 //         console.error(`DELETE failed for code ${code}:`, err.message);
//                 //         console.log(code, metadata);
//                 //         skipped++;
//                 //     } else {
//                 //         updated++;
//                 //     }
//                 // });
//             }

//             // JUFE-591, FSFST-002

//             // for (const row of rows) {
//             //     const code = String(row.code || '');
//             //     const thumbsShort = String(row.thumbs_short || '');

//             //     // Guard conditions
//             //     if (!code || !code.length === "03f09d15acd5abc81aaad1dd357a9a02".length) { skipped++; console.log('[code]', code, thumbsShort); continue; }
//             //     if (!thumbsShort) { skipped++; console.log('[thumbsShort]', code, thumbsShort); continue; }
//             //     if (thumbsShort.includes("https://pics.dmm.co.jp")) { skipped++; continue; }

//             //     // Derive contentId safely
//             //     // Example thumbsShort: https://.../abc12345xx.jpg  -> strip ext, remove last 2 chars
//             //     const lastSeg = thumbsShort.split('/').pop() || '';
//             //     const base = lastSeg.replace(/\.(webp|jpg|png)$/i, '');
//             //     if (base.length < 3) { skipped++; console.log('[baseLength]', code, thumbsShort); continue; }
//             //     const contentId = base.slice(0, -2);

//             //     const newThumbs = `https://pics.dmm.co.jp/digital/video/${contentId}/${contentId}pl.jpg`;
//             //     const newThumbsShort = `https://pics.dmm.co.jp/digital/video/${contentId}/${contentId}ps.jpg`;

//             //     stmt.run([newThumbs, newThumbsShort, code], (err) => {
//             //         if (err) {
//             //             console.error(`Update failed for code ${code}:`, err.message);
//             //         } else {
//             //             updated++;
//             //         }
//             //     });
//             // }

//             // 4) Finalize statement, then commit, then close
//             stmt.finalize((stmtErr) => {
//                 if (stmtErr) {
//                     console.error('Finalize error:', stmtErr.message);
//                     // Roll back on finalize error
//                     return db.run('ROLLBACK', () => db.close(() => { }));
//                 }

//                 db.run('COMMIT', (commitErr) => {
//                     if (commitErr) {
//                         console.error('Commit error, rolling back:', commitErr.message);
//                         return db.run('ROLLBACK', () => db.close(() => { }));
//                     }

//                     console.log(`Updates complete. Updated: ${updated}, Skipped: ${skipped}`);
//                     db.close((closeErr) => {
//                         if (closeErr) console.error('Error closing database:', closeErr.message);
//                         else console.log('Database connection closed.');
//                     });
//                 });
//             });
//         });
//     });
// });