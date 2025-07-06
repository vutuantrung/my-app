
const db = require("../database/db")

// GET all or search by names (comma-separated)
async function searchIdolsByName(name = '') {
    if (!name) {
        return;
    }

    const terms = name ? name.split(',').map(n => n.trim()).filter(Boolean) : [];
    let query = 'SELECT * FROM idol_profile';
    let params = [];

    if (terms.length > 0) {
        const orClause = terms.map(() => 'name LIKE ?').join(' OR ');
        query += ` WHERE ${orClause}`;
        params = terms.map(term => `%${term}%`);
    }

    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                console.log(err.message)
                resolve({ err: err.message });
            }
            // console.log(rows)
            resolve({ data: rows });
        });
    })
}

// GET single by ID
async function searchIdolById(id) {
    throw new Error("Not implementation exception")
}

// CREATE
async function createIdol(data) {
    const { name, dob, measurement, height, country, cup, movies_count, metadata } = data;
    db.run(`
        INSERT INTO model_profile (name, dob, measurement, height, country, cup, movies_count, metadata)
        VALUES                    (?   , ?  , ?          , ?     , ?      , ?  , ?           , ?       )`,
        [name, dob, measurement, height, country, cup, movies_count || 0, metadata],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
}

// UPDATE
async function updateIdol(id, model) {
    throw new Error("Not implementation exception")
}

// DELETE
async function deleteIdol(id) {
    throw new Error("Not implementation exception")
}

module.exports = { searchIdolsByName, createIdol }