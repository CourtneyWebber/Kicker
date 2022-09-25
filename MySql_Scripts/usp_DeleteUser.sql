CREATE PROCEDURE usp_DeleteUser (IN user_id int)
BEGIN
DELETE
FROM users u
WHERE u.user_id = user_id;
END
