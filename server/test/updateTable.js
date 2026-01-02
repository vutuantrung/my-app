import fs from "fs";

// const allCodes = [];
// (() => {
// 	const files = fs.readdirSync("database/movie-thumbs");
// 	console.log(files.length);
// 	const REG = /(?<code>.*)-thumbs-cover\.jpg/;

// 	for (const file of files) {
// 		if (!REG.test(file)) continue;

// 		const regSegs = REG.exec(file);
// 		const code = regSegs.groups["code"];
// 		if (code.length === "ba5db2a7d0fb56ea476c7d29537b33cb".length) continue;
// 		allCodes.push(code);
// 	}
// })()

// const sqlite3 = require('sqlite3').verbose();

// /**
//  * Fetch metadata for movies whose code is in the provided list (case-insensitive).
//  * 
//  * @param {string} dbPath - Path to the SQLite database file.
//  * @param {string[]} codeList - Array of code values to query.
//  * @returns {Promise<Object[]>} Array of movie records with { code, metadata }
//  */
// function fetchMovieMetadata(dbPath, codeList) {
// 	return new Promise((resolve, reject) => {
// 		if (!Array.isArray(codeList) || codeList.length === 0) {
// 			return resolve([]); // No codes, return empty result
// 		}

// 		const db = new sqlite3.Database(dbPath, (err) => {
// 			if (err) return reject(err);
// 		});

// 		// Generate placeholders (?, ?, ?, ...)
// 		const placeholders = codeList.map(() => '?').join(',');

// 		// Using COLLATE NOCASE for case-insensitive matching
// 		const query = `SELECT code, metadata FROM movie WHERE code COLLATE NOCASE IN (${placeholders});`;
// 		db.all(query, codeList, (err, rows) => {
// 			db.close();

// 			if (err) return reject(err);
// 			resolve(rows);
// 		});
// 	});
// }

// Example usage
// (async () => {
// 	const dbPath = './database/my-db';
// 	const codes = allCodes; // mixed case input

// 	try {
// 		const results = await fetchMovieMetadata(dbPath, codes);
// 		const data = results.map(e => {
// 			let contentId = "--------";
// 			if (e.metadata) {
// 				const metaData = JSON.parse(e.metadata);
// 				contentId = metaData.content_id;
// 			}
// 			return contentId + "<>" + e.code;
// 		})
// 	} catch (error) {
// 		console.error('Error fetching metadata:', error);
// 	}
// })();


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
const updateMovies = async () => {
	const allFiles = fs.readdirSync("database/cached_json");
	console.log(allFiles.length);
	const saved = [];
	for (const file of allFiles) {
		try {
			const filePath = "database/cached_json/" + file;
			if (!fs.existsSync(filePath)) {
				continue;
			}
			let dataString = fs.readFileSync(filePath, "utf-8");

			const data = JSON.parse(dataString);
			const contentId = data.content_id;
			const releaseDate = data.release_date;
			const dvdId = data.dvd_id;

			if (contentId && releaseDate) {
				const codeName = "_" + `${contentId}-${(new Date(releaseDate)).getTime()}`
				if (!saved.includes(codeName)) {
					console.log('[codeName]', codeName);
					saved.push(codeName);
				} else {
					console.log(contentId + " saved already");
					continue;
				}

				const reqResutl = await fetch('http://localhost:3123/api/identify/search', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"identify": codeName,
						"updateRecord": true,
						"reuseSavedFile": true,
						"displayType": "json",
						"code2": dvdId.toLowerCase()
					})
				});
				const resJson = await reqResutl.json();
				if (resJson.code) {
					const filePath = "database/cached_json/" + file.replace("_javher.json", ".json").replace("_undefined.json", ".json");
					const filePath_javher = "database/cached_json/" + file.replace("_undefined.json", "_javher.json");
					const filePath_undefined = "database/cached_json/" + file.replace("_javher.json", "_undefined.json");
					console.log(file, filePath_javher)

					if (fs.existsSync(filePath_javher)) {
						fs.unlinkSync(filePath_javher);
						console.log("filePath_javher deleted!")
					} else { console.log("no filepath found") }

					if (fs.existsSync(filePath)) {
						fs.unlinkSync(filePath);
						console.log("filepath deleted!")
					} else { console.log("no filepath javher found") }

					if (fs.existsSync(filePath_undefined)) {
						fs.unlinkSync(filePath_undefined);
						console.log("filePath_undefined deleted!")
					} else { console.log("no filepath undefined found") }
				}
			}
		} catch (err) {
			console.log(file, "json parse error");
		}
	}
};
updateMovies();
const updateIdols = async () => {
	const allFiles = fs.readdirSync("database/cached_json");
	console.log(allFiles.length);
	const fileCheck = (file) => {
		const isSatisfied = !/\d/.test(file);
		const namePart = file.replace(".json", "");

		// const isSatisfied = file.includes("_movie_");
		// const namePart = file.split("_movie_")[0];

		return { isSatisfied, namePart };
	}
	const saved = [];
	for (const file of allFiles) {
		const { isSatisfied, namePart } = fileCheck(file);
		if (saved.includes(namePart)) {
			continue;
		} else {
			saved.push(namePart);
		}

		if (isSatisfied) {
			// console.log(file);
			const javdbName = namePart;

			// const specificName = "";
			// if (specificName && javdbName !== specificName) {
			// 	continue;
			// }

			const filePath = "database/cached_json/" + file;

			const filePath0 = "database/cached_json/data__" + javdbName + ".json";
			if (!fs.existsSync(filePath0)) {
				// continue;
			}

			const filePath1 = "database/cached_json/data_" + javdbName + ".json";
			if (!fs.existsSync(filePath1)) {
				// continue;
			}

			const filePath2 = "database/cached_json/" + javdbName + ".json";
			if (!fs.existsSync(filePath2)) {
				// console.log("not found 2:", filePath2);
				// continue;
			}

			if (!fs.existsSync("database/cached_json/" + javdbName + "_movie_0.json")) {
				// console.log("not found 3:", filePath3);
				// continue;
			}

			// if (/\d/.test(javdbName)) {
			// 	continue;
			// }

			const allMovieFiles = allFiles.filter(e => e.startsWith(javdbName + "_movie_"));
			console.log(javdbName)
			// console.log(allMovieFiles.length)
			// console.log("ok", javdbName);
			// continue;

			// const jsonDataString = fs.readFileSync("database/cached_json/" + javdbName + ".json", "utf-8");
			// const jsonData = JSON.parse(jsonDataString);
			// console.log(jsonData)
			const metadata = { javdbQueryName: javdbName };

			const javDbQueryName = metadata?.javdbQueryName ?? javdbName;
			const javHerQueryName = metadata.javherQueryName;
			const javJJgirlQueryName = metadata.jjGirlQueryName;

			// console.log('[javDbQueryName]', javDbQueryName, '[javHerQueryName]', javHerQueryName, '[javJJgirlQueryName]', javJJgirlQueryName);
			let queryName = javDbQueryName ? "_" + javDbQueryName : "";
			if (javHerQueryName) queryName += `,${javHerQueryName}`;
			if (javHerQueryName && javJJgirlQueryName) queryName += `,_${javJJgirlQueryName}`;
			if (!javHerQueryName && javJJgirlQueryName) queryName += `,,_${javJJgirlQueryName}`;
			console.log("ok", queryName)

			if (!queryName) {
				continue;
			}
			// continue;

			const reqResutl = await fetch('http://localhost:3123/api/idol/search', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					"name": queryName,
					"updateRecord": true,
					"reuseSavedFile": false,
					"displayType": "json",
				})
			});
			const resJson = await reqResutl.json();
			if (resJson.name) {

				console.log(javdbName + " ok")
				if (fs.existsSync(filePath1)) {
					fs.unlinkSync(filePath1);
					console.log(filePath1 + " deleted!")
				} else { console.log("no filePath1 found") }

				if (fs.existsSync(filePath2)) {
					fs.unlinkSync(filePath2);
					console.log("filePath2 deleted!")
				} else { console.log("no filepath2 found") }

				for (const f of allMovieFiles) {
					const filePathMovie = "database/cached_json/" + f;
					if (fs.existsSync(filePathMovie)) {
						fs.unlinkSync(filePathMovie);
						console.log("filePathMovie deleted!", f)
					} else {
						console.log("no filepathMovie found", f)
					}
				}
			}
		}
	}
}