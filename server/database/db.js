const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/my-db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS idol_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      dob TEXT,
      measurement TEXT,
      height INTEGER,
      country TEXT,
      cup TEXT,
      movies_count INTEGER DEFAULT 0,
	  note TEXT,
	  favorite TEXT,
	  jp TEXT,
	  my_favorite INTEGER DEFAULT 0,
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

module.exports = db;