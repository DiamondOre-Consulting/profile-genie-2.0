import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../model/auth.model.js";
import CatalogueOwner from "../model/catalogueModel/catalogueOwner.model.js";
import AppError from "../utils/error.utils.js";
import Catalogue from "../model/catalogueModel/catalogue.model.js";
import { multipleFileUpload } from "../utils/fileUpload.utils.js";
import mongoose from "mongoose";
import CatalogueProduct from "../model/catalogueModel/catalogueProduct.model.js";

const createCatalogueOwner = asyncHandler(async (req, res) => {

    const { fullName, email, password, mapLink, emailList, phoneList, address, whatsappNo, role } = req.body

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
    const { formData } = req.body
    const { name, catalogueOwner, userName, tagline, description, isActive, category, backgroundColor, textColor, paidDate } = JSON.parse(formData)
    console.log(req.body)
    console.log(catalogueOwner)

    const uniqueCatalogue = await Catalogue.findOne({
        $or: [
            { userName: userName },
            { catalogueOwner: catalogueOwner }
        ]
    })

    console.log(uniqueCatalogue)

    if (uniqueCatalogue) {
        if (uniqueCatalogue.userName === userName) {
            throw new AppError("Username already exists!", 400)
        } else if (uniqueCatalogue.catalogueOwner === catalogueOwner) {
            throw new AppError("Catalogue is already created for this owner!", 400)
        }
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

const getAllCategories = asyncHandler(async (req, res) => {
    const { id } = req.params

    const allCategories = await Catalogue.aggregate([
        {
            $match: { catalogueOwner: new mongoose.Types.ObjectId(id) }
        },
        {
            $unwind: "$category"
        },
        {
            $project: {
                id: "$category.id",
                text: "$category.text",
                _id: 0
            }
        }
    ]);


    return res.status(200).json({
        success: true,
        allCategories
    })
})

const addProduct = asyncHandler(async (req, res) => {
    const { formData } = req.body

    const { category, name, HSNCode, price, ownerId, stock, moq, description, image } = JSON.parse(formData)

    const uniqueProduct = await CatalogueProduct.findOne({ owner: ownerId, HSNCode })


    if (uniqueProduct) {
        throw new AppError("HSN code already exists!", 400)
    }

    const product = new CatalogueProduct({
        category,
        owner: ownerId,
        name,
        HSNCode,
        price,
        stock,
        moq,
        description
    })

    let productImages = []

    console.log(image)
    console.log(req.files)
    if (req?.files) {
        productImages = await multipleFileUpload(req?.files)
    }
    console.log(productImages)
    image?.forEach(image => {
        let existingImage = product?.image?.find(b => b.uniqueId === image.uniqueId);
        if (!existingImage) {
            const uploadedFile = productImages.find(uf => uf.uniqueId === image.uniqueId);
            if (uploadedFile) {
                console.log(44)
                console.log(uploadedFile)
                product.image.push({ ...image, url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id });
            }
        } else {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === existingImage.uniqueId);
            if (uploadedFile) {
                existingImage.uniqueId = image.uniqueId;
                existingImage.url = uploadedFile.result.secure_url
                existingImage.publicId = uploadedFile.result.public_id
            };
        }
    });

    console.log(product)

    await product.save()

    if (!product) {
        throw new AppError("Product not created!", 400)
    }

    const catalogueDetail = await Catalogue.findOne({ catalogueOwner: ownerId })

    catalogueDetail.product.push(product._id)

    const portfolioDetail = await catalogueDetail.save()

    res.status(200).json({
        success: true,
        data: portfolioDetail,
        message: "Portfolio detail created successfully"
    })
})

const getCategorisedProducts = asyncHandler(async (req, res) => {

    const { userName } = req.params


    const categorisedProducts = await Catalogue.aggregate([
        {
            $match: { userName: userName }
        },
        {
            $unwind: "$category"
        },
        {
            $lookup: {
                from: "catalogueproducts",
                localField: "category.id",
                foreignField: "category.id",
                as: "category.products"
            }
        },
        {
            $project: {
                id: "$category.id",
                text: "$category.text",
                products: {
                    $map: {
                        input: "$category.products",
                        as: "product",
                        in: {
                            id: "$$product._id",
                            name: "$$product.name",
                            HSNCode: "$$product.HSNCode",
                            price: "$$product.price",
                            stock: "$$product.stock",
                            moq: "$$product.moq",
                            description: "$$product.description",
                            image: "$$product.image"
                        }
                    }
                },
                _id: 0
            }
        }
    ])


    return res.status(200).json({
        success: true,
        categorisedProducts
    })

})

export {
    createCatalogueOwner,
    createCatalogue,
    getAllCategories,
    addProduct,
    getCategorisedProducts
}