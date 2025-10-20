require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/reports', express.static(path.join(__dirname, 'reports')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/simulate', require('./routes/simulateRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));

app.get('/', (req, res) => res.send({ ok: true, message: 'LIFELOOP Backend' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
