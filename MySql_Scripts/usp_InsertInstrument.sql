CREATE PROCEDURE usp_InsertInstrument (IN instrument_name varchar(50))
BEGIN
INSERT INTO instruments (instrument_name)
VALUES (instrument_name);
END
