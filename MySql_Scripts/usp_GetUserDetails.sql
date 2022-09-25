CREATE PROCEDURE usp_GetUserDetails (IN user_id int)
BEGIN
SELECT *
FROM users u
WHERE u.user_id = user_id;
END
