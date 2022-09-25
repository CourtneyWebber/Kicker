CREATE PROCEDURE usp_GetLatestCompletedGoals (IN student_id int, IN teacher_id int, IN instrument_id int)
BEGIN
SELECT goal_id, goal_description, goal_startdate, goal_finishdate
FROM goals g
WHERE goal_iscomplete = 1
AND g.student_id = student_id
AND g.teacher_id = teacher_id
AND g.instrument_id = instrument_id
LIMIT 10;
END
