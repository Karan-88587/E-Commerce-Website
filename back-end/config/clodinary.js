const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

const storage = new multer.memoryStorage();

const upload = multer({ storage });

async function uploadImageToCloudinary(file) {
    try {
        const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
        return result;
    } catch (error) {
        console.log('Error uploading image to Cloudinary :', error);
        throw error;
    }
}

async function deleteImageFromCloudinary(imageUrl) {
    try {
        const segments = imageUrl.split('/');
        const fileNameWithExtension = segments[segments.length - 1];
        const publicId = fileNameWithExtension.split('.')[0]; // remove extension

        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted from Cloudinary: ${publicId}`);
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        throw error;
    }
}
module.exports = { upload, uploadImageToCloudinary, deleteImageFromCloudinary };