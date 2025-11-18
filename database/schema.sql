-- Users table (role field differentiates barbers and customers)
CREATE TABLE IF NOT EXISTS users ( 
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	email TEXT UNIQUE NOT NULL, -- for login
	password_hash TEXT UNIQUE NOT NULL, -- going to store the Bcrypt hashed pw
	role TEXT NOT NULL CHECK(role IN ('barber', 'customer')), 
	first_name TEXT NOT NULL, 
	last_name TEXT NOT NULL, 
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP 
);

-- Services offered by barbers
CREATE TABLE IF NOT EXISTS services ( 
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	barber_id INTEGER NOT NULL, -- which barber offers this? 
	name TEXT NOT NULL , -- i.e. "Student Cut"
	duration_minutes INTEGER NOT NULL, 
	price REAL NOT NULL, 
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
	FOREIGN KEY (barber_id) REFERENCES users(id) ON DELETE CASCADE -- if a barber deletes their account, their services disappear too
);

-- bookings made by customers
CREATE TABLE IF NOT EXISTS bookings ( 
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	customer_id INTEGER NOT NULL, 
	service_id INTEGER NOT NULL, 
	booking_datetime DATETIME NOT NULL, 
	status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'cancelled' , 'completed')), 
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
	FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE, 
	FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

