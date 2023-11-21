const TermCondition = require('../models/term_condtion_model');

// Create a new term condition
exports.createTermCondition = async (req, res) => {
  try {
    const { termcondition } = req.body;
    const newTermCondition = new TermCondition({ termcondition });
    const savedTermCondition = await newTermCondition.save();
    res.status(201).json(savedTermCondition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all term conditions
exports.getAllTermConditions = async (req, res) => {
    try {
      const termConditions = await TermCondition.find();
      res.status(200).json( {data:termConditions});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // update term condtion
  exports.updateTermConditionById = async (req, res) => {
    try {
      const { termcondition } = req.body;
      const updatedTermCondition = await TermCondition.findByIdAndUpdate(
        req.params.id,
        { termcondition },
        { new: true }
      );
      if (!updatedTermCondition) {
        return res.status(404).json({ error: 'Term condition not found' });
      }
      res.status(200).json(updatedTermCondition);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a term condition by ID
  exports.deleteTermConditionById = async (req, res) => {
    try {
      const deletedTermCondition = await TermCondition.findByIdAndDelete(
        req.params.id
      );
      if (!deletedTermCondition) {
        return res.status(404).json({ error: 'Term condition not found' });
      }
      res.status(200).json({ message: 'Term condition deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };