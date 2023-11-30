const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const multer = require("multer");
const storage = multer.diskStorage({});

const upload = multer({ storage });

const {
    createAdmin,
    adminSignIn,
    createHospitalAdmin,
    createReception,
    toggleActiveStatus
  } = require("../controllers/admin");


  router.patch("/toggle-active-status/:adminId", toggleActiveStatus);
  router.post(
    "/create-superadmin",
    upload.single("avatar"),
    //validateUserSignUp,
    //userVlidation,
    createAdmin
  );

  //get api all admin.
router.get("/all-admin", async (req, res) => {
    try {
      const data = await Admin.find({}, "-password -tokens");
  
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  });
  //get api single  admin.
  router.get("/single-admin/:adminId", async (req, res) => {
    try {
      const adminId = req.params.adminId; // Get the admin ID from the URL parameter
      const data = await Admin.findById(adminId, "-password -tokens"); // Find the admin by ID
  
      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Admin not found" });
      }
  
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching single admin:", error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  });

  router.post(
    "/create-hospitaladmin",
    // validateUserSignUp,
    // userVlidation,
    createHospitalAdmin
  );
  router.post(
    "/create-hospital-recept",
    // validateUserSignUp,
    // userVlidation,
    createReception
  );

router.post("/sign-in-admin", adminSignIn);

router.patch(
    "/admin-update/:adminId",
    upload.single("avatar"),
    async (req, res) => {
      try {
        const { adminId } = req.params;
        const updatedData = req.body;
  
        // console.log('Request received with userId:', userId);
        // console.log('Request body:', updatedData);
  
        if (req.file) {
          console.log("File received:", req.file);
          const result = await cloudinary.uploader.upload(req.file.path);
          updatedData.avatar = result.secure_url;
        } else {
          console.log("No file received");
        }
  
        //console.log('Updating user data:', updatedData);
  
        const updatedUser = await Admin.findByIdAndUpdate(
          adminId,
          updatedData, // Pass updatedData directly
          { new: true }
        );
  
        // console.log('Updated user:', updatedUser);
  
        if (!updatedUser) {
          console.log("User not found");
          return res.status(404).json({ message: "User not found" });
        }
  
        //console.log('Sending response');
        return res
          .status(200)
          .json({ message: "updated successfully", updatedData });
        //res.status(200).{ message: 'updated successfully' };
      } catch (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ error: "Internal server error", details: error.message });
      }
    }
  );

  module.exports = router;