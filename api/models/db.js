const mongoose = require("mongoose");

const URL =
  "mongodb+srv://ImraDB:array1976@imradb.ueqyeen.mongodb.net/IMRADB?retryWrites=true&w=majority";
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("our db is connected");
  })
  .catch((err) => console.log(err.message));
