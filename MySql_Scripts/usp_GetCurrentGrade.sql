DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetCurrentGrade`(IN student_name varchar(255), IN instrument_name varchar(255), IN teacher_id int)
BEGIN
SELECT grade_name
FROM instruments i, grades g, learning_tracks lt, users u
WHERE i.instrument_id = lt.instrument_id
AND g.grade_id = lt.grade_id
AND lt.student_id = u.user_id
AND lt.teacher_id = teacher_id
AND CONCAT(u.user_firstname, ' ', u.user_surname) = student_name
AND i.instrument_name = instrument_name;
END$$
DELIMITER ;
