import MetaData from "../model/portfolioModel/metaData.model.js"
import Portfolio from "../model/portfolioModel/portfolio.model.js"
import PortfolioContact from "../model/portfolioModel/portfolioContact.model.js"
import PortfolioDetail from "../model/portfolioModel/portfolioDetail.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import AppError from "../utils/error.utils.js"
import { multipleFileUpload } from "../utils/fileUpload.utils.js"

const createPortfolio = asyncHandler(async (req, res) => {

    const { fullName, userName, tagline, about, } = req.body

    const portfolio = await Portfolio.create({
        fullName,
        userName,
        tagline,
        about: JSON.parse(about),
        backgroundImage: {
            publicId: "",
            url: ""
        },
        image: {
            publicId: "",
            url: ""
        }
    })

    if (!portfolio) {
        throw new AppError("Something went wrong!", 400)
    }

    let uploadedFiles = []
    if (req?.files) {
        uploadedFiles = await multipleFileUpload(req?.files);
    }

    uploadedFiles.forEach(file => {
        if (file.uniqueId === "image") {
            portfolio.image = file.result;
        } else if (file.uniqueId === "backgroundImage") {
            portfolio.backgroundImage.url = file.result;
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

    const { fullName, userName, tagline, about } = req.body

    const { id } = req.params

    const portfolio = await Portfolio.findById(id)

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 400)
    }

    if (portfolio.userName !== userName) {
        const uniquePortfolio = await Portfolio.findOne({ userName })

        if (!uniquePortfolio) {
            throw new AppError("Username already exists!", 400)
        }
    }

    portfolio.fullName = await fullName
    portfolio.userName = await userName
    portfolio.tagline = await tagline
    portfolio.about = await JSON.parse(about)

    let uploadedFiles = []
    if (req?.files) {
        uploadedFiles = await multipleFileUpload(req?.files);
    }

    uploadedFiles.forEach(file => {
        if (file.uniqueId === "image") {
            portfolio.image = file.result;
        } else if (file.uniqueId === "backgroundImage") {
            portfolio.backgroundImage.url = file.result;
        }
    });

    await portfolio.save()

    res.status(200).json({
        success: true,
        data: portfolio,
        message: "Portfolio updated successfully"
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

const getSinglePortfolio = asyncHandler(async (req, res) => {
    const { userName } = req.params

    const portfolio = await Portfolio.findOne({ userName })

    if (!portfolio) {
        throw new AppError("Portfolio not found!", 400)
    }

    res.status(200).json({
        success: true,
        data: portfolio,
    })
})

const getAllPortfolio = asyncHandler(async (req, res) => {
    const portfolios = await Portfolio.aggregate([
        {
            $project: {
                _id: 1,
                userName: 1,
                fullName: 1,
                image: 1,
                tagline: 1,
                facebook: "$contactData.social.facebook",
                instagram: "$contactData.social.instagram",
                whatsappNo: "$contactData.whatsappNo",
                email: { $arrayElemAt: ["$contactData.email", 0] },
                phone: { $arrayElemAt: ["$contactData.phone", 0] },
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
    const { brands: brandsList, bulkLinkTagline, brandTagline, productTagline, serviceTagline, bulkLink: bulkLinkList, services: servicesList, products: productList } = req.body

    const bulkLink = JSON.parse(bulkLinkList)
    const brands = JSON.parse(brandsList)
    const services = JSON.parse(servicesList)
    const products = JSON.parse(productList)

    const portfolioDetail = await PortfolioDetail.create({
        portfolio: id,
        brands: {
            tagline: brandTagline,
            brandList: []
        },
        bulkLink: {
            tagline: bulkLinkTagline,
            bulkLinkList: bulkLink
        },
        services: {
            tagline: serviceTagline,
            serviceList: []
        },
        products: {
            tagline: productTagline,
            productList: []
        }
    })

    let brandImages = []

    if (req?.files?.brands) {
        brandImages = await multipleFileUpload(req?.files?.brands)
    }

    brands.forEach(brand => {
        let existingBrand = portfolioDetail.brands.brandList.find(b => b.uniqueId === brand.uniqueId);
        if (!existingBrand) {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === brand.uniqueId);
            if (uploadedFile) {
                portfolioDetail.brands.brandList.push({ ...brand, image: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === existingBrand.uniqueId);
            if (uploadedFile) {
                existingBrand.brandName = brand.brandName;
                existingBrand.uniqueId = brand.uniqueId;
                existingBrand.image = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
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

    services.forEach(service => {
        let existingService = portfolioDetail.services.serviceList.find(s => s.uniqueId === service.uniqueId);
        if (!existingService) {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === service.uniqueId);
            if (uploadedFile) {
                portfolioDetail.services.serviceList.push({ ...service, image: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === existingService.uniqueId);
            if (uploadedFile) {
                existingService.image = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
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


    products.forEach(product => {
        let existingProduct = portfolioDetail.products.productList.find(p => p.uniqueId === product.uniqueId);
        if (!existingProduct) {
            const uploadedFile = productImages.find(uf => uf.uniqueId === product.uniqueId);
            if (uploadedFile) {
                portfolioDetail.products.productList.push({ ...product, image: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = productImages.find(uf => uf.uniqueId === existingProduct.uniqueId);
            if (uploadedFile) {
                existingProduct.image = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
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
    const { brands: brandsList, bulkLinkTagline, brandTagline, productTagline, serviceTagline, bulkLink: bulkLinkList, services: servicesList, products: productList } = req.body

    const bulkLink = JSON.parse(bulkLinkList)
    const brands = JSON.parse(brandsList)
    const services = JSON.parse(servicesList)
    const products = JSON.parse(productList)

    const portfolioDetail = await PortfolioDetail.findOneAndUpdate(
        { portfolio: id },
        {
            $set: {
                brands: {
                    tagline: brandTagline,
                },
                bulkLink: {
                    tagline: bulkLinkTagline,
                    bulkLinkList: bulkLink
                },
                services: {
                    tagline: serviceTagline,
                },
                products: {
                    tagline: productTagline,
                }
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    let brandImages = []

    if (req?.files?.brands) {
        brandImages = await multipleFileUpload(req?.files?.brands)
    }

    brands.forEach(brand => {
        let existingBrand = portfolioDetail.brands.brandList.find(b => b.uniqueId === brand.uniqueId);
        if (!existingBrand) {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === brand.uniqueId);
            if (uploadedFile) {
                portfolioDetail.brands.brandList.push({ ...brand, image: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = brandImages.find(uf => uf.uniqueId === existingBrand.uniqueId);
            if (uploadedFile) {
                existingBrand.brandName = brand.brandName;
                existingBrand.uniqueId = brand.uniqueId;
                existingBrand.image = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
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

    services.forEach(service => {
        let existingService = portfolioDetail.services.serviceList.find(s => s.uniqueId === service.uniqueId);
        if (!existingService) {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === service.uniqueId);
            if (uploadedFile) {
                portfolioDetail.services.serviceList.push({ ...service, image: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = serviceImages.find(uf => uf.uniqueId === existingService.uniqueId);
            if (uploadedFile) {
                existingService.image = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
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

    products.forEach(product => {
        let existingProduct = portfolioDetail.products.productList.find(p => p.uniqueId === product.uniqueId);
        if (!existingProduct) {
            const uploadedFile = productImages.find(uf => uf.uniqueId === product.uniqueId);
            if (uploadedFile) {
                portfolioDetail.products.productList.push({ ...product, image: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = productImages.find(uf => uf.uniqueId === existingProduct.uniqueId);
            if (uploadedFile) {
                existingProduct.image = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
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
        throw new AppError("Portfolio detail not updated!", 400)
    }

    res.status(200).json({
        success: true,
        data: portfolioDetail,
        message: "Portfolio detail updated successfully"
    })
})

const createPortfolioContact = asyncHandler(async (req, res) => {
    const { whatsappNo, mapLink, address, email, facebook, instagram, linkedin, twitter, youtube, testimonialTagline, testimonialList: testimonialData, brochureLink, otherSocial: otherSocialList, phone } = req.body
    const { id } = req.params

    const testimonialList = JSON.parse(testimonialData)
    const otherSocial = JSON.parse(otherSocialList)

    const portfolioContact = await PortfolioContact.create({
        portfolio: id,
        testimonial: {
            tagline: testimonialTagline,
            testimonialList: testimonialList
        },
        mapLink: mapLink,
        email: JSON.parse(email),
        phone: JSON.parse(phone),
        address: JSON.parse(address),
        whatsappNo: whatsappNo,
        brochureLink: JSON.parse(brochureLink),
        social: {
            facebook: facebook,
            instagram: instagram,
            linkedin: linkedin,
            twitter: twitter,
            youtube: youtube,
            otherSocial: []
        }
    })

    if (!portfolioContact) {
        throw new AppError("Something went wrong!", 400)
    }

    let uploadedFiles = []
    if (req.files.otherSocial) {
        uploadedFiles = await multipleFileUpload(req.files.otherSocial)
    }

    otherSocial.forEach(social => {
        let existingSocial = portfolioContact.social.otherSocial.find(os => os.uniqueId === social.uniqueId);
        if (!existingSocial) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === social.uniqueId);
            if (uploadedFile) {
                portfolioContact.social.otherSocial.push({ ...social, img: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingSocial.uniqueId);
            if (uploadedFile) {
                existingSocial.img = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
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
    const { whatsappNo, mapLink, address, email, facebook, instagram, linkedin, twitter, youtube, testimonialTagline, testimonialList: testimonialData, brochureLink, otherSocial: otherSocialList, phone } = req.body
    const { id } = req.params

    const testimonialList = JSON.parse(testimonialData)
    const otherSocial = JSON.parse(otherSocialList)

    const portfolioContact = await PortfolioContact.findOneAndUpdate({
        portfolio: id
    }, {
        $set: {
            testimonial: {
                tagline: testimonialTagline,
                testimonialList: testimonialList
            },
            mapLink: mapLink,
            email: JSON.parse(email),
            phone: JSON.parse(phone),
            address: JSON.parse(address),
            whatsappNo: whatsappNo,
            brochureLink: JSON.parse(brochureLink),
            social: {
                facebook: facebook,
                instagram: instagram,
                linkedin: linkedin,
                twitter: twitter,
                youtube: youtube,
                otherSocial: []
            }
        }
    }, {
        new: true,
        runValidators: true
    })

    if (!portfolioContact) {
        throw new AppError("Something went wrong!", 400)
    }

    let uploadedFiles = []
    if (req.files.otherSocial) {
        uploadedFiles = await multipleFileUpload(req.files.otherSocial)
    }

    otherSocial.forEach(social => {
        let existingSocial = portfolioContact.social.otherSocial.find(os => os.uniqueId === social.uniqueId);
        if (!existingSocial) {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === social.uniqueId);
            if (uploadedFile) {
                portfolioContact.social.otherSocial.push({ ...social, img: { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id } });
            }
        } else {
            const uploadedFile = uploadedFiles.find(uf => uf.uniqueId === existingSocial.uniqueId);
            if (uploadedFile) {
                existingSocial.img = { url: uploadedFile.result.url, publicId: uploadedFile.result.public_id };
                existingSocial.uniqueId = social.uniqueId;
                existingSocial.link = social.link;
            } else {
                existingSocial.uniqueId = social.uniqueId;
                existingSocial.link = social.link;
            }
        }
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
    updatePortfolioContact
}