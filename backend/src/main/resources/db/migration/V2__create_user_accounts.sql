CREATE TABLE app_users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(80) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    user_role VARCHAR(24) NOT NULL,
    enabled BIT(1) NOT NULL DEFAULT b'1',
    created_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_app_users_username UNIQUE (username)
);
