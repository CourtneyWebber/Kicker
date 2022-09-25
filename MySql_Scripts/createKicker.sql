CREATE DATABASE kicker;

CREATE TABLE users(
user_id int NOT NULL auto_increment,
user_type varchar(1) NOT NULL,
user_firstname varchar(50) NOT NULL,
user_surname varchar(50) NOT NULL,
user_phone varchar(15) NOT NULL,
user_email varchar(50) NOT NULL,
user_username varchar(30) NOT NULL UNIQUE,
user_password varchar(255) NOT NULL,
user_isactive bool NOT NULL,
PRIMARY KEY (user_id)
);

CREATE TABLE instruments(
instrument_id int NOT NULL auto_increment,
instrument_name varchar(50) NOT NULL UNIQUE,
PRIMARY KEY (instrument_id)
);

CREATE TABLE grades(
grade_id int NOT NULL auto_increment,
grade_name varchar(20) NOT NULL UNIQUE,
PRIMARY KEY (grade_id)
);

CREATE TABLE learning_tracks(
teacher_id int NOT NULL,
student_id int NOT NULL,
instrument_id int NOT NULL,
lt_startdate date,
lt_isactive bool NOT NULL,
grade_id int NOT NULL,
PRIMARY KEY (teacher_id, student_id, instrument_id),
CONSTRAINT fk_users_lt_teacher FOREIGN KEY (teacher_id) REFERENCES users(user_id),
CONSTRAINT fk_users_lt_student FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
CONSTRAINT fk_instrument_lt FOREIGN KEY (instrument_id) REFERENCES instruments(instrument_id)
);

CREATE TABLE goals(
goal_id int NOT NULL auto_increment,
goal_description varchar(255) NOT NULL,
goal_startdate date NOT NULL,
goal_iscomplete bool NOT NULL,
goal_finishdate date,
teacher_id int NOT NULL,
student_id int NOT NULL,
instrument_id int NOT NULL,
PRIMARY KEY (goal_id),
CONSTRAINT fk_lt_teacher_goals FOREIGN KEY (teacher_id) REFERENCES learning_tracks(teacher_id),
CONSTRAINT fk_lt_student_goals FOREIGN KEY (student_id) REFERENCES learning_tracks(student_id) ON DELETE CASCADE,
CONSTRAINT fk_lt_instrument_goals FOREIGN KEY (instrument_id) REFERENCES learning_tracks(instrument_id)
);

CREATE TABLE sessions(
student_id int NOT NULL,
goal_id int NOT NULL,
session_date date NOT NULL,
session_rating int NOT NULL,
session_comment varchar(255),
PRIMARY KEY(student_id, goal_id, session_date),
CONSTRAINT fk_users_sessions FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
CONSTRAINT fk_goals_sessions FOREIGN KEY (goal_id) REFERENCES goals(goal_id)
);