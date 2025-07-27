const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { createIdols } = require('../services/idol.service.database');

// Clean DBs (optional)
['./database/migrate/my-db-source', './database/migrate/my-db-target'].forEach(file => fs.existsSync(file) && fs.unlinkSync(file));

const sourceDB = new sqlite3.Database('./database/migrate/my-db-source');
const targetDB = new sqlite3.Database('./database/migrate/my-db-target');

const TABLE = 'idol_profile';
const COLUMNS = ["name", "dob", "measurements", "height", "country", "cup", "movies_count", "note", "favorite", "jp", "my_favorite", "created_time", "updated_time", "metadata"];

// Create Table
function createSchema(db) {
    db.serialize(() => {
        db.run(`
    CREATE TABLE IF NOT EXISTS idol_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      dob TEXT,
      measurements TEXT,
      height INTEGER,
      country TEXT,
      cup TEXT,
      movies_count INTEGER DEFAULT 0,
	  note TEXT,
	  favorite TEXT,
	  jp TEXT,
	  my_favorite INTEGER DEFAULT 0,
      created_time INTEGER DEFAULT 0,
      updated_time INTEGER DEFAULT 0,
      metadata TEXT
    )`);

        db.run(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_model
		ON idol_profile (name);
	`);

        db.run(`
    CREATE TABLE IF NOT EXISTS movie (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL,
      title TEXT,
      studio TEXT,
	  release_date TEXT,
	  runtime INTEGER,
	  note TEXT,
	  favorite TEXT,
	  my_favorite INTEGER DEFAULT 0,
      images TEXT,
	  thumbs_short TEXT,
	  thumbs TEXT,
      created_time INTEGER DEFAULT 0,
      updated_time INTEGER DEFAULT 0,
      metadata TEXT
    )`);

        db.run(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_movie
		ON movie (code);
	`);

        // relation: idol - movie
        db.run(`
    CREATE TABLE IF NOT EXISTS idol_movie (
      idol_name TEXT NOT NULL,
      movie_code TEXT NOT NULL
    )`);

        db.run(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_idolmovie
		ON idol_movie (idol_name, movie_code);
	`);
    });
}

// Generate fake idol
function generateIdol(index) {
    return {
        name: `Idol_${index}`,
        dob: `199${index % 10}-0${(index % 12) + 1}-15`,
        measurements: `${80 + index % 5}-${60 + index % 3}-${85 + index % 4}`,
        height: `${150 + index % 10}`,
        country: index % 2 === 0 ? 'Japan' : 'Korea',
        cup: ['A', 'B', 'C', 'D'][index % 4],
        movies_count: `${index}`,
        note: `Note ${index}`,
        favorite: `Fav ${index % 3}`,
        jp: `JP_${index}`,
        my_favorite: `${index % 2}`,
        created_time: Date.now(),
        updated_time: Date.now(),
        metadata: JSON.stringify({ tags: [`tag${index % 5}`] })
    };
}

// Insert idols
function insertIdols(db, startIndex, count) {
    const placeholders = `(${COLUMNS.map(() => '?').join(', ')})`;
    const sql = `INSERT OR IGNORE INTO ${TABLE} (${COLUMNS.join(', ')}) VALUES ${placeholders}`;

    db.serialize(() => {
        const stmt = db.prepare(sql);
        for (let i = startIndex; i < startIndex + count; i++) {
            const idol = generateIdol(i);
            const values = COLUMNS.map(col => idol[col]);
            stmt.run(values);
        }
        stmt.finalize();
    });
}

function updateidol(db, name) {
    db.run(`UPDATE idol_profile SET measurements = ?, metadata = ? WHERE name = ?`,
        ["measurements changed" + name, "metadata " + name, name],
        function (err) {
            console.log(err)
        }
    );
}

// Run full script
function seed() {
    createSchema(sourceDB);
    createSchema(targetDB);

    insertIdols(sourceDB, 1, 30);  // Idol_1 → Idol_30
    insertIdols(targetDB, 1, 15);  // Idol_1 → Idol_15

    for (const idolName of ["Idol_1", "Idol_5", "Idol_8"]) {
        updateidol(sourceDB, idolName)
    }

    console.log('✅ Seed complete: 30 idols in source.db, 15 in target.db');
}

seed();
