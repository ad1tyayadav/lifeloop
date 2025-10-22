require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve folders from env or defaults
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const REPORTS_DIR = process.env.REPORTS_DIR || './reports';
const uploadsDir = path.isAbsolute(UPLOAD_DIR) ? UPLOAD_DIR : path.join(__dirname, '..', UPLOAD_DIR.replace(/^\.\//, ''));
const reportsDir = path.isAbsolute(REPORTS_DIR) ? REPORTS_DIR : path.join(__dirname, '..', REPORTS_DIR.replace(/^\.\//, ''));
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.use('/reports', express.static(reportsDir));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => res.send({ ok: true, message: 'LIFELOOP Backend (SQLite)' }));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
 