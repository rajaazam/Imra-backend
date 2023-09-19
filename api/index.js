const express = require("express");
require("dotenv").config();
require("./models/db");
const useRouter = require("./routes/user");
const User = require("./models/user");
const cors = require("cors"); 

const app = express();
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(useRouter);c
const PORT = 8000;
app.get("/", (req, res) => {
  res.send("<h1>Hello world<h1>");
});

app.listen(PORT, () => {
  console.log(`Server is connected to part number ${PORT}`);
});

//// mongodb+srv://azam:azam123@imradatabase.lu0ke6f.mongodb.net/imradatabase?retryWrites=true&w=majority
