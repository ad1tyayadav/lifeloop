const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const REPORTS_DIR = process.env.REPORTS_DIR || './reports';

function zipFiles(outputPath, files = []) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => resolve({ path: outputPath, size: archive.pointer() }));
    archive.on('error', (err) => reject(err));
    archive.pipe(output);
    files.forEach(f => {
      if (fs.existsSync(f.path)) archive.file(f.path, { name: f.name || path.basename(f.path) });
    });
    archive.finalize();
  });
}

module.exports = { zipFiles };
