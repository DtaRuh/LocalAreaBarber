// import and create an instance of the express package for node
const express = require('express');
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

// Start the server
app.listen(port, () => { 
	console.log(`Server running on http://localhost:${port}`);
});
