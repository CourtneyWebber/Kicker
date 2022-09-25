CREATE PROCEDURE usp_GetGoalCount (IN student_id int, IN teacher_id int, IN instrument_id int, OUT goals_month int, OUT goals_year int, OUT goals_total int)
BEGIN

SELECT SUM(goal_iscomplete) INTO goals_month
FROM goals g
WHERE g.student_id = student_id
AND g.teacher_id = teacher_id
AND g.instrument_id = instrument_id
AND g.goal_finishdate > now() - INTERVAL 1 MONTH;

SELECT SUM(goal_iscomplete) INTO goals_year
FROM goals g
WHERE g.student_id = student_id
AND g.teacher_id = teacher_id
AND g.instrument_id = instrument_id
AND YEAR(g.goal_finishdate) = YEAR(now());

SELECT SUM(goal_iscomplete) INTO goals_total
FROM goals g
WHERE g.student_id = student_id
AND g.teacher_id = teacher_id
AND g.instrument_id = instrument_id;

END
