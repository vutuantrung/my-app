const express = require('express');
const db = require('../db');
const router = express.Router();

// CREATE relation
router.post('/', (req, res) => {
    const { idol_id, idol_name, movie_id, movie_code } = req.body;
    db.run(`INSERT INTO idol_movie (idol_id, idol_name, movie_id, movie_code) VALUES (?, ?, ?, ?)`,
        [idol_id, idol_name, movie_id, movie_code],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Linked' });
        }
    );
});

// GET all links
router.get('/', (req, res) => {
    db.all(`SELECT * FROM idol_movie`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// DELETE a link
router.delete('/', (req, res) => {
    const { idol_id, movie_id } = req.body;
    db.run(`DELETE FROM idol_movie WHERE idol_id=? AND movie_id=?`,
        [idol_id, movie_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Link not found' });
            res.json({ message: 'Unlinked' });
        }
    );
});

module.exports = router;
