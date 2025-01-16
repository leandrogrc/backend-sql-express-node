const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());

const { router } = require("./routes/userRoutes");
app.use("/", router);

//const { getUsers, getUser, newUser } = require("./database/database");
//newUser("Carina", "carinabiabastos@gmail.com");
//getUsers();
//getUser(1);

app.listen(PORT, () => console.log("Listening on port " + PORT));
