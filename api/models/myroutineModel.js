const mongoose = require('mongoose');

const MyRoutineSchema = new mongoose.Schema({
  questiontext: {
    type: String,
  },
  answers: 
    {
      type: String,
     
    }
  
});

const MyRoutine = mongoose.model('MyRoutine', MyRoutineSchema);

module.exports = MyRoutine;