// import and create an instance of the express package for node
const express = require('express');
const db = require('./database/db'); // runs db.js
const app = express();  
const port = process.env.PORT || 8080;
const path = require('path');


// Middleware to parse JSON request bodies
app.use(express.json());

// adds req.body properties to the users form inputs
app.use(express.urlencoded({extended: false}));


// Define route for GET requests to the root URL
app.get('/', (req, res) => { 
	res.send('Hello World from Express!');
});

// Set up route to test the database
app.get('/users', (req, res) => { 
	try { 
	const users = db.prepare('SELECT * FROM users').all();
	res.json(users);
	} catch (error) {
	// set HTTP status code to 500 (internal server error)
	res.status(500).json({ error: error.message});
	}
});

// Set up route to create a new user 
app.post('/register', (req, res) => {
	try {
		const { email, password, role, first_name, last_name} = req.body;

		// Hash my passwords before storing in db
		const bcrypt = require('bcrypt');
		const saltRounds = 10;
		const password_hash = bcrypt.hashSync(password, saltRounds);

		// prepare SQL insert statement
		const stmt = db.prepare(`
			INSERT INTO users (email, password_hash, role, first_name, last_name)
			VALUES (?, ?, ?, ?, ?)
		`);

		// Execute the statement

		const result = stmt.run(email, password_hash, role, first_name, last_name);

		// send success response if it works
		// 201 is status code for resource created successfully
		res.status(201).json({
			message: 'User created successfully', 
			userId: result.lastInsertRowid
		});
	} catch (error) { 
	res.status(500).json({ error: error.message });
	}
});

// Start the server
app.listen(port, () => { 
	console.log(`Server running on http://localhost:${port}`);
});
