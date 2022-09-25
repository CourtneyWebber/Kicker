CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetInstrumentsForUser`(IN student_name varchar(255), IN teacher_id int)
BEGIN
SELECT instrument_name
FROM instruments i, learning_tracks lt, users u
WHERE i.instrument_id = lt.instrument_id
AND lt.student_id = u.user_id
AND lt.teacher_id = teacher_id
AND CONCAT(user_firstname, ' ', user_surname) = student_name;
END