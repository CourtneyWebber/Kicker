CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetUserId`(IN user_username varchar(30), IN user_password varchar(255))
BEGIN
SELECT user_id
FROM users u
WHERE u.user_password = user_password
AND u.user_username = user_username;
END