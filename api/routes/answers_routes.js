const express = require("express");
const router = express.Router();
const Answer = require('../models/AnswerModel');
router.post('/api/answers', async (req, res) => {
    try {
      const { answerText } = req.body;
  
      // Create a new answer using the Answer model
      const newAnswer = new Answer({ answerText });
  
      // Save the answer to the database
      await newAnswer.save();
  
      res.json({ message: 'Answer added successfully', answer: newAnswer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  module.exports = router;