const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const modelProfileRoutes = require('./routes/modelProfile');
app.use('/api/model_profiles', modelProfileRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
