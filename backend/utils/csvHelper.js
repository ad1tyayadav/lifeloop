const { parse } = require('csv-parse/sync');

function parseCsvBuffer(buffer) {
  const text = buffer.toString('utf8');
  const records = parse(text, { columns: true, skip_empty_lines: true });
  return records;
}

function summarize(records) {
  const rows = records.length;
  const keys = rows ? Object.keys(records[0]) : [];
  return { rows, columns: keys.length, sample: records.slice(0, 3) };
}

module.exports = { parseCsvBuffer, summarize };
