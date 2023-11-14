const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  countryImage: { type: String,  },
  name: { type: String, },
}, { timestamps: true });

module.exports = mongoose.model("Country", countrySchema);