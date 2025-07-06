const express = require('express');
const db = require('../db');
const router = express.Router();

// CREATE
router.post('/', (req, res) => {
    const { code, title, studio, actress, metadata } = req.body;
    db.run(
        `INSERT INTO movie (code, title, studio, actress, metadata) VALUES (?, ?, ?, ?, ?)`,
        [code, title, studio, actress, metadata],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
});

// READ ALL
router.get('/', (req, res) => {
    db.all(`SELECT * FROM movie`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// READ ONE
router.get('/:id', (req, res) => {
    db.get(`SELECT * FROM movie WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Not found' });
        res.json(row);
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { code, title, studio, actress, metadata } = req.body;
    db.run(
        `UPDATE movie SET code=?, title=?, studio=?, actress=?, metadata=? WHERE id=?`,
        [code, title, studio, actress, metadata, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
            res.json({ message: 'Updated' });
        }
    );
});

// DELETE
router.delete('/:id', (req, res) => {
    db.run(`DELETE FROM movie WHERE id=?`, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    });
});

module.exports = router;
