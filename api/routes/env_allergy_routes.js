const express = require("express");
const router = express.Router();

const environmentalAllergiesController = require('../controllers/EnvAllergy_controller');


// Create a new environmental allergy
router.post('/post-environmental-allergies', environmentalAllergiesController.createEnvironmentalAllergy);

// Get all environmental allergies
router.get('/get-environmental-allergies', environmentalAllergiesController.getAllEnvironmentalAllergies);

// Update an environmental allergy by ID
router.patch('/update-environmental-allergies/:id', environmentalAllergiesController.updateEnvironmentalAllergyById);

// Delete an environmental allergy by ID

router.delete('/delete-environmental-allergies/:id', environmentalAllergiesController.deleteEnvironmentalAllergyById);
module.exports = router;