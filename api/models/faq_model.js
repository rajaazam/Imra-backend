const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  faqquestion: {
    type: String,
   // required: true,
  },
  faqanswers: 
    {
      type: String,
      //required: true,
    }
  
});

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;