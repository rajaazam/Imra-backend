const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Admin = require("../models/admin");
const Hospital = require("../models/hospital");
router.get('/dishboard', async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      const hospitalCount = await Hospital.countDocuments();
      const adminCount = await Admin.countDocuments();
  
      res.json({
        success: true,
        data: {
          userCount,
          hospitalCount,
          adminCount
        }
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });
  module.exports = router;