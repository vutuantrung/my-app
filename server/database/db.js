const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS model_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      dob TEXT,
      measurement TEXT,
      height INTEGER,
      country TEXT,
      metadata TEXT
    )
  `);
});

module.exports = db;