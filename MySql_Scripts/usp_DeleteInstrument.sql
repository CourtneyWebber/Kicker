CREATE PROCEDURE usp_DeleteInstrument (IN user_id int, IN instrument_id int)
BEGIN

SELECT user_type INTO @userType
FROM users u
WHERE u.user_id = user_id;

DELETE
FROM instruments i
WHERE i.instrument_id = instrument_id
AND @userType = 'a';

END
