const Hospital = require('../models/hospital');


const JWT_SECRET = "VERYsecret123";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});
exports.createHospital = async (req, res) => {
    const { fullname, email, phonenumber,address,branch} = req.body;
  
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
  
    const hospital = await Hospital({
        fullname,
        email,
        phonenumber,
        address, 
        branch,
      avatar: result.secure_url
    });
    await hospital.save();
    res.json({
      success: true,
      hospital
    });
  };
// exports.createHospital = async (req, res)=>{
//     const {fullname, email, phonenumber,address,branch} = req.body;
//        const hospital = await Hospital({
//         fullname,
//         email,
//         phonenumber,
//         address, 
//         branch
//        });
//        await hospital .save();
//        res.json({
//         success:true,hospital
//        });
// } ;

