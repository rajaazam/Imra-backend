const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");
const multer = require("multer");
const storage = multer.diskStorage({});

const upload = multer({ storage });

const { createHospital, getHospital } = require("../controllers/hospital");

router.post("/create-hospital",
  upload.single("avatar"),
createHospital);

//get api all hospital.
router.get("/all-hospitals", async (req, res) => {
    try {
      const data = await Hospital.find();
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  });
  
  //get single hospital
  router.get("/hospital/:hospitalId", async (req, res) => {
    try {
      const hospitalId = req.params.hospitalId;
  
      // Use findById to find a hospital by its ID
      const hospital = await Hospital.findById(hospitalId);
  
      if (!hospital) {
        return res
          .status(404)
          .json({ success: false, message: "Hospital not found." });
      }
  
      res.json({ success: true, data: hospital });
    } catch (error) {
      console.error("Error fetching hospital:", error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  });

  //Update api hospital
router.patch('/update-hospital/:hospitalId', upload.single('avatar'), async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const updatedData = req.body;
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedData.avatar = result.secure_url;
      }
  
      // Find the hospital by ID and update its information
      const updatedHospital = await Hospital.findByIdAndUpdate(
        hospitalId,
        updatedData,
        { new: true }
      );
  
      if (!updatedHospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
  
      return res.status(200).json({ message: 'Hospital updated successfully', updatedHospital });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  
  ///Delete api hospital
router.delete("/delete-hospital/:id", async (req, res) => {
    const hospitalId = req.params.id;
  
    try {
      const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);
      if (!deletedHospital) {
        return res.status(404).json({
          success: false,
          message: "Hospital not found."
        });
      }
      res.json({
        success: true,
        message: "Hospital deleted successfully."
      });
    } catch (error) {
      console.error("Error deleting hospital:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while deleting the hospital."
      });
    }
  });


  module.exports = router;