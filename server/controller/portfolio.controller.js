import MetaData from "../model/portfolioModel/metaData.model.js"
import Portfolio from "../model/portfolioModel/portfolio.model.js"
import PortfolioContact from "../model/portfolioModel/portfolioContact.model.js"
import PortfolioDetail from "../model/portfolioModel/portfolioDetail.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import AppError from "../utils/error.utils.js"
import { multipleFileUpload } from "../utils/fileUpload.utils.js"
import cloudinary from "cloudinary"

const createPortfolio = asyncHandler(async (req, res) => {
    console.log(2)
    const { formData } = req.body
    const { fullName, userName, phoneNumber, email, tagline, about, shortDescription, isActive, isPaid } = JSON.parse(formData)

    const uniquePortfolio = await Portfolio.findOne({ userName })

    if (uniquePortfolio) {
        throw new AppError("Username already exists!", 400)
    }

    console.log(1)

    const portfolio = new Portfolio({
        fullName,
        userName,
        tagline,
        phoneNumber,
        email,
        isPaid,
        isActive,
        shortDescription,
        paidDate: isPaid ? new Date() : null,
        about,
        backgroundImage: {
            publicId: "",
            url: ""
        },
        image: {
            publicId: "",
            url: ""
        },
        logo: {
            publicId: "",
            url: ""
        }
    })

    if (!portfolio) {
        throw new AppError("Something went wrong!", 400)
    }

    let uploadedFiles = []

    console.log(req.files)

    if (req?.files) {
        uploadedFiles = await multipleFileUpload(req?.files);
    }

    uploadedFiles.forEach(file => {
        console.log(2)
        if (file.uniqueId === "image") {
            console.log(file)
            portfolio.image.url = file.result.secure_url;
            portfolio.image.publicId = file.result.public_id;
        } else if (file.uniqueId === "backgroundImage") {
            portfolio.backgroundImage.url = file.result.secure_url;
            portfolio.backgroundImage.publicId = file.result.public_id;

        } else if (file.uniqueId === "logo") {
            portfolio.logo.url = file.result.secure_url;
            portfolio.logo.publicId = file.result.public_id;
        }
    });

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolio,
        message: "Portfolio created successfully"
    })
})

const updatePortfolio = asyncHandler(async (req, res) => {

    const { formData } = req.body
    const { fullName, userName, phoneNumber, email, tagline, about, isActive, isPaid, shortDescription } = JSON.parse(formData)
    const { id } = req.params

    const portfolio = await Portfolio.findById(id)

    if (!portfolio) {
        console.log(1)
        throw new AppError("Portfolio not found!", 400)
    }

    if (portfolio.userName !== userName) {
        console.log(portfolio.userName, userName)
        const uniquePortfolio = await Portfolio.findOne({ userName })
        console.log("object")
        if (!uniquePortfolio && portfolio._id.toString() !== id) {
            console.log(2)
            throw new AppError("Username already exists!", 400)
        }
    }

    console.log(isActive)

    portfolio.fullName = await fullName
    portfolio.userName = await userName
    portfolio.tagline = await tagline
    portfolio.phoneNumber = await phoneNumber
    portfolio.email = await email
    portfolio.about = await about
    portfolio.isActive = await isActive
    portfolio.isPaid = await isPaid
    portfolio.shortDescription = await shortDescription

    let uploadedFiles = []
    if (req?.files) {
        uploadedFiles = await multipleFileUpload(req?.files);
    }

    uploadedFiles.forEach(file => {
        if (file.uniqueId === "image") {
            portfolio.image.url = file.result.secure_url;
            portfolio.image.publicId = file.result.public_id;
        } else if (file.uniqueId === "backgroundImage") {
            portfolio.backgroundImage.url = file.result.secure_url;
            portfolio.backgroundImage.publicId = file.result.public_id;
        } else if (file.uniqueId === "logo") {
            portfolio.logo.url = file.result.secure_url;
            portfolio.logo.publicId = file.result.public_id;
        }
    });
    console.log(portfolio)
    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolio,
        message: "Portfolio updated successfully"
    })
})

const recyclePortfolio = asyncHandler(async (req, res) => {
    const { id } = req.params

    const portfolio = await Portfolio.findById(id)

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 400)
    }

    portfolio.isRecycled = true
    portfolio.isActive = false

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolio,
        message: "Portfolio recycled successfully"
    })
})

const restorePortfolio = asyncHandler(async (req, res) => {
    const { id } = req.params

    const portfolio = await Portfolio.findById(id)

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 400)
    }

    portfolio.isRecycled = false
    portfolio.isActive = true

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolio,
        message: "Portfolio restored successfully"
    })
})

const deletePortfolio = asyncHandler(async (req, res) => {

    const { id } = req.params

    const portfolio = await Portfolio.findById(id)

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 400)
    }

    if (portfolio.contactData) await PortfolioContact.findByIdAndDelete(portfolio.contactData)
    if (portfolio.otherDetails) await PortfolioDetail.findByIdAndDelete(portfolio.otherDetails)
    if (portfolio.metaDetails) await MetaData.findByIdAndDelete(portfolio.metaDetails)

    await Portfolio.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Portfolio deleted successfully"
    })

})

const updateStatusActive = asyncHandler(async (req, res) => {
    const { id } = req.params

    const portfolio = await Portfolio.findById(id)

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 404)
    }

    portfolio.isActive = !portfolio.isActive

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolio,
        message: "Portfolio status updated successfully"
    })
})

const updateStatusPaid = asyncHandler(async (req, res) => {
    const { id } = req.params

    const portfolio = await Portfolio.findById(id)

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 404)
    }

    portfolio.isPaid = !portfolio.isPaid
    portfolio.isActive = portfolio.isPaid ? true : false
    portfolio.paidDate = portfolio.isPaid ? new Date() : portfolio.paidDate

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolio,
        message: "Portfolio status updated successfully"
    })
})

const getSinglePortfolio = asyncHandler(async (req, res) => {
    const { userName } = req.params

    const portfolio = await Portfolio.findOne({ userName })
        .populate({
            path: "contactData",
            model: "PortfolioContact",
        })
        .populate({
            path: "otherDetails",
            model: "PortfolioDetail",
        })
        .populate({
            path: "metaDetails",
            model: "MetaData",
        })

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 404)
    }

    res.status(200).json({
        success: true,
        data: portfolio,
    })
})

const getAllPortfolio = asyncHandler(async (req, res) => {
    const portfolios = await Portfolio.aggregate([
        {
            $match: {
                isRecycled: false
            }
        },
        {
            $lookup: {
                from: "portfoliocontacts",
                localField: "contactData",
                foreignField: "_id",
                as: "contactData"
            }
        },
        {
            $unwind: "$contactData"
        },
        {
            $project: {
                _id: 1,
                userName: 1,
                fullName: 1,
                image: 1,
                tagline: 1,
                paidDate: 1,
                isActive: 1,
                isPaid: 1,
                facebook: "$contactData.social.facebook",
                instagram: "$contactData.social.instagram",
                whatsappNo: "$contactData.whatsappNo",
                email: 1,
                phoneNumber: 1,
            }
        }
    ])

    res.status(200).json({
        success: true,
        data: portfolios,
    })
})

const getRecycledPortfolio = asyncHandler(async (req, res) => {


    const portfolios = await Portfolio.aggregate([
        {
            $match: {
                isRecycled: true
            }
        },
        {
            $lookup: {
                from: "portfoliocontacts",
                localField: "contactData",
                foreignField: "_id",
                as: "contactData"
            }
        },
        {
            $unwind: "$contactData"
        },
        {
            $project: {
                _id: 1,
                userName: 1,
                fullName: 1,
                image: 1,
                tagline: 1,
                paidDate: 1,
                isActive: 1,
                isPaid: 1,
                isRecycled: 1,
                facebook: "$contactData.social.facebook",
                instagram: "$contactData.social.instagram",
                whatsappNo: "$contactData.whatsappNo",
                email: 1,
                phoneNumber: 1,
            }
        }
    ])

    res.status(200).json({
        success: true,
        data: portfolios,
        message: "All Portfolios!"
    })
})

const createPortfolioDetail = asyncHandler(async (req, res) => {
    const { id } = req.params

    const uniquePortfolioDetail = await PortfolioDetail.findOne({ portfolio: id })

    if (uniquePortfolioDetail) {
        throw new AppError("Portfolio detail already exists!", 400)
    }

    const otherData = JSON.parse(req.body.data)
    const { brands, bulkLink, services, products } = otherData

    const portfolioDetail = await PortfolioDetail.create({
        portfolio: id,
        brands: {
            tagline: brands.tagline || "",
            brandList: []
        },
        bulkLink: {
            tagline: bulkLink.tagline || "",
            bulkLinkList: bulkLink
        },
        services: {
            tagline: services.tagline || "",
            serviceList: []
        },
        products: {
            tagline: products.tagline || "",
            productList: []
        }
    })

    let brandImages = []

    if (req?.files?.brands) {
        brandImages = await multipleFileUpload(req?.files?.brands)
    }

    brands.brandList.forEach(brand => {
        let existingBrand = portfolioDetail.brands.brandList.find(b => b.uniqueId === brand.uniqueId);
        if (!existingBrand) {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === brand.uniqueId);
            if (uploadedFile) {
                portfolioDetail.brands.brandList.push({ ...brand, image: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === existingBrand.uniqueId);
            if (uploadedFile) {
                existingBrand.brandName = brand.brandName;
                existingBrand.uniqueId = brand.uniqueId;
                existingBrand.image = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
            } else {
                existingBrand.brandName = brand.brandName;
                existingBrand.uniqueId = brand.uniqueId;
            }
        }
    });

    let serviceImages = []

    if (req?.files?.services) {
        serviceImages = await multipleFileUpload(req?.files?.services)
    }

    services.serviceList.forEach(service => {
        let existingService = portfolioDetail.services.serviceList.find(s => s.uniqueId === service.uniqueId);
        if (!existingService) {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === service.uniqueId);
            if (uploadedFile) {
                portfolioDetail.services.serviceList.push({ ...service, image: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === existingService.uniqueId);
            if (uploadedFile) {
                existingService.image = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
                existingService.uniqueId = service.uniqueId;
                existingService.title = service.title;
                existingService.detail = service.detail;
            } else {
                existingService.uniqueId = service.uniqueId;
                existingService.detail = service.detail;
                existingService.title = service.title;
            }
        }
    });


    let productImages = []

    if (req?.files?.products) {
        productImages = await multipleFileUpload(req?.files?.products)
    }


    products.productList.forEach(product => {
        let existingProduct = portfolioDetail.products.productList.find(p => p.uniqueId === product.uniqueId);
        if (!existingProduct) {
            const uploadedFile = productImages.find(uf => uf.uniqueId === product.uniqueId);
            if (uploadedFile) {
                portfolioDetail.products.productList.push({ ...product, image: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = productImages.find(uf => uf.uniqueId === existingProduct.uniqueId);
            if (uploadedFile) {
                existingProduct.image = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
                existingProduct.uniqueId = product.uniqueId;
                existingProduct.title = product.title;
                existingProduct.detail = product.detail;

            } else {
                existingProduct.uniqueId = product.uniqueId;
                existingProduct.detail = product.detail;
                existingProduct.title = product.title;
            }
        }
    });

    await portfolioDetail.save()

    if (!portfolioDetail) {
        throw new AppError("Portfolio detail not created!", 400)
    }

    const portfolio = await Portfolio.findById(id)

    portfolio.otherDetails = portfolioDetail._id

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolioDetail,
        message: "Portfolio detail created successfully"
    })
})

const updatePortfolioDetail = asyncHandler(async (req, res) => {
    const { id } = req.params

    const otherData = JSON.parse(req.body.data)
    const { brands, bulkLink, services, products } = otherData
    console.log(otherData)
    const portfolioDetail = await PortfolioDetail.findOneAndUpdate(
        { portfolio: id },
        {
            $set: {
                'brands.tagline': brands.tagline,
                'bulkLink.tagline': bulkLink.tagline,
                'services.tagline': services.tagline,
                'products.tagline': products.tagline
            }
        },
        {
            new: true,
            runValidators: true
        }
    );


    let brandImages = []

    if (req?.files?.brands) {
        brandImages = await multipleFileUpload(req?.files?.brands)
    }

    console.log(portfolioDetail.brands)

    brands.brandList.forEach(brand => {
        let existingBrand = portfolioDetail.brands.brandList.find(b => b.uniqueId === brand.uniqueId);

        if (!existingBrand) {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === brand.uniqueId);
            if (uploadedFile) {
                portfolioDetail.brands.brandList.push({ ...brand, image: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === existingBrand.uniqueId);
            if (uploadedFile) {
                existingBrand.brandName = brand.brandName;
                existingBrand.uniqueId = brand.uniqueId;
                existingBrand.image = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
            } else {
                existingBrand.brandName = brand.brandName;
                existingBrand.uniqueId = brand.uniqueId;
            }
        }
    });

    portfolioDetail.brands.brandList = portfolioDetail.brands.brandList.filter(brandData => {
        const isExistingData = brands.brandList.some(data => data.uniqueId === brandData.uniqueId);
        if (!isExistingData && brandData.image.publicId) {
            cloudinary.v2.uploader.destroy(brandData.image.publicId, (error, result) => {
                if (error) {
                    console.error("Failed to destroy image:", error);
                } else {
                    console.log("Image destroyed:", result);
                }
            });
        }
        return isExistingData;
    });

    let serviceImages = []

    if (req?.files?.services) {
        serviceImages = await multipleFileUpload(req?.files?.services)
    }

    services.serviceList.forEach(service => {
        let existingService = portfolioDetail.services.serviceList.find(s => s.uniqueId === service.uniqueId);
        if (!existingService) {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === service.uniqueId);
            if (uploadedFile) {
                portfolioDetail.services.serviceList.push({ ...service, image: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === existingService.uniqueId);
            if (uploadedFile) {
                existingService.image = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
                existingService.uniqueId = service.uniqueId;
                existingService.title = service.title;
                existingService.detail = service.detail;
            } else {
                existingService.uniqueId = service.uniqueId;
                existingService.detail = service.detail;
                existingService.title = service.title;
            }
        }
    });

    let productImages = []

    if (req?.files?.products) {
        productImages = await multipleFileUpload(req?.files?.products)
    }

    products.productList.forEach(product => {
        let existingProduct = portfolioDetail.products.productList.find(p => p.uniqueId === product.uniqueId);
        if (!existingProduct) {
            const uploadedFile = productImages.find(uf => uf.uniqueId === product.uniqueId);
            if (uploadedFile) {
                portfolioDetail.products.productList.push({ ...product, image: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = productImages.find(uf => uf.uniqueId === existingProduct.uniqueId);
            if (uploadedFile) {
                existingProduct.image = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
                existingProduct.uniqueId = product.uniqueId;
                existingProduct.title = product.title;
                existingProduct.detail = product.detail;
            } else {
                existingProduct.uniqueId = product.uniqueId;
                existingProduct.detail = product.detail;
                existingProduct.title = product.title;
            }
        }
    });

    portfolioDetail.products.productList = portfolioDetail.products.productList.filter(productData => {
        const isExistingData = products.productList.some(data => data.uniqueId === productData.uniqueId);
        if (!isExistingData && productData.image.publicId) {
            cloudinary.v2.uploader.destroy(productData.image.publicId);
        }
        return isExistingData;
    });

    portfolioDetail.services.serviceList = portfolioDetail.services.serviceList.filter(serviceData => {
        const isExistingData = services.serviceList.some(data => data.uniqueId === serviceData.uniqueId);
        if (!isExistingData && serviceData.image.publicId) {
            cloudinary.v2.uploader.destroy(serviceData.image.publicId);
        }
        return isExistingData;
    });

    portfolioDetail.products.productList = portfolioDetail.products.productList.filter(productData => {
        const isExistingData = products.productList.some(data => data.uniqueId === productData.uniqueId);
        if (!isExistingData && productData.image.publicId) {
            cloudinary.v2.uploader.destroy(productData.image.publicId);
        }
        return isExistingData;
    });

    await portfolioDetail.save()

    console.log(portfolioDetail)

    if (!portfolioDetail) {
        throw new AppError("Portfolio detail not updated!", 400)
    }

    res.status(200).json({
        success: true,
        data: portfolioDetail,
        message: "Portfolio detail updated successfully"
    })
})

const createPortfolioContact = asyncHandler(async (req, res) => {
    const contactData = JSON.parse(req.body.data)
    const { whatsappNo, mapLink, address, emailList, brochureLink, phoneList, social, testimonial } = contactData
    const { id } = req.params

    const portfolioContact = await PortfolioContact.create({
        portfolio: id,
        testimonial: testimonial,
        mapLink: mapLink,
        emailList: emailList,
        phoneList: phoneList,
        address: address,
        whatsappNo: whatsappNo,
        brochureLink: brochureLink,
        social: {
            facebook: social.facebook,
            instagram: social.instagram,
            linkedin: social.linkedin,
            twitter: social.twitter,
            youtube: social.youtube,
            googleLink: social.googleLink,
            otherSocialList: []
        }
    })

    if (!portfolioContact) {
        throw new AppError("Something went wrong!", 400)
    }

    let uploadedFiles = []
    console.log(req.files.otherSocial)
    if (req.files.otherSocial) {
        uploadedFiles = await multipleFileUpload(req.files.otherSocial)
    }

    social.otherSocialList.forEach(social => {
        let existingSocial = portfolioContact.social.otherSocialList.find(os => os.uniqueId === social.uniqueId);
        if (!existingSocial) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === social.uniqueId);
            console.log(uploadedFile)
            if (uploadedFile) {
                portfolioContact.social.otherSocialList.push({ ...social, img: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingSocial.uniqueId);
            if (uploadedFile) {
                existingSocial.img = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
                existingSocial.uniqueId = social.uniqueId;
                existingSocial.link = social.link;
            } else {
                existingSocial.uniqueId = social.uniqueId;
                existingSocial.link = social.link;
            }
        }
    });



    await portfolioContact.save()

    const portfolio = await Portfolio.findById(id)

    portfolio.contactData = portfolioContact._id

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolioContact,
        message: "Contact details added successfully!"
    })
})

const updatePortfolioContact = asyncHandler(async (req, res) => {
    const contactData = JSON.parse(req.body.data)
    const { whatsappNo, mapLink, address, emailList, brochureLink, phoneList, social, testimonial } = contactData
    const { id } = req.params
    console.log(contactData)
    const portfolioContact = await PortfolioContact.findOneAndUpdate(
        { portfolio: id },
        {
            $set: {
                testimonial: testimonial,
                mapLink: mapLink,
                emailList: emailList,
                phoneList: phoneList,
                address: address,
                whatsappNo: whatsappNo,
                brochureLink: brochureLink,
                'social.googleLink': social.googleLink,
                'social.facebook': social.facebook,
                'social.instagram': social.instagram,
                'social.linkedin': social.linkedin,
                'social.twitter': social.twitter,
                'social.youtube': social.youtube
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    console.log(portfolioContact)


    if (!portfolioContact) {
        throw new AppError("Something went wrong!", 400)
    }

    let uploadedFiles = []
    if (req.files.otherSocial) {
        uploadedFiles = await multipleFileUpload(req.files.otherSocial)
    }

    social.otherSocialList.forEach(social => {
        let existingSocial = portfolioContact.social.otherSocialList.find(os => os.uniqueId === social.uniqueId);
        if (!existingSocial) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === social.uniqueId);
            if (uploadedFile) {
                portfolioContact.social.otherSocialList.push({ ...social, img: { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingSocial.uniqueId);
            if (uploadedFile) {
                existingSocial.img = { url: uploadedFile.result.secure_url, publicId: uploadedFile.result.public_id };
                existingSocial.uniqueId = social.uniqueId;
                existingSocial.link = social.link;
            } else {
                existingSocial.uniqueId = social.uniqueId;
                existingSocial.link = social.link;
            }
        }
    });

    portfolioContact.social.otherSocialList = portfolioContact.social.otherSocialList.filter(socialData => {
        const isExistingData = social.otherSocialList.some(data => data.uniqueId === socialData.uniqueId);
        if (!isExistingData && socialData.img.publicId) {
            console.log(true)
            console.log(socialData)
            cloudinary.v2.uploader.destroy(socialData.img.publicId);
        }
        return isExistingData;
    });

    await portfolioContact.save()

    res.status(200).json({
        success: true,
        data: portfolioContact,
        message: "Contact details updated successfully"
    })
})

export {
    createPortfolio,
    deletePortfolio,
    updatePortfolio,
    getAllPortfolio,
    getSinglePortfolio,
    createPortfolioDetail,
    updatePortfolioDetail,
    createPortfolioContact,
    updatePortfolioContact,
    recyclePortfolio,
    restorePortfolio,
    getRecycledPortfolio,
    updateStatusActive,
    updateStatusPaid
}