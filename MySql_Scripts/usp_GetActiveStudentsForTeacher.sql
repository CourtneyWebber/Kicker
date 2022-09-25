SELECT * FROM kicker.learning_tracks;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetActiveStudentsForTeacher`(IN teacher_id int)
BEGIN
SELECT lt.student_id, CONCAT(user_firstname, ' ', user_surname) AS student_name, instrument_name, grade_name, COUNT(goal_id) AS goal_total, TIMESTAMPDIFF(YEAR, lt_startdate, CURDATE()) AS years_learning
FROM users u, learning_tracks lt, instruments i, grades gr, goals go
WHERE u.user_id = lt.student_id
AND i.instrument_id = lt.instrument_id
AND go.teacher_id = lt.teacher_id
AND go.student_id = lt.student_id
AND go.instrument_id = lt.instrument_id
AND go.goal_iscomplete = 1
AND gr.grade_id = lt.grade_id
AND lt_isactive = 1
AND lt.teacher_id = 1004
GROUP BY instrument_name;
END$$
DELIMITER ;
