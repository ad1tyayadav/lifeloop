const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.SQLITE_FILE || path.join(dataDir, 'lifeloop.db');
const db = new Database(dbPath);
const initSql = fs.readFileSync(path.join(root, 'migrations', 'init.sql'), 'utf8');

try {
  db.exec(initSql);
  console.log('Migration applied successfully to', dbPath);
} catch (err) {
  console.error('Migration failed:', err.message);
  process.exit(1);
}
