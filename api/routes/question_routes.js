
const express = require("express");
const router = express.Router();
const Question   = require('../models/QuestionModel');

router.post('/api/questions', async (req, res) => {
    try {
      const { questionText, answers } = req.body;
  
      // Create a new question using the Question model
      const newQuestion = new Question({ questionText, answers });
  
      // Save the question to the database
      await newQuestion.save();
  
      res.json({ message: 'Question added successfully', question: newQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  // get api  question
  router.get('/get/questions', async (req, res) => {
    try {
      // Fetch all questions from the database
      const questions = await Question.find();
  
      res.json({ questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  // delete  question  api 
  router.delete('/delete/question/:id', async (req, res) => {
    const questionId = req.params.id;
  
    try {
      const deletedQuestion = await Question.findByIdAndDelete(questionId);
  
      if (deletedQuestion) {
        res.json({ success: true, message: 'Question deleted successfully.' });
      } else {
        res.status(404).json({ success: false, message: 'Question not found.' });
      }
    } catch (error) {
      console.error('Error deleting Question:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });  
  
  
  // patch api for question
  router.patch('/update/questions/:id', async (req, res) => {
    const questionId = req.params.id;
    const { questionText, answers } = req.body;
  
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(
        questionId,
        { questionText, answers },
        { new: true } // This option returns the updated document
      );
  
      if (updatedQuestion) {
        res.json({ success: true, message: 'Question updated successfully', question: updatedQuestion });
      } else {
        res.status(404).json({ success: false, message: 'Question not found.' });
      }
    } catch (error) {
      console.error('Error updating Question:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  module.exports = router;