const express = require("express");
require("dotenv").config();
require("./models/db");
const useRouter = require("./routes/user");
const User = require("./models/user");
const cors = require("cors"); 

const app = express();
app.use(cors());

app.use(express.json());
app.use(useRouter);
const PORT = 8000;
app.get("/", (req, res) => {
  res.send("<h1>Hello world<h1>");
});

app.listen(PORT, () => {
  console.log(`Server is connected to part number ${PORT}`);
});

//// mongodb+srv://azam:azam123@imradatabase.lu0ke6f.mongodb.net/imradatabase?retryWrites=true&w=majority
