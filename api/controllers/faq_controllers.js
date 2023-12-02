const FAQ = require('../models/faq_model');

// Create a new FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { faqquestion, faqanswers } = req.body;
    const newFAQ = new FAQ({ faqquestion, faqanswers });
    const savedFAQ = await newFAQ.save();
    res.status(201).json(savedFAQ);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({ data: faqs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific FAQ by ID
exports.getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an FAQ by ID
exports.updateFAQById = async (req, res) => {
  try {
    const { faqquestion, faqanswers } = req.body;
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      { faqquestion, faqanswers },
      { new: true }
    );
    if (!updatedFAQ) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an FAQ by ID
exports.deleteFAQById = async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
    if (!deletedFAQ) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
