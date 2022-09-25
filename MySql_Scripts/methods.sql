-- Get user_id and password from database to compare to input. (need to investigate login)
SELECT user_id, user_password
FROM users
WHERE user_username = @username
AND user_password = @`password`;

-- Insert data into user table.
CALL usp_InsertUser("s", "Sally", "Walker", "0404040404", "swalker@gmail.com", "WalkyMcWalkface", "Password", 1);
-- works

-- Get user id for logged in username.
CALL usp_GetUserId("Charlizard", "KRkXHucL");
-- works

-- Get list of instruments for a student id.
CALL usp_GetInstrumentsForUser(500);
-- works

-- Get list of teachers for selected user and instrument id.
CALL usp_GetTeachersForUserInstrument(500, 20);
-- works

-- Get names of instruments and the teachers for each instrument for a given user_id (student).
CALL usp_GetInstrumentsTeachersForUser(500);
-- works

-- Get count completed goals for month, year, and total for user id, teacher_id, and instrument_id.
CALL usp_GetGoalCount(500, 516, 6, @goals_month, @goals_year, @goals_total);
SELECT @goals_month, @goals_year, @goals_total;
-- works

-- Get previous completed goals (top 10?) for user id, teacher_id, and instrument_id.
CALL usp_GetLatestCompletedGoals(500, 516, 6);
-- works

-- Get current goals for user id, teacher_id, and instrument_id.
CALL usp_GetCurrentGoals(505, 518, 13);
-- works

-- Get user details for logged in id (password as stars).
CALL usp_GetUserDetails (509);
-- works

-- Insert learning track.
CALL usp_InsertLearningTrack(521, 505, 15, curdate(), 1, 1);
-- works

-- Insert into learning_tracks student id and teacher id, with status inactive, instrument unassigned (id 32), and no start date.
CALL usp_InsertPending(500, 521);
-- works

-- Update data in user table.
CALL usp_UpdateUser(509, "Willow", "White", "0420212593", "worldwidewillow2@bigpond.com", "WilloWisp", "DingDong");
-- works

-- Delete user only if user type is s.
CALL usp_DeleteUser(523);
-- works if only referenced in users table.

-- Delete instrument only if user type is a (a is for admin!)
CALL usp_DeleteInstrument(1000, 33);
-- works

-- Get list of previous goals (number according to when created for that student, not id (and instrument and teacher)), description, date start, and date complete.
CALL usp_GetCompletedGoals(500, 6, 516);
-- works

-- Insert into sessions table.
CALL usp_InsertSession(505, 7, 4, null);
-- works

-- Get list of students, their instruments, and grades.
CALL usp_GetStudentIntrumentsGrades();
-- works

-- Insert into instruments table, check not already exists (made unique constraint).
CALL usp_InsertInstrument("Piccolo");
-- works

-- Get list of active students for a teacher – name, instrument(s), grade(s), start date?
CALL usp_GetActiveStudentsForTeacher(519);
-- works

-- Insert into goals table.
CALL usp_InsertGoal("This is a new goal wow", 520, 512, 15);
-- works

-- Update goals table.
CALL usp_UpdateGoal(21, "Updating the description of this goal", 0, null);
-- works

-- Get specific goal session dates, smiley (plus average), and comments.
CALL usp_GetSessionDetails(1);
CALL usp_GetSessionsAvg(4, @smiley_avg);
SELECT @smiley_avg;
