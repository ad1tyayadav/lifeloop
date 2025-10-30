const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_for_prod';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

async function signup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  const existing = db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (existing) return res.status(400).json({ error: 'Email already registered' });

  const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  const info = db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
  const user = db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [info.lastInsertRowid]);
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ user, token });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const user = db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
}

module.exports = { signup, login };
