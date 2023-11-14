const mongoose = require('mongoose');

const foodAllergySchema = new mongoose.Schema({
  name: { type: String, },
 
});

const FoodAllergy = mongoose.model('FoodAllergy', foodAllergySchema);

module.exports = FoodAllergy;