const mongoose = require('mongoose');

const termCondtionSchema = new mongoose.Schema({
  termcondition: { type: String,  },
  
}, { timestamps: true });

module.exports = mongoose.model("TermCondition", termCondtionSchema);