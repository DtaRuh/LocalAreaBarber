// create my database
// Using better-sqlite3 because it is a synchronus db - no async functions
const Database = require('better-sqlite3');
// import the File System module
const fs = require('fs');
const path = require('path');

// Create the database file
const db = new Database(path.join(__dirname, 'barbers.db'), { 
	// logs every SQL Query executed to the console
	verbose: console.log
});

// Manually enable foreign keys 
// PRAGMA statements let you configure database behavior 
db.pragma('foreign_keys = ON');

// Read and execute the table plan from the schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);

console.log('Database initialised successfully');
module.exports = db;
