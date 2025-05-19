const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, res) => "png",
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});

const cloudinaryFileUploader = multer({ storage: storage });

module.exports = {
  cloudinaryFileUploader,
};
