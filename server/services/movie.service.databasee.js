
const db = require("../database/db")

// GET all or search by codes (comma-separated)
async function searchMovieByCode(code = '') {
    if (!code) {
        return;
    }

    const terms = code ? code.split(',').map(n => n.trim()).filter(Boolean) : [];
    let query = 'SELECT * FROM movie';
    let params = [];

    if (terms.length > 0) {
        const orClause = terms.map(() => 'code LIKE ?').join(' OR ');
        query += ` WHERE ${orClause}`;
        params = terms.map(term => `%${term}%`);
    }

    return db.all(query, params, (err, rows) => {
        if (err) {
            console.log(err.message);
            return null;
        }
        return rows;
    });
}

// GET single by ID
async function searchMovieById(id) {
    throw new Error("Not implementation exception")
}

// CREATE
async function createMovie(data) {
    const { code, title, studio, actreses, metadata } = data;
    db.run(`
        INSERT INTO model_profile (code, title, studio, actreses, metadata)
        VALUES                    (?   , ?    , ?     , ?       , ?       )`,
        [code, title, studio, actreses, metadata],
        function (err) {
            if (err) {
                console.log(err.message);
                return false;
            }
            return true;
        }
    );
}

// UPDATE
async function updateMovie(id, model) {
    throw new Error("Not implementation exception")
}

// DELETE
async function deleteMovie(id) {
    throw new Error("Not implementation exception")
}

module.exports = { searchMovieByCode, createMovie }