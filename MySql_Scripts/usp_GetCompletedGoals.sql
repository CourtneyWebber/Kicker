CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetCompletedGoals`(IN student_id int, IN instrument_id int, IN teacher_id int)
BEGIN
SET @row_number:= 0;
SELECT @row_number:=@row_number+1 AS goal_number, goal_description, goal_startdate, goal_finishdate
FROM goals g
WHERE g.goal_iscomplete = 1
AND g.student_id = student_id
AND g.instrument_id = instrument_id
AND g.teacher_id = teacher_id
ORDER BY g.goal_startdate;
END