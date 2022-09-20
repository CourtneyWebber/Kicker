const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:3000" //front-end (react) running on 3000.
};
app.use(cors(corsOptions));

const port = process.env.PORT || 4000; //back-end on 4000.

app.use(express.json());
//middleware to read req.body.<params>

require('./routes/user_routes.js')(app);

app.listen(port,
    () => console.log(`Server Started on port ${port}...`))

