const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Clean DBs (optional)
['./database/migrate/my-db-source', './database/migrate/my-db-target'].forEach(file => fs.existsSync(file) && fs.unlinkSync(file));

const sourceDB = new sqlite3.Database('./database/migrate/my-db-source');
const targetDB = new sqlite3.Database('./database/migrate/my-db-target');

const COL_IDOLS = ["name", "dob", "measurements", "height", "country", "cup", "movies_count", "note", "favorite", "jp", "my_favorite", "created_time", "updated_time", "metadata"];
const COL_MOVIES = ["code", "title", "studio", "release_date", "runtime", "note", "favorite", "my_favorite", "thumbs_short", "thumbs", "images", "created_time", "updated_time", "metadata"];
const COL_IDOL_MOVIE = ["idol_name", "movie_code"];

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

// Generate records
function generateIdolMovie(index) {
    return {
        idol_name: "idol_name_" + index,
        movie_code: "movie_code_" + (index + 1)
    }
}

function generateMovies(index) {
    return {
        code: "Movie_code_" + index,
        title: "some title",
        studio: "studio_" + index,
        release_date: `199${index % 10}-0${(index % 12) + 1}-15`,
        runtime: 0,
        note: "note" + index,
        favorite: `Fav ${index % 3} `,
        my_favorite: 0,
        images: "someimages",
        thumbs_short: "thumbshort",
        thumbs: "thumbscover",
        created_time: Date.now(),
        updated_time: Date.now(),
        metadata: JSON.stringify({ tags: [`tag${index % 5} `] })
    };
}

function generateIdols(index) {
    return {
        name: `Idol_${index} `,
        dob: `199${index % 10} -0${(index % 12) + 1} -15`,
        measurements: `${80 + index % 5} -${60 + index % 3} -${85 + index % 4} `,
        height: `${150 + index % 10} `,
        country: index % 2 === 0 ? 'Japan' : 'Korea',
        cup: ['A', 'B', 'C', 'D'][index % 4],
        movies_count: `${index} `,
        note: `Note ${index} `,
        favorite: `Fav ${index % 3} `,
        jp: `JP_${index} `,
        my_favorite: `${index % 2} `,
        created_time: Date.now(),
        updated_time: Date.now(),
        metadata: JSON.stringify({ tags: [`tag${index % 5} `] })
    };
}

// Insert records
function insertRecords(db, table, cols, startIndex, count, type = "idol") {
    const placeholders = `(${cols.map(() => '?').join(', ')})`;
    const sql = `INSERT OR IGNORE INTO ${table} (${cols.join(', ')}) VALUES ${placeholders} `;

    db.serialize(() => {
        const stmt = db.prepare(sql);
        for (let i = startIndex; i < startIndex + count; i++) {
            let record = null;
            if (type === "idol") record = generateIdols(i);
            if (type === "movie") record = generateMovies(i);
            if (type === "idolmovie") record = generateIdolMovie(i);
            const values = cols.map(col => record[col]);
            stmt.run(values);
        }
        stmt.finalize();
    });
}

function updateIdol(db, name) {
    db.run(`UPDATE idol_profile SET measurements = ?, metadata = ? WHERE name = ? `,
        ["measurements changed" + name, "metadata " + name, name],
        function (err) {
            console.log(err)
        }
    );
}

function updateMovie(db, code) {
    db.run(`UPDATE movie SET title = ?, images = ? WHERE code = ? `,
        ["measurements changed" + code, "metadata " + code, code],
        function (err) {
            console.log(err)
        }
    );
}

// Run full script
function seed() {
    createSchema(sourceDB);
    createSchema(targetDB);

    insertRecords(sourceDB, "idol_profile", COL_IDOLS, 1, 30, "idol");  // Idol_1 → Idol_30
    insertRecords(targetDB, "idol_profile", COL_IDOLS, 1, 15, "idol");  // Idol_1 → Idol_15

    for (const idolName of ["Idol_1", "Idol_5", "Idol_8"]) {
        updateIdol(sourceDB, idolName)
    }

    insertRecords(sourceDB, "movie", COL_MOVIES, 1, 11, "movie");  // Movie_code__1 → Movie_code__11
    insertRecords(targetDB, "movie", COL_MOVIES, 1, 14, "movie");  // Movie_code__1 → Movie_code__14

    for (const movieCode of ["Movie_code_1", "Movie_code_5", "Movie_code_8", "Movie_code_12"]) {
        updateMovie(sourceDB, movieCode)
    }

    insertRecords(sourceDB, "idol_movie", COL_IDOL_MOVIE, 1, 11, "idolmovie");
    insertRecords(targetDB, "idol_movie", COL_IDOL_MOVIE, 1, 14, "idolmovie");

    console.log('✅ Seed complete: 30 idols and 11 movies in source.db, 15 and 14 in target.db');
}

seed();
