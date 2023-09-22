const mongoose= require('mongoose');


const doctorSchema = new mongoose.Schema({
   name: {
       type: String,
       //required: true,
     },
     email: {
       type: String,
      // required: true,
       unique: true,
     },
     phonenumber:{
       type: String,
      // required: true,
     },
     pdmaid: {
       type: String,
      // required: true,
     },
     experience: {
      type: String,
      //required: true,
    },
    qualification:{
        type:String,
    },
    Image: {
      type:String
     },
    
});




module.exports= mongoose.model('Doctor',doctorSchema);