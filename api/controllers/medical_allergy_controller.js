const MedicalAllergy = require('../models/medical_allergy_model');

// Create a new medical allergy
exports.createMedicalAllergy = async (req, res) => {
  try {
    const { name } = req.body;
    const newMedicalAllergy = new MedicalAllergy({ name });
    const savedMedicalAllergy = await newMedicalAllergy.save();
    res.status(201).json(savedMedicalAllergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all medical allergies
exports.getAllMedicalAllergies = async (req, res) => {
  try {
    const medicalAllergies = await MedicalAllergy.find();
    res.status(200).json({data:medicalAllergies});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update a medical allergy by ID
exports.updateMedicalAllergyById = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedMedicalAllergy = await MedicalAllergy.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedMedicalAllergy) {
      return res.status(404).json({ error: 'Medical allergy not found' });
    }
    res.status(200).json(updatedMedicalAllergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a medical allergy by ID
exports.deleteMedicalAllergyById = async (req, res) => {
  try {
    const deletedMedicalAllergy = await MedicalAllergy.findByIdAndDelete(
      req.params.id
    );
    if (!deletedMedicalAllergy) {
      return res.status(404).json({ error: 'Medical allergy not found' });
    }
    res.status(200).json({ message: 'Medical allergy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};