CREATE PROCEDURE usp_InsertLearningTrack (IN teacher_id int, IN student_id int, IN instrument_id int, IN startdate date, IN isactive bool, IN grade_id int)
BEGIN
INSERT INTO learning_tracks
VALUES (
teacher_id,
student_id,
instrument_id,
startdate,
isactive,
grade_id);
END
