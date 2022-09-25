CREATE PROCEDURE usp_UpdateUser (IN user_id int, IN firstname varchar(50), IN surname varchar(50), IN phone varchar(15), IN email varchar(50), IN username varchar(30), IN pword varchar(255))
BEGIN
UPDATE users u
SET user_firstname = firstname,
user_surname = surname,
user_phone = phone,
user_email = email,
user_username = username,
user_password = pword
WHERE u.user_id = user_id;
END
