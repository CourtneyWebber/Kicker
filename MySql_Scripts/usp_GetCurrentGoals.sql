DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetCurrentGoals`(IN student_name varchar(255), IN teacher_id int, IN instrument_name varchar(255))
BEGIN
SELECT DISTINCT goal_id, goal_description, goal_startdate, goal_iscomplete, goal_finishdate, g.teacher_id, g.student_id, g.instrument_id
FROM goals g, users u, learning_tracks lt, instruments i
WHERE goal_iscomplete = 0
AND g.student_id = lt.student_id
AND g.teacher_id = teacher_id
AND g.instrument_id = lt.instrument_id
AND lt.student_id = u.user_id
AND CONCAT(u.user_firstname, ' ', u.user_surname) = student_name
AND i.instrument_id = lt.instrument_id
AND i.instrument_name = instrument_name;
END$$
DELIMITER ;
