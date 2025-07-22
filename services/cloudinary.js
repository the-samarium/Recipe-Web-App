const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});

const uploadResult = async (localPath) => {
    try {
        const result = await cloudinary.uploader.upload(localPath, {
            public_id: 'shoes',
            resource_type: 'image'
        });
        console.log('File uploaded successfully:', result.secure_url);
        // Optionally delete local file after upload
        fs.unlinkSync(localPath);
        return result;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localPath); // Remove the locally saved file if upload fails
        throw error;
    }
};

module.exports = {
    uploadResult
};

//Cloud upload not used , kept for future