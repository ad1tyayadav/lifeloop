const db = require('../config/sqlite');

function run(sql, params=[]) { return db.prepare(sql).run(...params); }
function get(sql, params=[]) { return db.prepare(sql).get(...params); }
function all(sql, params=[]) { return db.prepare(sql).all(...params); }

module.exports = { run, get, all };
