const router = require("express").Router();
const { createDocument } = require("../controllers/document_controller");
const { upload } = require("../middlewares/multerConfig");

router.post("/create-document", upload.single("file"), createDocument);

module.exports = router;
