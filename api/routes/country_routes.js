const express = require("express");
const router = express.Router();
const Country= require('../models/country_model')
const{createCountry}= require('../controllers/country_contoller');

const multer = require("multer");
const storage = multer.diskStorage({});

const upload = multer({ storage });


router.post("/country", upload.single("countryImage"),createCountry )

// get all country api
router.get("/all-country", async (req, res) => {
  try {
    const data = await Country.find();
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching Country:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});


//country delete api

router.delete('/delete-country/:id', async (req, res) => {
  const countryId = req.params.id;

  try {
    const deletedCountry = await Country.findByIdAndDelete(countryId);

    if (deletedCountry) {
      res.json({ success: true, message: 'Country deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Country not found.' });
    }
  } catch (error) {
    console.error('Error deleting Country:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});


// update country api

router.patch('/updatecountry/:id', upload.single('countryImage'), async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedData.countryImage = result.secure_url;
      } else {
        console.log('No file received');
      }
  
      const updatedCountry = await Country.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
      );
  
      if (!updatedCountry) {
        return res.status(404).json({ message: 'Country not found' });
      }
  
      return res.status(200).json({ message: 'Country updated successfully', updatedData });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  module.exports = router;