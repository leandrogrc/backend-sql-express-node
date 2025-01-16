const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());

const { router } = require("./routes/userRoutes");
app.use("/", router);

app.listen(PORT, () => console.log("Listening on port " + PORT));
