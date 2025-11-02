const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/my-db');

// WAL + sane durability
db.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;');

// Make SQLite wait for a short time instead of failing immediately
db.configure('busyTimeout', 5000); // 5s

db.serialize(() => {
    javActressSerialize();
    cosplayerSerialize();
});

function javActressSerialize() {
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
        contentId TEXT NOT NULL,
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
        ON movie (code, contentId);
	`);

    // relation: idol - movie
    db.run(`
    CREATE TABLE IF NOT EXISTS idol_movie (
      idol_name TEXT NOT NULL,
      movie_code TEXT NOT NULL,
      movie_contentId TEXT
    )`);

    db.run(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_idolmovie
		ON idol_movie (idol_name, movie_code, movie_contentId);
	`);
}
function cosplayerSerialize() {
    db.run(`
    CREATE TABLE IF NOT EXISTS model_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        dob TEXT,
        measurements TEXT,
        height INTEGER,
        country TEXT,
        cup TEXT,
        albums_count INTEGER DEFAULT 0,
        favorite TEXT,
        my_favorite INTEGER DEFAULT 0,
        created_time INTEGER DEFAULT 0,
        updated_time INTEGER DEFAULT 0,
        metadata TEXT
    )`);

    db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_model
		ON model_profile (name);
	`);

    db.run(`
    CREATE TABLE IF NOT EXISTS album (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT DEFAULT '',
        release_date TEXT DEFAULT '',
        my_favorite INTEGER DEFAULT 0,
        images TEXT,
        thumbs_short TEXT,
        thumbs TEXT,
        created_time INTEGER DEFAULT 0,
        updated_time INTEGER DEFAULT 0,
        metadata TEXT
    )`);

    db.run(`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_album
		ON album (id);
	`);

    // relation: model - album
    db.run(`
    CREATE TABLE IF NOT EXISTS model_album (
        model_name TEXT NOT NULL,
        album_id TEXT NOT NULL
    )`);

    db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_modelalbum
		ON model_album (model_name, album_id);
	`);
}

module.exports = db;