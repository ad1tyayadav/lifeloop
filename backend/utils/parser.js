const csv = require('csv-parse');

exports.parseCsvBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    csv.parse(buffer, { columns: true }, (err, records) => {
      if (err) return reject(err);
      resolve(records);
    });
  });
