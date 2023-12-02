const express = require("express");
require("dotenv").config();
require("./models/db");
const useRouter = require("./routes/user");
const privacyRouter = require("./routes/privacy_routes");
const medicalhistory= require("./routes/medical_history_routes");
const admin= require("./routes/admin_routes");
const country= require("./routes/country_routes");
const dishboard= require("./routes/dishboard_routes");
const doctor=require("./routes/doctor_routes");
const document= require("./routes/doucment_router");
const envallergy = require("./routes/env_allergy_routes");
const foodallergy = require("./routes/food_allergy_routes");
const hospital = require("./routes/hospital_routes");
const medicalallergy = require("./routes/medical_allergy_routes");
const myroutien = require("./routes/myroutine_routes");
const question = require("./routes/question_routes");
const term = require("./routes/term_contition_routes");
const faqs = require("./routes/faq_routes");
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
app.use(useRouter);
app.use(privacyRouter);
app.use(medicalhistory);
app.use(doctor);
app.use(admin);
app.use(country);
app.use(document);
app.use(envallergy);
app.use(foodallergy);
app.use(hospital);
app.use(medicalallergy);
app.use(myroutien);
app.use(question);
app.use(term);
app.use(dishboard);
app.use(faqs);
const PORT = 8001;
app.get("/", (req, res) => {
  res.send("<h1>Hello world<h1>");
});

app.listen(PORT, () => {
  console.log(`Server is connected to part number ${PORT}`);
});

//// mongodb+srv://azam:azam123@imradatabase.lu0ke6f.mongodb.net/imradatabase?retryWrites=true&w=majority
