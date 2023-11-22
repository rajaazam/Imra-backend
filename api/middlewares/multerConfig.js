const multer = require("multer");
const fs = require("fs");
const path = require("path");

var storage = multer.diskStorage({
    destination: "./assets/documents",
    filename: (req, file, cb) => {
        //const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname);
    },
});

var upload = multer({ storage });

module.exports = { upload, storage };
