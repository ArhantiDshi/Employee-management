CREATE TABLE employees (
    id BIGINT NOT NULL AUTO_INCREMENT,
    created_at DATETIME(6),
    department VARCHAR(255),
    designation VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    joining_date DATE,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    salary DECIMAL(38, 2),
    status VARCHAR(255),
    updated_at DATETIME(6),
    PRIMARY KEY (id),
    CONSTRAINT uk_employees_email UNIQUE (email)
);
