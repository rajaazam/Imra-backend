const express = require("express");
const router = express.Router();
const Document = require("../models/documents");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });
const { createDocument } = require("../controllers/document_controller");


router.post("/create-document", upload.single("document"), createDocument);
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