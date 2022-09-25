CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_InsertUser`(
IN user_type varchar(1),
IN user_firstname varchar(50),
IN user_surname varchar(50),
IN user_phone varchar(15),
IN user_email varchar(50),
IN user_username varchar(30),
IN user_password varchar(255),
IN user_isactive bit
)
BEGIN
INSERT INTO users
VALUES (
user_type,
user_firstname,
user_surname,
user_phone,
user_email,
user_username,
user_password,
user_isactive
);
END