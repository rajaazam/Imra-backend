const express = require("express");
const router = express.Router();
const FoodAllergy = require('../models/foodAllergies');

// food allgries
router.post('/api/food-allergies', async (req, res) => {
    try {
      const { name, description } = req.body;
  
      // Create a new food allergy using the FoodAllergy model
      const newFoodAllergy = new FoodAllergy({ name, description });
  
      // Save the food allergy to the database
      await newFoodAllergy.save();
  
      res.json({ message: 'Food Allergy added successfully', foodAllergy: newFoodAllergy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  //get api  food allgries
  router.get('/get/food-allergies', async (req, res) => {
    try {
      // Fetch all food allergies from the database
      const foodAllergies = await FoodAllergy.find();
  
      res.json({ foodAllergies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // update food allergy api
  router.patch('/api/food-allergies/:id', async (req, res) => {
    const allergyId = req.params.id;
    const { name, description } = req.body;
  
    try {
      const updatedAllergy = await FoodAllergy.findByIdAndUpdate(
        allergyId,
        { name, description },
        { new: true } // This option returns the updated document
      );
  
      if (updatedAllergy) {
        res.json({ success: true, message: 'Food Allergy updated successfully', foodAllergy: updatedAllergy });
      } else {
        res.status(404).json({ success: false, message: 'Food Allergy not found.' });
      }
    } catch (error) {
      console.error('Error updating Food Allergy:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
  
  // delete  food allergy api
  router.delete('/delete/food-allergy/:id', async (req, res) => {
    const allergyId = req.params.id;
  
    try {
      const deletedAllergy = await FoodAllergy.findByIdAndDelete(allergyId);
  
      if (deletedAllergy) {
        res.json({ success: true, message: 'Food allergy deleted successfully.' });
      } else {
        res.status(404).json({ success: false, message: 'Food allergy not found.' });
      }
    } catch (error) {
      console.error('Error deleting Food Allergy:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  // search api for food allergy
  router.get('/api/food-allergies', async (req, res) => {
    try {
      const searchText = req.query.searchText;
  
      let query = {};
      if (searchText) {
        // If searchText is provided, create a case-insensitive regular expression for searching
        const searchRegex = new RegExp(searchText, 'i');
        query = { name: searchRegex };
      }
  
      // Fetch food allergies from the database based on the query
      const foodAllergies = await FoodAllergy.find(query);
  
      res.json({ foodAllergies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  module.exports = router;