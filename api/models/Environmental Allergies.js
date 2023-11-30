

const mongoose = require('mongoose');

const EnvironmentalAllergiesSchema = new mongoose.Schema({
  name: { type: String, },
  
 
},{ timestamps: true },);


module.exports = mongoose.model("EnvironmentalAllergies", EnvironmentalAllergiesSchema);