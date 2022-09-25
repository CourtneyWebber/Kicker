CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetSessionDetails`(IN goal_id int)
BEGIN
SELECT session_date, session_rating, session_comment
FROM sessions s
WHERE s.goal_id = goal_id;
END