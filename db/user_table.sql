CREATE TABLE "Users"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone_number INTEGER NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    score JSON NOT NULL
);

CREATE TABLE "Drivers"(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    license VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    score JSON NOT NULL
);