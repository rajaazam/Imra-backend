const express = require("express");
const router = express.Router();
const{
    createPrivacy,
    getAllPrivacy ,
    updatePrivacyById,
    deletePrivacyById
  }= require("../controllers/privacy_controller")


  router.post("/post-privacy",  createPrivacy),
  router.get("/get-privacy",  getAllPrivacy ),
  router.patch("/update-privacy/:id",  updatePrivacyById ),
  router.delete('/delete-privacy/:id', deletePrivacyById)


  module.exports = router;