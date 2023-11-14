const cloudinary = require('cloudinary').v2;
const Country = require('../models/country_model');    
cloudinary.config({ 
  cloud_name: 'dzq1h0xyu', 
  api_key: '345126432123499', 
  api_secret: 'cqCvcU_hqshoESszVszEnB5-D_8' ,
  resource_type: 'auto' 
});

exports.createCountry = async (req, res) => {
  try {
    const { countryImage, name } = req.body;

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload the image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });

    // Create a new Country
    const country = new Country({
      countryImage: result.secure_url,
      name,
    });

    // Save the country
    await country.save();

    // Return the created country in the response
    res.status(201).json({
      country: country.toJSON(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};