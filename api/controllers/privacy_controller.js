const Privacy = require('../models/privacy_model');

// Create a new privacy policy
exports.createPrivacy = async (req, res) => {
  try {
    const { privacy } = req.body;
    const newPrivacy = new Privacy({ privacy });
    const savedPrivacy = await newPrivacy.save();
    res.status(201).json(savedPrivacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all privacy policies
exports.getAllPrivacy = async (req, res) => {
  try {
    const privacyPolicies = await Privacy.find();
    res.status(200).json({'data':privacyPolicies});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific privacy policy by ID
exports.getPrivacyById = async (req, res) => {
  try {
    const privacyPolicy = await Privacy.findById(req.params.id);
    if (!privacyPolicy) {
      return res.status(404).json({ error: 'Privacy policy not found' });
    }
    res.status(200).json(privacyPolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a privacy policy by ID
exports.updatePrivacyById = async (req, res) => {
  try {
    const { privacy } = req.body;
    const updatedPrivacy = await Privacy.findByIdAndUpdate(
      req.params.id,
      { privacy },
      { new: true }
    );
    if (!updatedPrivacy) {
      return res.status(404).json({ error: 'Privacy policy not found' });
    }
    res.status(200).json(updatedPrivacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a privacy policy by ID
exports.deletePrivacyById = async (req, res) => {
  try {
    const deletedPrivacy = await Privacy.findByIdAndDelete(req.params.id);
    if (!deletedPrivacy) {
      return res.status(404).json({ error: 'Privacy policy not found' });
    }
    res.status(200).json({ message: 'Privacy policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
