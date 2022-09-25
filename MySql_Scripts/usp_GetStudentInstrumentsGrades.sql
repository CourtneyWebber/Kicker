CREATE PROCEDURE usp_GetStudentIntrumentsGrades ()
BEGIN
SELECT CONCAT(user_firstname, ' ', user_surname) AS student_name, instrument_name, grade_name
FROM instruments i, grades g, learning_tracks lt, users u
WHERE i.instrument_id = lt.instrument_id
AND g.grade_id = lt.grade_id
AND lt.student_id = u.user_id
ORDER BY student_name;
END
