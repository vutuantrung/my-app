const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
	const { name, dob, measurement, height, country, metadata } = req.body;
	db.run(
		`INSERT INTO model_profile (name, dob, measurement, height, country, metadata) VALUES (?, ?, ?, ?, ?, ?)`,
		[name, dob, measurement, height, country, metadata],
		function (err) {
			if (err) return res.status(500).json({ error: err.message });
			res.status(201).json({ id: this.lastID });
		}
	);
});

// READ ALL
router.get('/', (req, res) => {
	const { name } = req.query;

	let query = `SELECT * FROM model_profile`;
	let params = [];

	if (name) {
		const names = name.split(',').map(n => n.trim()).filter(Boolean);
		if (names.length > 0) {
			const placeholders = names.map(() => `name LIKE ?`).join(' OR ');
			query += ` WHERE ${placeholders}`;
			params = names.map(n => `%${n}%`);
		}
	}

	db.all(query, params, (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(rows);
	});
});


// READ ONE
router.get('/:id', (req, res) => {
	db.get(`SELECT * FROM model_profile WHERE id = ?`, [req.params.id], (err, row) => {
		if (err) return res.status(500).json({ error: err.message });
		if (!row) return res.status(404).json({ error: 'Not found' });
		res.json(row);
	});
});

// UPDATE
router.put('/:id', (req, res) => {
	const { name, dob, measurement, height, country, metadata } = req.body;
	db.run(
		`UPDATE model_profile SET name = ?, dob = ?, measurement = ?, height = ?, country = ?, metadata = ? WHERE id = ?`,
		[name, dob, measurement, height, country, metadata, req.params.id],
		function (err) {
			if (err) return res.status(500).json({ error: err.message });
			if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
			res.json({ message: 'Updated' });
		}
	);
});

// DELETE
router.delete('/:id', (req, res) => {
	db.run(`DELETE FROM model_profile WHERE id = ?`, [req.params.id], function (err) {
		if (err) return res.status(500).json({ error: err.message });
		if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
		res.json({ message: 'Deleted' });
	});
});

module.exports = router;
