

const express = require("express");
const router = express.Router();
const medicalAllergyController = require('../controllers/medical_allergy_controller');
router.post('/medical-allergies', medicalAllergyController.createMedicalAllergy);

// Get all medical allergies
router.get('/get-medical-allergies', medicalAllergyController.getAllMedicalAllergies);

// Update a medical allergy by ID
router.patch('/update-medical-allergies/:id', medicalAllergyController.updateMedicalAllergyById);

// Delete a medical allergy by ID
router.delete('/delete-medical-allergies/:id', medicalAllergyController.deleteMedicalAllergyById);
module.exports = router;