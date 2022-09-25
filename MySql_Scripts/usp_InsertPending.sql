CREATE PROCEDURE usp_InsertPending (IN student_id int, IN teacher_id int)
BEGIN
INSERT INTO learning_tracks
VALUES (
teacher_id,
student_id,
32,
null,
0,
33
);
END
