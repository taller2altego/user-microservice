CREATE TABLE "Users"(
    id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone_number INTEGER NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50),
    number_of_scores INT NOT NULL,
    total_score INT NOT NULL,
    is_blocked BOOLEAN NOT NULL,
    created_at date NOT NULL
);

CREATE TABLE "Drivers"(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    license VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    number_of_scores INT NOT NULL,
    total_score INT NOT NULL,
    balance FLOAT NOT NULL
);

CREATE TABLE "Reports"(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    driver_id INT NOT NULL,
    description VARCHAR(500) NOT NULL
);

CREATE TABLE "Roles"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL
);

-- INSERT INTO Public."Roles"("id", "name", "description") VALUES (1, "superadmin", "superadmin")
-- INSERT INTO Public."Roles"("id", "name", "description") VALUES (2, 'admin', 'admin')
-- INSERT INTO Public."Roles"("id", "name", "description") VALUES (3, 'user', 'user')
-- INSERT INTO Public."Roles"("id", "name", "description") VALUES (4, 'driver', 'driver')

-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "created_at") VALUES ('superadmin', 'superadmin', 123, 'superadmin@fiuber.com', '1234', 1, 0, 0, false, '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "created_at") VALUES ('admin', 'admin', 123, 'admin@fiuber.com', '1234', 2, 0, 0, false, '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "created_at") VALUES ('user', 'user', 123, 'user@fiuber.com', '1234', 3, 0, 0, false, '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "created_at") VALUES ('user', 'blocked', 123, 'blockeduser@fiuber.com', '1234', 3, 0, 0, true, '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "created_at") VALUES ('driver', 'driver', 123, 'driver@fiuber.com', '1234', 4, 0, 0, false, '2020-10-10')