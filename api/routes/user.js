const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");
const multer = require("multer");
const User = require("../models/user");
const Admin = require("../models/admin");
const Document = require("../models/documents");
const MedicalHistory = require("../models/medicalhistory");
const MedicationHistory = require("../models/medicinehistory");
const Doctor = require("../models/doctor")
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});

const{
  createDoctor
}= require("../controllers/doctor_controller")

const {
  createMedicalHistory,
  createMedicationHistory
} = require("../controllers/medical_history_controller");
const {
  createUser,
  userSignIn,
  createProfile,
  changePassword,
  // uploadProfile,
  signOut
} = require("../controllers/user");

const { createDocument } = require("../controllers/document_controller");

//for admin controller
const {
  createAdmin,
  adminSignIn,
  createHospitalAdmin,
  createReception,
  toggleActiveStatus
} = require("../controllers/admin");

const { createHospital, getHospital } = require("../controllers/hospital");

const { isAuth } = require("../middlewares/auth");

const { response } = require("express");
const storage = multer.diskStorage({});
// const fileFilter = (req, file, cb) => {
//     if (!file.mimetype.startsWith("image")) {
//         return cb(new Error("Only image files are allowed"), false);
//     } else {
//         cb(null, true);
//     }
// };
const upload = multer({ storage });


//get  dishboard total api

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
// router.get('/dishboard',async (req,res)=>{
//   try {
    
//     const userCount= await User.countDocument();
//     const hospitalCount= await Hospital.countDocument();
//     const adminCount= await Admin.countDocument();

//     res.json({
//       success:true,
//       data:{
//         userCount,
//         hospitalCount,
//         adminCount
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching counts:', error);
//     res.status(500).json({ success: false, message: 'An error occurred.' });
//   }
// })

// Doctor create doctor api
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

// creat user api start
router.post(
  "/create-user",
  //upload.single('avatar'),
  // validateUserSignUp,
  // userVlidation,
  createUser
);

// creat admin api start
router.post(
  "/create-superadmin",
  upload.single("avatar"),
  //validateUserSignUp,
  //userVlidation,
  createAdmin
);

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
router.post("/create-document", upload.single("document"), createDocument);
router.post("/sign-in", userSignIn);
router.post("/sign-in-admin", adminSignIn);
router.post("/sign-out", isAuth, signOut);
router.post("/create-hospital",
  upload.single("avatar"),
createHospital);
router.post("/create-medicalhistory", createMedicalHistory);
router.post("/create-medicationhistory", createMedicationHistory);
router.post("/reset-password", changePassword);

// creat user profile api start
router.post(
  "/create-profile/:userId",
  upload.single("avatar"),
  async (req, res) => {
    const userId = req.params.userId;

    try {
      const { date_of_birth, country, address } = req.body;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Update the user's profile in the database using User.findByIdAndUpdate
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          date_of_birth: date_of_birth,
          address: address,
          country: country,
          avatar: result.secure_url
        },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User profile created successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
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
//get api all user.
router.get("/all-user", async (req, res) => {
  try {
    const data = await User.find({}, "-password -tokens");

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});
//get all document api
router.get("/all-doc", async (req, res) => {
  try {
    const data = await Document.find({});

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching Document:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});



module.exports = router;

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

//// get all reception api
router.get("/all-reception", async (req, res) => {
  try {
    const data = await Admin.find({ type: 3 }, "-password -tokens");

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching reception:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});
// update Reception
router.patch("/update-reception/:id", async (req, res) => {
  const recptId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedReception = await Admin.findByIdAndUpdate(
      recptId,
      updatedData,
      { new: true }
    );

    if (!updatedReception) {
      return res.status(404).json({
        success: false,
        message: "Reception not found."
      });
    }

    res.json({
      success: true,
      message: "Reception updated successfully.",
      data: updatedReception
    });
  } catch (error) {
    console.error("Error updating Reception:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the Reception."
    });
  }
});

//Delete reception
router.delete("/delete-reception/:id", async (req, res) => {
  const recptId = req.params.id;

  try {
    const deletedReception = await Admin.findByIdAndDelete(recptId);
    if (!deletedReception) {
      return res.status(404).json({
        success: false,
        message: "Reception not found."
      });
    }
    res.json({
      success: true,
      message: "Reception deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting Reception:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the Reception."
    });
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


// delete api for user
router.delete("/delete-user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the User."
    });
  }
});


//user update profile
router.patch(
  "/userupdate/:userId",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedData = req.body;
      if (req.file) {
       // console.log("File received:", req.file);
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedData.avatar = result.secure_url;
      } else {
        console.log("No file received");
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {$set:updatedData,},
         // Pass updatedData directly
        { new: true }
      );


      if (!updatedUser) {
       // console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "updated successfully", updatedData });
     
    } catch (error) {
     // console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }

  
  }
);

// user single get api
router.get("/single-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Get the admin ID from the URL parameter
    const data = await User.findById(userId, "-password -tokens"); // Find the admin by ID

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching single user:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});

// update super admin
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
// is_active api
router.patch("/toggle-active-status/:adminId", toggleActiveStatus);
// get  medical History
router.get("/medical-history/:userId", async (req, res) => {
  try {
    // Extract the medical history record ID from the request parameters
    const userId = req.params.userId;

    // Fetch the medical history record by its ID
    const medicalHistoryRecord = await MedicalHistory.find({ user: userId });
    console.log(userId);
    console.log(medicalHistoryRecord);
    // Check if the record exists
    if (!medicalHistoryRecord) {
      return res
        .status(404)
        .json({ error: "Medical history record not found" });
    }

    // Return the medical history record data as a JSON response
    res.status(200).json({ "success ": 1, data: medicalHistoryRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get Medication history
router.get("/medication-history/:userId", async (req, res) => {
  try {
    // Extract the medical history record ID from the request parameters
    const userId = req.params.userId;

    // Fetch the medical history record by its ID
    const medicationHistoryRecord = await MedicationHistory.find({
      user: userId
    });
    // Check if the record exists
    if (!medicationHistoryRecord) {
      return res
        .status(404)
        .json({ error: "Medication history record not found" });
    }

    // Return the medical history record data as a JSON response
    res.status(200).json({ "success ": 1, data: medicationHistoryRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get  single user all doc
router.get("/user_all_doc/:userId", async (req, res) => {
  try {
    // Extract the medical history record ID from the request parameters
    const userId = req.params.userId;

    // Fetch the medical history record by its ID
    const docRecord = await Document.find({
      user: userId
    });
    // Check if the record exists
    if (!docRecord) {
      return res
        .status(404)
        .json({ error: "Document record not found" });
    }

    // Return the medical history record data as a JSON response
    res.status(200).json({ "success ": 1, data: docRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
