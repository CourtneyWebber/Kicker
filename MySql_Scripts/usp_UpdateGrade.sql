DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_UpdateGrade`(IN student_name varchar(255), IN instrument_name varchar(255), IN teacher_id int, IN grade_id int)
BEGIN
UPDATE learning_tracks lt, users u, instruments i
SET lt.grade_id = grade_id
WHERE u.user_id = lt.student_id
AND CONCAT(u.user_firstname, ' ', u.user_surname) = student_name
AND i.instrument_name = instrument_name
AND i.instrument_id = lt.instrument_id
AND lt.teacher_id = teacher_id;
END$$
DELIMITER ;
