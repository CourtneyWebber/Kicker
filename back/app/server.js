const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:3000" //front-end (react) running on 3000.
};
app.use(cors(corsOptions));

const port = process.env.PORT || 4000; //back-end on 4000.

app.use(express.json());

require('./routes/user_routes.js')(app);
require('./routes/grade_routes.js')(app);
require('./routes/goal_routes.js')(app);

app.listen(port,
    () => console.log(`Server Started on port ${port}...`))

