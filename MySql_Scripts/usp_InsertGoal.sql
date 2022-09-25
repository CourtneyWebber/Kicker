CREATE PROCEDURE usp_InsertGoal (IN goal_description varchar(255), IN teacher_id int, IN student_id int, IN instrument_id int)
BEGIN
INSERT INTO goals (
goal_description,
goal_startdate,
goal_iscomplete,
teacher_id,
student_id,
instrument_id)
VALUES (
goal_description,
current_date(),
0,
teacher_id,
student_id,
instrument_id);
END
