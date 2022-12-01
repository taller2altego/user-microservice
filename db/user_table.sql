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
    default_address VARCHAR(500),
    created_at date NOT NULL
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

-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "default_address", "created_at") VALUES ('superadmin', 'superadmin', 123, 'superadmin@fiuber.com', '1234', 1, 0, 0, false, 'calle prueba123', '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "default_address", "created_at") VALUES ('admin', 'admin', 123, 'admin@fiuber.com', '1234', 2, 0, 0, false, 'calle prueba123', '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "default_address", "created_at") VALUES ('user', 'user', 123, 'user@fiuber.com', '1234', 3, 0, 0, false, 'calle prueba123', '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "default_address", "created_at") VALUES ('user', 'blocked', 123, 'blockeduser@fiuber.com', '1234', 3, 0, 0, true, 'calle prueba123', '2020-10-10')
-- INSERT INTO Public."Users"("id", "name", "lastname", "phone_number", "email", "password", "role_id", "number_of_scores", "total_score", "is_blocked", "default_address", "created_at") VALUES ('driver', 'driver', 123, 'driver@fiuber.com', '1234', 4, 0, 0, false, 'calle prueba123', '2020-10-10')

-- INSERT INTO Public."Drivers"("id", "user_id", "license", "model", "license_plate", "number_of_scores", "total_score") VALUES (5, 'asd', 'dsa', 'dsa', 0, 0)

-- INSERT INTO Public."Reports"("id", "user_id", "driver_id", "description") VALUES (1, 3, 1, 'descripcion 1')
-- INSERT INTO Public."Reports"("id", "user_id", "driver_id", "description") VALUES (2, 3, 1, 'descripcion 2')
-- INSERT INTO Public."Reports"("id", "user_id", "driver_id", "description") VALUES (3, 3, 1, 'descripcion 3')
-- INSERT INTO Public."Reports"("id", "user_id", "driver_id", "description") VALUES (4, 3, 1, 'descripcion 4')