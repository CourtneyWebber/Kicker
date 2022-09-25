CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetTeacherForUserInstrument`(IN student_id int, IN instrument_id int)
BEGIN
SELECT CONCAT(user_firstname, ' ', user_surname) AS teacher_name
FROM learning_tracks lt, users u
WHERE lt.teacher_id = u.user_id
AND lt.instrument_id = instrument_id
AND lt.student_id = student_id;
END