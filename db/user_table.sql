CREATE TABLE "Users"(
    id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone_number INTEGER NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    number_of_scores INT NOT NULL,
    total_score INT NOT NULL
);

CREATE TABLE "Drivers"(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    license VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    number_of_scores INT NOT NULL,
    total_score INT NOT NULL
);

CREATE TABLE "Reports"(
    id SERIAL PRIMARY KEY,
    driverId INT NOT NULL,
    description VARCHAR(500) NOT NULL
);

CREATE TABLE "Roles"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL
);