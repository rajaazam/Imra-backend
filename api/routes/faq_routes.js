const express = require("express");
const router = express.Router();

const {
    createFAQ,
    getAllFAQs,
    getFAQById,
    updateFAQById,
    deleteFAQById
}=require('../controllers/faq_controllers');


router.post('/post-faq',createFAQ);
router.get('/get-faq',getAllFAQs);
router.delete('/delete-faq/:id', deleteFAQById);

module.exports = router;