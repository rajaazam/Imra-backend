const  Document = require('../models/documents');
const cloudinary = require('cloudinary').v2;
const User= require('../models/user')    
cloudinary.config({ 
  cloud_name: 'dzq1h0xyu', 
  api_key: '345126432123499', 
  api_secret: 'cqCvcU_hqshoESszVszEnB5-D_8' ,
  resource_type: 'auto' 
});

exports.createDocument = async (req, res) => {
  try {
    const { userId, doc_name, description, document } = req.body;

    // Assuming you have a 'userId' field in the request body to specify the user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID not provided" });
    }

    // Check if the user with the provided ID exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload the document to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });
   

    // Create a new Document with the user reference
    const doc = new Document({
      doc_name,
      description,
      document: result.secure_url,
      user: user._id,
    });

    // Save the document
    await doc.save();

    // Return both the user ID and the document record in the response
    res.status(201).json({
      userId: user._id,
      document: doc.toJSON(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.createDocument = async (req, res) => {

//     const { doc_name, description, document,} = req.body;
//     if (!req.file) {
//       return res.status(400).json({ error: "No image file provided" });
//   }
//     const result = await cloudinary.uploader.upload(req.file.path,{
//         resource_type: 'auto', 
//     });
//     console.log(result)
   
//     const doc = await Document({
//         doc_name,
//         description, 
//         document: result.secure_url
//     });
//     await doc.save();
//     res.json({
//         success: true,
//         doc,
//     });
//   };

