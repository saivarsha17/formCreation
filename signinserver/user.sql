CREATE TABLE user (
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    mobilenumber VARCHAR(255),
    code VARCHAR(255),
    password VARCHAR(255),
    isVerified boolean DEFAULT 0,
    verificationcode VARCHAR(255),
    verificationdate DATETIME

    
   
);
