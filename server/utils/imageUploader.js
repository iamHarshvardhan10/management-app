import cloudinary from 'cloudinary'

const uploadImageToClodinary = async (file, folder, height, quality) => {
    const options = { folder };

    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    options.resource_type = 'auto';
    console.log("OPTIONS", options)
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

export default uploadImageToClodinary;