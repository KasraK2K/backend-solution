--======================================================================================================
--                                                                                                      
--  #####    ####           ####   #####   ###    ###  ###    ###    ###    ##     ##  ####     ####  
--  ##  ##  ##             ##     ##   ##  ## #  # ##  ## #  # ##   ## ##   ####   ##  ##  ##  ##     
--  #####   ##  ###        ##     ##   ##  ##  ##  ##  ##  ##  ##  ##   ##  ##  ## ##  ##  ##   ###   
--  ##      ##   ##        ##     ##   ##  ##      ##  ##      ##  #######  ##    ###  ##  ##     ##  
--  ##       ####           ####   #####   ##      ##  ##      ##  ##   ##  ##     ##  ####    ####   
--                                                                                                      
--======================================================================================================


CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'TRANSSEXUAL', 'OTHER');

CREATE SEQUENCE user_id_seq;

CREATE TABLE IF NOT EXISTS users
(
    id                SERIAL PRIMARY KEY,
    email             VARCHAR(50)  NOT NULL UNIQUE,
    password          VARCHAR(200) NOT NULL DEFAULT '',
    contact_number    VARCHAR(50)  NOT NULL DEFAULT '',
    first_name        VARCHAR(50)  NOT NULL DEFAULT '',
    surname           VARCHAR(50)  NOT NULL DEFAULT '',
    
    login_type        SMALLINT     NOT NULL DEFAULT 0, -- 0: email, 1: google, 2: apple id
    login_id          VARCHAR(50)  NOT NULL DEFAULT '',

    is_active         BOOLEAN               DEFAULT TRUE,
    is_verified       BOOLEAN               DEFAULT FALSE,
    is_blocked        BOOLEAN               DEFAULT FALSE,
    is_archive        BOOLEAN               DEFAULT FALSE,

    business_name     VARCHAR(100) NOT NULL DEFAULT '',
    business_category VARCHAR(100) NOT NULL DEFAULT '',
    business_size     VARCHAR(100) NOT NULL DEFAULT '',
    permission        INT          NOT NULL DEFAULT 0,
    partner_id       INT          NOT NULL DEFAULT 0,

    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       TIMESTAMP
);

-- Create Indexes
CREATE INDEX "users_is_admin" ON "users"("is_admin");

-- Password is 12345678 and hashed by bcryptjs salt 7
INSERT INTO users
(email, password, contact_number,
 first_name, surname, gender, is_verified)
VALUES ('a@a.com', '$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO', '09123456789',
        'ahmad', 'akbari', 'MALE', TRUE);

SELECT * FROM users;