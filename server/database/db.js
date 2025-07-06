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
      metadata TEXT
    )`);

    db.run(`
    CREATE TABLE IF NOT EXISTS movie (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL,
      title TEXT,
      studio TEXT,
      actress TEXT NOT NULL,
      metadata TEXT
    )`);

    // relation: idol - movie
    db.run(`
    CREATE TABLE IF NOT EXISTS idol_movie (
      idol_name TEXT NOT NULL,
      movie_code TEXT NOT NULL
    )`);
});

module.exports = db;