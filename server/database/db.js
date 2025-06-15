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

    db.run(`
    CREATE TABLE IF NOT EXISTS movie_serie (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rawName TEXT NOT NULL
    )`);

    // Tags
    db.run(`
    CREATE TABLE IF NOT EXISTS movie_tag (
      name TEXT NOT NULL,
      rawName TEXT NOT NULL
    )`);
    db.run(`
    CREATE TABLE IF NOT EXISTS model_tag (
      name TEXT NOT NULL,
      rawName TEXT NOT NULL
    )`);
});

module.exports = db;