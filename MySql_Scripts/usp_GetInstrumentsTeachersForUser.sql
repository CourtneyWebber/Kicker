CREATE PROCEDURE usp_GetInstrumentsTeachersForUser (IN student_id int)
BEGIN
SELECT instrument_name, CONCAT(user_firstname, ' ', user_surname) AS teacher_name
FROM instruments i, learning_tracks lt, users u
WHERE i.instrument_id = lt.instrument_id
AND lt.teacher_id = u.user_id
AND lt.student_id = student_id;
END
