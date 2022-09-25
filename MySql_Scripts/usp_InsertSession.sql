CREATE PROCEDURE usp_InsertSession (IN student_id int, IN goal_id int, IN session_rating int, IN session_comment varchar(255))
BEGIN
INSERT INTO sessions (
student_id, 
goal_id, 
session_date, 
session_rating, 
session_comment)
VALUES (
student_id,
goal_id,
current_date(),
session_rating,
session_comment);
END
