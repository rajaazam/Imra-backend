const express = require("express");
const router = express.Router();
const MyRoutine = require('../models/myroutineModel');

router.post('/post/routine', async (req, res) => {
    try {
      const { questiontext, answers } = req.body;
  
      // Create a new MyRoutine using the MyRoutine model
      const newMyRoutine = new MyRoutine({ questiontext, answers });
  
      // Save the MyRoutine to the database
      await newMyRoutine.save();
  
      res.json({ message: 'Routine added successfully', data: newMyRoutine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  //get my routine 
  router.get('/get/routines', async (req, res) => {
    try {
      // Fetch all routines from the database and sort by the 'question' field in ascending order
      const routines = await MyRoutine.find().sort({ question: 1 });
  
      res.json({ success: true, data: routines });
    } catch (error) {
      console.error("Error fetching routines:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  // Update (Patch) a routine by ID
  router.patch('/patch/routine/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { questiontext, answers } = req.body;
  
      // Find the routine by ID and update the specified fields
      const updatedRoutine = await MyRoutine.findByIdAndUpdate(
        id,
        { $set: { questiontext, answers } },
        { new: true }
      );
  
      if (!updatedRoutine) {
        return res.status(404).json({ message: 'Routine not found' });
      }
  
      res.json({ message: 'Routine updated successfully', data: updatedRoutine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  /// delete api routine
  router.delete('/delete/routine/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the routine by ID and delete it
      const deletedRoutine = await MyRoutine.findByIdAndDelete(id);
  
      if (!deletedRoutine) {
        return res.status(404).json({ message: 'Routine not found' });
      }
  
      res.json({ message: 'Routine deleted successfully', data: deletedRoutine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  module.exports = router;