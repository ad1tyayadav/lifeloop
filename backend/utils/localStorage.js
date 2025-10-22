const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const uploadsDir = path.isAbsolute(UPLOAD_DIR) ? UPLOAD_DIR : path.join(__dirname, '..', UPLOAD_DIR.replace(/^\.\//, ''));
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

function storeBuffer(filename, buffer) {
  const id = crypto.randomBytes(8).toString('hex');
  const safe = `${id}-${filename}`.replace(/[^a-zA-Z0-9-._]/g, '_');
  const filepath = path.join(uploadsDir, safe);
  fs.writeFileSync(filepath, buffer);
  return { id, filename: safe, path: filepath };
}

module.exports = { storeBuffer };
