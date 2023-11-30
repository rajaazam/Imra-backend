const express = require("express");
const router = express.Router();
const {
    createTermCondition,
    getAllTermConditions,
    updateTermConditionById,
    deleteTermConditionById 
  }= require('../controllers/term_condition_controller')


router.post("/post-term-condition",  createTermCondition),
router.get("/get-term-condition",  getAllTermConditions),
router.patch("/update-term-condition/:id",  updateTermConditionById),
router.delete('/delete-term-condition/:id', deleteTermConditionById)

module.exports = router;