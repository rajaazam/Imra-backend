const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");
const multer = require("multer");
const User = require("../models/user");
const Admin = require("../models/admin");
const cloudinary = require("cloudinary").v2;
const Question   = require('../models/QuestionModel');
const Answer = require('../models/AnswerModel');
const FoodAllergy = require('../models/foodAllergies');
const Country= require('../models/country_model')
const MyRoutine = require('../models/myroutineModel');

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});


const {
  createUser,
  userSignIn,
  createProfile,
  changePassword,
  // uploadProfile,
  signOut
} = require("../controllers/user");

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


 


// creat user api start
router.post(
  "/create-user",
  //upload.single('avatar'),
  // validateUserSignUp,
  // userVlidation,
  createUser
);
router.post("/sign-in", userSignIn);

router.post("/sign-out", isAuth, signOut);

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

//// get all reception api
// router.get("/all-reception", async (req, res) => {
//   try {
//     const data = await Admin.find({ type: 3 }, "-password -tokens");

//     res.json({ success: true, data });
//   } catch (error) {
//     console.error("Error fetching reception:", error);
//     res.status(500).json({ success: false, message: "An error occurred." });
//   }
// });
// update Reception
// router.patch("/update-reception/:id", async (req, res) => {
//   const recptId = req.params.id;
//   const updatedData = req.body;

//   try {
//     const updatedReception = await Admin.findByIdAndUpdate(
//       recptId,
//       updatedData,
//       { new: true }
//     );

//     if (!updatedReception) {
//       return res.status(404).json({
//         success: false,
//         message: "Reception not found."
//       });
//     }

//     res.json({
//       success: true,
//       message: "Reception updated successfully.",
//       data: updatedReception
//     });
//   } catch (error) {
//     console.error("Error updating Reception:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the Reception."
//     });
//   }
// });

//Delete reception
// router.delete("/delete-reception/:id", async (req, res) => {
//   const recptId = req.params.id;

//   try {
//     const deletedReception = await Admin.findByIdAndDelete(recptId);
//     if (!deletedReception) {
//       return res.status(404).json({
//         success: false,
//         message: "Reception not found."
//       });
//     }
//     res.json({
//       success: true,
//       message: "Reception deleted successfully."
//     });
//   } catch (error) {
//     console.error("Error deleting Reception:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the Reception."
//     });
//   }
// });

module.exports = router;
