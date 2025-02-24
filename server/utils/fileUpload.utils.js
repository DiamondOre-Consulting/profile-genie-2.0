import fs from 'fs/promises'
import cloudinary from 'cloudinary'
import AppError from './error.utils.js'

const avatarUpload = async (file, publicId = "") => {
    try {

        if (publicId) {
            await cloudinary.v2.uploader.destroy(publicId)
        }

        const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: 'honda',
            width: 250,
            height: 250,
            gravity: 'faces',
            crop: 'fill',
        })
        if (result) {

            fs.rm(`uploads/${file.filename}`)
            return result
        }
    }
    catch (err) {
        throw new AppError('File can not get uploaded', 500)
    }
}

const fileUpload = async (file, publicId = "") => {
    try {

        if (publicId) {
            await cloudinary.v2.uploader.destroy(publicId)
        }

        const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: 'honda',
        })
        if (result) {
            fs.rm(`uploads/${file.filename}`)
            return result
        }

    }
    catch (err) {
        throw new AppError('File can not get uploaded', 500)
    }
}

const multipleFileUpload = async (files, publicId = "") => {
    try {
        const uploadedFiles = [];
        for (const file of Object.values(files)) {
            console.log(1)
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'honda'
            });
            console.log(2)
            const fileNameWithExtension = file.originalname
            const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.')

            uploadedFiles.push({ uniqueId: fileName, result: result });
            console.log(3)
            fs.rm(`uploads/${fileNameWithExtension}`)
            console.log(4)
        }
        console.log(5)
        return uploadedFiles
    }
    catch (err) {
        console.log("sdv", err)
        throw new AppError('File can not get uploaded', 500)
    }
}

export { avatarUpload, fileUpload, multipleFileUpload }