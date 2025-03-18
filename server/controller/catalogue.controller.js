import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../model/auth.model.js";
import CatalogueOwner from "../model/catalogueModel/catalogueOwner.model.js";
import AppError from "../utils/error.utils.js";
import Catalogue from "../model/catalogueModel/catalogue.model.js";
import { multipleFileUpload } from "../utils/fileUpload.utils.js";

const createCatalogueOwner = asyncHandler(async (req, res) => {

    const { fullName, email, password, mapLink, emailList, phoneList, address, whatsappNo, role } = req.body

    // if (req?.user?.role !== "SUPERADMIN") {
    //     throw new AppError("You are not authorized!", 400)
    // }

    const uniqueUser = await User.findOne({ email })
    if (uniqueUser) {
        throw new AppError("User already exists", 400)
    }

    const user = await User.create({ fullName, email, password, role })

    await user.save({ validateBeforeSave: false })

    if (!user) {
        throw new AppError("Something went wrong in registering!", 400)
    }

    const createCatalogueOwner = await CatalogueOwner.create({
        authAccount: user._id,
        mapLink,
        emailList,
        phoneList,
        address,
        whatsappNo,
    })

    if (!createCatalogueOwner) {
        throw new AppError("Something went wrong in registering!", 400)
    }

    return res.status(200).json({
        success: true,
        CatalogueOwner: createCatalogueOwner,
        message: "Catalogue owner created successfully!"
    })

})

const createCatalogue = asyncHandler(async (req, res) => {
    const { formData, catalogueOwner } = req.body
    const { name, userName, tagline, description, isActive, category, backgroundColor, textColor, paidDate } = JSON.parse(formData)

    const uniqueCatalogue = await Catalogue.findOne({ userName })

    if (uniqueCatalogue) {
        throw new AppError("Username already exists!", 400)
    }

    const today = new Date()
    const oneYearBefore = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

    const catalogue = new Catalogue({
        name,
        userName,
        tagline,
        isPaid: paidDate ? true : false,
        isActive,
        description,
        paidDate: paidDate,
        isPaid: paidDate < oneYearBefore ? false : true,
        backgroundColor,
        textColor,
        category,
        catalogueOwner,
        heroImage: {
            publicId: "",
            url: ""
        },
        logo: {
            publicId: "",
            url: ""
        }
    })

    if (!catalogue) {
        throw new AppError("Something went wrong!", 400)
    }

    let uploadedFiles = []

    console.log(req.files)

    if (req?.files) {
        uploadedFiles = await multipleFileUpload(req?.files);
    }


    uploadedFiles.forEach(file => {
        console.log(file)
        if (file.uniqueId === "heroImage") {
            catalogue.heroImage.url = file.result.secure_url;
            catalogue.heroImage.publicId = file.result.public_id;
        } else if (file.uniqueId === "logo") {
            catalogue.logo.url = file.result.secure_url;
            catalogue.logo.publicId = file.result.public_id;
        }
    });

    await catalogue.save()

    res.status(200).json({
        success: true,
        data: catalogue,
        message: "Portfolio created successfully"
    })
})

export {
    createCatalogueOwner,
    createCatalogue
}