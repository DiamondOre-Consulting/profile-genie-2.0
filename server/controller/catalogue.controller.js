import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../model/auth.model.js";
import CatalogueOwner from "../model/catalogueModel/catalogueOwner.model.js";
import AppError from "../utils/error.utils.js";
import Catalogue from "../model/catalogueModel/catalogue.model.js";
import { multipleFileUpload } from "../utils/fileUpload.utils.js";
import mongoose from "mongoose";
import CatalogueProduct from "../model/catalogueModel/catalogueProduct.model.js";
import cloudinary from "cloudinary";
import { getCatalogueActiveMail, getCatalogueInactiveMail, getCataloguePaidMail, getQuotationMail, sendQuotationRes } from "../utils/cronMessages.js";

import sendMail from "../utils/mail.utils.js";

const createCatalogueOwner = asyncHandler(async (req, res) => {

    const { fullName, email, password, mapLink, emailList, phoneList, address, whatsappNo } = req.body

    const uniqueUser = await User.findOne({ email })
    if (uniqueUser) {
        throw new AppError("User already exists", 400)
    }

    const user = await User.create({ fullName, email, password, role: "CATALOGUE_OWNER" })

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

const editCatalogueOwner = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { mapLink, fullName, email, emailList, phoneList, address, whatsappNo } = req.body

    const catalogueOwner = await CatalogueOwner.findById(id)

    if (!catalogueOwner) {
        throw new AppError("Catalogue owner not found!", 404)
    }

    const user = await User.findById(catalogueOwner.authAccount)

    if (!user) {
        throw new AppError("User not found!", 404)
    }

    const uniqueUser = await User.findOne({ email })
    if (uniqueUser) {
        if (uniqueUser._id.toString() !== user._id.toString()) {
            throw new AppError("Registered email already exists", 400)
        }
    }

    user.email = email
    user.fullName = fullName
    await user.save({ validateBeforeSave: false })

    const updatedCatalogueOwner = await CatalogueOwner.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                mapLink,
                emailList,
                phoneList,
                address,
                whatsappNo
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedCatalogueOwner) {
        throw new AppError("Something went wrong in registering!", 400)
    }

    return res.status(200).json({
        success: true,
        CatalogueOwner: updatedCatalogueOwner,
        message: "Catalogue owner updated successfully!"
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
        message: "Catalogue created successfully"
    })
})

const editCatalogue = asyncHandler(async (req, res) => {
    const { formData } = req.body
    const { id } = req.params
    const { name, catalogueOwner, userName, tagline, description, isActive, category, backgroundColor, textColor, paidDate } = JSON.parse(formData)

    const catalogue = await Catalogue.findById(id)

    if (!catalogue) {
        throw new AppError("Catalogue not found!", 400)
    }

    const uniqueCatalogue = await Catalogue.findOne({ userName })
    if (uniqueCatalogue) {
        if (uniqueCatalogue.userName === userName && uniqueCatalogue._id.toString() !== id) {
            throw new AppError("Username already exists!", 400)
        }
    }
    console.log(paidDate)
    catalogue.name = name
    catalogue.userName = userName
    catalogue.tagline = tagline
    catalogue.description = description
    catalogue.isActive = isActive
    catalogue.category = category
    catalogue.backgroundColor = backgroundColor
    catalogue.textColor = textColor
    catalogue.paidDate = paidDate
    const today = new Date()
    const oneYearBefore = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

    catalogue.isPaid = catalogue.paidDate < oneYearBefore ? false : true

    let uploadedFiles = []

    console.log(req.files)

    if (req?.files) {
        uploadedFiles = await multipleFileUpload(req?.files);
    }


    uploadedFiles.forEach(file => {
        if (file.uniqueId === "heroImage") {
            catalogue.heroImage.url = file.result.secure_url;
            catalogue.heroImage.publicId = file.result.public_id;
        } else if (file.uniqueId === "logo") {
            catalogue.logo.url = file.result.secure_url;
            catalogue.logo.publicId = file.result.public_id;
        }
    });

    const updatedCatalogue = await catalogue.save()
    console.log(updatedCatalogue)
    return res.status(200).json({
        success: true,
        Catalogue: updatedCatalogue,
        message: "Catalogue updated successfully!"
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
        message: "Catalogue detail created successfully"
    })
})

const editProduct = asyncHandler(async (req, res) => {
    const { formData } = req.body
    const { id } = req.params
    const { category, name, HSNCode, price, ownerId, stock, moq, description, image } = JSON.parse(formData)
    const product = await CatalogueProduct.findById(id)

    if (!product) {
        throw new AppError("Product not found!", 400)
    }

    product.category = category
    product.name = name
    product.HSNCode = HSNCode
    product.price = price
    product.stock = stock
    product.moq = moq
    product.description = description

    let productImages = []

    if (req?.files) {
        productImages = await multipleFileUpload(req?.files)
    }

    image?.forEach(image => {
        let existingImage = product?.image?.find(b => b.uniqueId === image.uniqueId);
        if (!existingImage) {
            const uploadedFile = productImages.find(uf => uf.uniqueId === image.uniqueId);
            if (uploadedFile) {
                product.image.push({ ...image, url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id });
            }
        } else {
            const uploadedFile = productImages.find(uf => uf.uniqueId === existingImage.uniqueId);
            if (uploadedFile) {
                existingImage.uniqueId = image.uniqueId;
                existingImage.url = uploadedFile.result.secure_url
                existingImage.publicId = uploadedFile.result.public_id
            };
        }
    });

    product.image = product?.image?.filter(productData => {
        console.log(productData)
        const isExistingData = image.some(data => data.uniqueId === productData.uniqueId);
        if (!isExistingData && productData.publicId) {
            cloudinary.v2.uploader.destroy(productData.publicId);
        }
        return isExistingData;
    });

    await product.save()

    res.status(200).json({
        success: true,
        data: product,
        message: "Product updated successfully"
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

    const product = await CatalogueProduct.findByIdAndDelete(id)

    if (!product) {
        throw new AppError("Product not found!", 400)
    }

    res.status(200).json({
        success: true,
        data: product,
        message: "Product deleted successfully"
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
                            category: "$$product.category",
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



    const productWithoutCategory = await Catalogue.aggregate([
        { $match: { userName: userName } },
        { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "catalogueproducts",
                localField: "product",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
        {
            $addFields: {
                productCategory: {
                    $cond: {
                        if: { $isArray: "$productDetails.category" },
                        then: "$productDetails.category",
                        else: []
                    }
                },
                filteredCategories: {
                    $filter: {
                        input: {
                            $cond: {
                                if: { $isArray: "$productDetails.category" },
                                then: "$productDetails.category",
                                else: []
                            }
                        },
                        as: "cat",
                        cond: {
                            $and: [
                                { $eq: ["$$cat.id", ""] },
                                { $eq: ["$$cat.text", ""] }
                            ]
                        }
                    }
                }
            }
        },
        {
            $match: {
                $expr: {
                    $eq: [{ $size: { $ifNull: ["$filteredCategories", []] } }, { $size: { $ifNull: ["$productDetails.category", []] } }]
                }
            }
        },
        { $unset: "filteredCategories" },
        {
            $project: {
                _id: 1,
                userName: 1,
                productDetails: 1,
            }
        },

    ]);



    const uncategorisedProducts = [
        {
            id: "uncategorised",
            text: "Uncategorised",
            products: productWithoutCategory
        }
    ]

    return res.status(200).json({
        success: true,
        categorisedProducts,
        uncategorisedProducts
    })

})

const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await CatalogueProduct.findById(id)

    if (!product) {
        throw new AppError("Product not found!", 400)
    }

    console.log(product)

    return res.status(200).json({
        success: true,
        data: product
    })
})

const getAllCatalogues = asyncHandler(async (req, res) => {

    const { search, filter } = req.query
    console.log(search)


    const pipeline = [
        {
            $lookup: {
                from: "catalogueowners",
                localField: "catalogueOwner",
                foreignField: "_id",
                as: "ownerDetails",
            }
        },
        {
            $unwind: {
                path: "$ownerDetails",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "ownerDetails.authAccount",
                foreignField: "_id",
                as: "ownerDetails.authAccountDetails",
            }
        },
        {
            $unwind: {
                path: "$ownerDetails.authAccountDetails",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $match: {
                ...(search && {
                    $or: [
                        { userName: { $regex: search, $options: "i" } },
                        { name: { $regex: search, $options: "i" } },
                        { "ownerDetails.authAccountDetails.fullName": { $regex: search, $options: "i" } },
                        { "ownerDetails.authAccountDetails.email": { $regex: search, $options: "i" } },
                        { "ownerDetails.phoneList.phone": { $regex: search, $options: "i" } },
                    ],
                }),
                ...(filter && ({ isActive: (filter === "active" || (filter === "inactive" && filter === "active")) } || { isPaid: filter === "unpaid" && false })),

            },
        },


        {
            $project: {
                _id: 1,
                name: 1,
                images: 1,
                isActive: 1,
                isPaid: 1,
                userName: 1,
                paidDate: 1,
                logo: 1,
                "ownerDetails._id": 1,
                "ownerDetails.phoneList": 1,
                "ownerDetails.whatsappNo": 1,
                "ownerDetails.authAccountDetails.fullName": 1,
                "ownerDetails.authAccountDetails.email": 1
            },
        },
    ];



    const portfolios = await Catalogue.aggregate(pipeline);



    res.status(200).json({
        success: true,
        data: portfolios,
    })
})

const getSingleCatalogue = asyncHandler(async (req, res) => {
    const { userName } = req.params
    console.log(userName)
    const catalogue = await Catalogue.findOne({
        $or: [
            { "catalogueOwner.authAccount": userName },
            { userName: userName },
        ]
    }).populate({
        path: "catalogueOwner",
        populate: {
            path: "authAccount",
        },
    }).populate({
        path: "metaDetails",
    })

    console.log(catalogue)

    if (!catalogue) {
        throw new AppError("Catalogue not found!", 400)
    }

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
                            category: "$$product.category",
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

    const productWithoutCategory = await Catalogue.aggregate([
        { $match: { userName: userName } },
        { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "catalogueproducts",
                localField: "product",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
        {
            $addFields: {
                productCategory: {
                    $cond: {
                        if: { $isArray: "$productDetails.category" },
                        then: "$productDetails.category",
                        else: []
                    }
                },
                filteredCategories: {
                    $filter: {
                        input: {
                            $cond: {
                                if: { $isArray: "$productDetails.category" },
                                then: "$productDetails.category",
                                else: []
                            }
                        },
                        as: "cat",
                        cond: {
                            $and: [
                                { $eq: ["$$cat.id", ""] },
                                { $eq: ["$$cat.text", ""] }
                            ]
                        }
                    }
                }
            }
        },
        {
            $match: {
                $expr: {
                    $eq: [{ $size: { $ifNull: ["$filteredCategories", []] } }, { $size: { $ifNull: ["$productDetails.category", []] } }]
                }
            }
        },
        { $unset: "filteredCategories" },
        {
            $project: {
                _id: 1,
                userName: 1,
                productDetails: 1,
            }
        },

    ]);

    const uncategorisedProducts = [
        {
            id: "uncategorised",
            text: "Uncategorised",
            products: productWithoutCategory
        }
    ]

    res.status(200).json({
        success: true,
        data: catalogue,
        uncategorisedProducts,
        categorisedProducts,
        message: "Catalogue found successfully"
    })
})

const sendQuotation = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, email, phone, message: quotationMessage, products } = req.body
    console.log(1)
    const catalogue = await Catalogue.findById(id)
        .populate({
            path: "catalogueOwner",
            populate: {
                path: "authAccount",
            },
        })
    console.log(catalogue)
    if (!catalogue) {
        throw new AppError("OOPS! Something went wrong.", 400)
    }

    const { subject, message } = getQuotationMail(req.body, products, catalogue?.name, catalogue?.logo?.url)

    await sendMail(catalogue?.catalogueOwner?.authAccount?.email, subject, message)

    const { subject: quotationResSubject, message: quotationResMessage } = sendQuotationRes(req.body, products, catalogue?.name, catalogue?.logo?.url)

    await sendMail(email, quotationResSubject, quotationResMessage, catalogue?.name)

    res.status(200).json({
        success: true,
        message: "Quotation sent successfully"
    })

})

const recycleCatalogue = asyncHandler(async (req, res) => {
    const { id } = req.params

    const catalogue = await Catalogue.findById(id)

    if (!catalogue) {
        throw new AppError("Catalogue not found!", 400)
    }

    catalogue.isRecycled = true
    catalogue.isActive = false

    await catalogue.save()

    res.status(200).json({
        success: true,
        data: catalogue,
        message: "Catalogue recycled successfully"
    })
})

const restoreCatalogue = asyncHandler(async (req, res) => {
    const { id } = req.params

    const catalogue = await Catalogue.findById(id)

    if (!catalogue) {
        throw new AppError("Catalogue not found!", 400)
    }

    catalogue.isRecycled = false
    catalogue.isActive = true

    await catalogue.save()

    res.status(200).json({
        success: true,
        data: catalogue,
        message: "Catalogue restored successfully"
    })
})

const deleteCatalogue = asyncHandler(async (req, res) => {

    const { id } = req.params

    const catalogue = await Catalogue.findById(id)

    if (!catalogue) {
        throw new AppError("Catalogue not found!", 400)
    }

    if (catalogue.product) {
        const productIds = catalogue.product.map(product => product.toString());
        const catalogueProducts = await CatalogueProduct.find({ _id: { $in: productIds } });
        catalogueProducts.forEach(product => {
            product.image.forEach(image => {
                if (image.publicId) {
                    cloudinary.v2.uploader.destroy(image.publicId).catch(err => { });
                }
            })
        });
        await CatalogueProduct.deleteMany({ _id: { $in: productIds } });
    }

    if (catalogue.catalogueOwner) await CatalogueOwner.findByIdAndDelete(catalogue.catalogueOwner)
    if (catalogue.metaDetails) await MetaData.findByIdAndDelete(catalogue.metaDetails)

    await Catalogue.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Catalogue deleted successfully"
    })

})

const updateStatusActive = asyncHandler(async (req, res) => {
    const { id } = req.params

    const catalogue = await Catalogue.findById(id).populate({
        path: "catalogueOwner",
        populate: {
            path: "authAccount",
        },
    })

    if (!catalogue) {
        throw new AppError("Catalogue not found!", 400)
    }

    catalogue.isActive = !catalogue.isActive

    await catalogue.save()

    const { subject, message } = getCatalogueInactiveMail(catalogue?.catalogueOwner?.authAccount?.fullName, catalogue?.userName, catalogue?.name)
    const { subject: activeSubject, message: activeMessage } = getCatalogueActiveMail(catalogue?.catalogueOwner?.authAccount?.fullName, catalogue?.userName, catalogue?.name)

    if (catalogue.isActive) {
        await sendMail(catalogue?.catalogueOwner?.authAccount?.email, activeSubject, activeMessage)
    } else {
        await sendMail(catalogue?.catalogueOwner?.authAccount?.email, subject, message)
    }

    res.status(200).json({
        success: true,
        data: catalogue,
        message: "Catalogue status updated successfully"
    })
})

const updateStatusPaid = asyncHandler(async (req, res) => {
    const { id } = req.params

    const catalogue = await Catalogue.findById(id).populate({
        path: "catalogueOwner",
        populate: {
            path: "authAccount",
        },
    })

    if (!catalogue) {
        throw new AppError("Catalogue not found!", 404)
    }

    catalogue.isPaid = true
    catalogue.isActive = catalogue.isPaid ? true : false
    catalogue.paidDate = catalogue.isPaid ? new Date().toISOString().split("T")[0] + "T00:00:00.000Z" : catalogue.paidDate

    await catalogue.save()

    const { confirmMailSubject, confirmMailMessage } = getCataloguePaidMail(catalogue?.catalogueOwner?.authAccount?.fullName, catalogue?.userName, catalogue?.name)

    await sendMail(catalogue?.catalogueOwner?.authAccount?.email, confirmMailSubject, confirmMailMessage)

    res.status(200).json({
        success: true,
        data: catalogue,
        message: "Catalogue marked as paid"
    })
})

const getAllRecycledCatalogues = asyncHandler(async (req, res) => {

    const { search, filter } = req.query


    const pipeline = [
        {
            $lookup: {
                from: "catalogueowners",
                localField: "catalogueOwner",
                foreignField: "_id",
                as: "ownerDetails",
            }
        },
        {
            $unwind: {
                path: "$ownerDetails",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "ownerDetails.authAccount",
                foreignField: "_id",
                as: "ownerDetails.authAccountDetails",
            }
        },
        {
            $unwind: {
                path: "$ownerDetails.authAccountDetails",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $match: {
                isRecycled: true
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                images: 1,
                isActive: 1,
                isPaid: 1,
                userName: 1,
                paidDate: 1,
                logo: 1,
                "ownerDetails._id": 1,
                "ownerDetails.phoneList": 1,
                "ownerDetails.whatsappNo": 1,
                "ownerDetails.authAccountDetails.fullName": 1,
                "ownerDetails.authAccountDetails.email": 1
            },
        },
    ];



    const portfolios = await Catalogue.aggregate(pipeline);



    res.status(200).json({
        success: true,
        data: portfolios,
    })
})

export {
    createCatalogueOwner,
    createCatalogue,
    getAllCategories,
    addProduct,
    getCategorisedProducts,
    deleteProduct,
    editProduct,
    getSingleCatalogue,
    getAllCatalogues,
    editCatalogueOwner,
    editCatalogue,
    getSingleProduct,
    sendQuotation,
    recycleCatalogue,
    restoreCatalogue,
    deleteCatalogue,
    updateStatusActive,
    updateStatusPaid,
    getAllRecycledCatalogues
}