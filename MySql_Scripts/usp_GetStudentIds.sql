DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetStudentIds`(IN student_name varchar(255), IN instrument_name varchar(255), IN teacher_id int)
BEGIN
SELECT lt.student_id, i.instrument_id
FROM users u, learning_tracks lt, instruments i
WHERE u.user_id = lt.student_id
AND CONCAT(user_firstname, ' ', user_surname) = "Isla Johnson"
AND i.instrument_id = lt.instrument_id
AND i.instrument_name = "Bagpipes"
AND lt.teacher_id = 1004;
END$$
DELIMITER ;
