CREATE PROCEDURE `usp_GetSessionsAvg`(IN goal_id int, OUT smiley_avg int)
BEGIN
SELECT AVG(session_rating) INTO smiley_avg
FROM sessions s
WHERE s.goal_id = goal_id;
END
