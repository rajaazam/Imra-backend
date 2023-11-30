const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({});
const Doctor = require("../models/doctor")
const{
    createDoctor
  }= require("../controllers/doctor_controller")
  
  const upload = multer({ storage });


router.post("/create-doctor", upload.single("Image"), createDoctor)

  //Doctor  Get all doctor 
router.get("/all-doctor", async (req, res) => {
    try {
      const data = await Doctor.find();
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  });
  
  // Doctor Get single doctor  api 
  router.get('/single-doctor/:doctorId', async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      // Find the doctor by ID
      const doctor = await Doctor.findById(doctorId);
  
      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found' });
      }
  
      res.json({ success: true, data: doctor });
    } catch (error) {
      console.error('Error fetching doctor:', error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });
  // Doctor Delete doctor api
  router.delete('/delete-doctor/:doctorId', async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      // Find the doctor by ID and delete it
      const deletedDoctor = await Doctor.findByIdAndRemove(doctorId);
  
      if (!deletedDoctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found' });
      }
  
      res.json({ success: true, message: 'Doctor deleted successfully', data: deletedDoctor });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });
  
  // Doctor update  api
  router.patch('/update-doctor/:doctorId', upload.single('Image'), async (req, res) => {
    try {
      const { doctorId } = req.params;
      const updatedData = req.body;
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedData.avatar = result.secure_url;
        // Handle image upload if necessary
        // Example: const imageUrl = await uploadImage(req.file);
        // updatedData.avatar = imageUrl;
      }
  
      // Find the doctor by ID and update their information
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        doctorId,
        updatedData,
        { new: true }
      );
  
      if (!updatedDoctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found' });
      }
  
      res.json({ success: true, message: 'Doctor updated successfully', data: updatedDoctor });
    } catch (error) {
      console.error('Error updating doctor:', error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });

  
  module.exports = router;