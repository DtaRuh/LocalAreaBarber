// create my database
// Using better-sqlite3 because it is a synchronus db - no async functions
const Database = require('better-sqlite3');
const db = new Database('./barbers.db');
const path = require('path');

const query = `
	CREATE TABLE users ( 
		id INTEGER PRIMARY KEY,
		name STRING NOT NULL, 
		username STRING NOT NULL UNIQUE
	)
`;

db.exec(query);
module.exports = db;
