CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_UpdateGoal`(IN goal_id int, IN goal_description varchar(255), IN is_complete bit, IN finish_date date)
BEGIN
UPDATE goals
SET
goal_description = goal_description,
goal_iscomplete = is_complete,
goal_finishdate = finish_date
WHERE goals.goal_id = goal_id;
END