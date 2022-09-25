Kicker

Kicker is a web application that allows music students and teachers to collaborate in creating and tracking goals.

Students are able to assess themselves, and see measurable progress in their learning journey.

Prerequisites
Before you begin, ensure you have met the following requirements:

Cloned the repository to your local machine.
Installed MySQL Workbench and run createKicker.sql (create db before trying to create tables).
Using MySQL Workbench, import the .csv files to populate the tables with test data (if you experience difficulty, it's probably the date format. MySQL wants it YYYY-MM-DD').
Execute each usp_ file to create the required stored procedures.

Installing Kicker
To install Kicker, follow these steps:

npm install

Using Kicker
To use Kicker, follow these steps:
In a terminal window (Developer PowerShell for example), navigate to back/app and type 'nodemon server' and press enter.
Within back/app, locate and open the .env file. Change DB_USER and DB_PASSWORD to match the connection credentials you used when creating and connecting to the database in MySQL Workbench.
In a different terminal, navigate to front/app and type 'npm start' and press enter. This will open a browser window to the Sign In page.

Test user logins
Student
Username: Shazza
Password: qwerty

Teacher
Username: Waxon
Password: Waxoff

Contributors
Thanks to the following people who have contributed to this project:
Jo Batkin - Invaluable advice and troubleshooting support.

Contact
If you want to contact me you can reach me at cbwebber@hotmail.com