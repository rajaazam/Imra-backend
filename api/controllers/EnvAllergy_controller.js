const EnvironmentalAllergies = require('../models/Environmental Allergies');

// Create a new environmental allergy
exports.createEnvironmentalAllergy = async (req, res) => {
  try {
    const { name } = req.body;
    const newEnvironmentalAllergy = new EnvironmentalAllergies({ name });
    const savedEnvironmentalAllergy = await newEnvironmentalAllergy.save();
    res.status(201).json(savedEnvironmentalAllergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all environmental allergies
exports.getAllEnvironmentalAllergies = async (req, res) => {
  try {
    const environmentalAllergies = await EnvironmentalAllergies.find();
    res.status(200).json(environmentalAllergies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific environmental allergy by ID
exports.getEnvironmentalAllergyById = async (req, res) => {
  try {
    const environmentalAllergy = await EnvironmentalAllergies.findById(req.params.id);
    if (!environmentalAllergy) {
      return res.status(404).json({ error: 'Environmental allergy not found' });
    }
    res.status(200).json(environmentalAllergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an environmental allergy by ID
exports.updateEnvironmentalAllergyById = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedEnvironmentalAllergy = await EnvironmentalAllergies.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedEnvironmentalAllergy) {
      return res.status(404).json({ error: 'Environmental allergy not found' });
    }
    res.status(200).json(updatedEnvironmentalAllergy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an environmental allergy by ID
exports.deleteEnvironmentalAllergyById = async (req, res) => {
  try {
    const deletedEnvironmentalAllergy = await EnvironmentalAllergies.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEnvironmentalAllergy) {
      return res.status(404).json({ error: 'Environmental allergy not found' });
    }
    res.status(200).json({ message: 'Environmental allergy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
