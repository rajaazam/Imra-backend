const mongoose = require('mongoose');

const MedicalAllergySchema = new mongoose.Schema({
  name: { type: String, },
  

 
},{ timestamps: true },);


module.exports = mongoose.model("MedicalAllergy", MedicalAllergySchema);