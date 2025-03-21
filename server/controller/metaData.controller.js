import Catalogue from "../model/catalogueModel/catalogue.model.js";
import MetaData from "../model/portfolioModel/metaData.model.js";
import Portfolio from "../model/portfolioModel/portfolio.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/error.utils.js";
import { fileUpload } from "../utils/fileUpload.utils.js";


const createMetaData = asyncHandler(async (req, res) => {
    const { id } = req.params
    const metaDetail = JSON.parse(req.body.formData)
    const { title, description, keywords, canonical } = metaDetail

    const metaData = await MetaData.create({
        title,
        description,
        keywords: keywords,
        canonical,
        favIcon: {
            url: "",
            publicId: ""
        },
        portfolio: id
    })

    if (!metaData) {
        throw new AppError("Something went wrong", 400)
    }

    if (req.file) {
        const file = await fileUpload(req.file)
        metaData.favIcon.url = file.url
        metaData.favIcon.publicId = file.publicId
    }

    const portfolio = await Portfolio.findById(id)
    const catalogue = await Catalogue.findOne({ catalogueOwner: id })

    if (catalogue) {
        catalogue.metaDetails = metaData._id
        await catalogue.save()
    }

    if (portfolio) {
        portfolio.metaDetails = metaData._id
        await portfolio.save()
    }


    res.status(200).json({
        success: true,
        message: "Meta data created successfully",
        metaData
    })
})

const updateMetaData = asyncHandler(async (req, res) => {
    const { id } = req.params

    const metaDetail = JSON.parse(req.body.formData)
    const { title, description, keywords, canonical } = metaDetail
    const metaData = await MetaData.findOneAndUpdate(
        { portfolio: id },
        {
            $set: {
                title,
                description,
                keywords: keywords,
                canonical
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!metaData) {
        throw new AppError("Something went wrong", 400)
    }

    if (req.file) {
        const file = await fileUpload(req.file, metaData.favIcon.publicId)
        metaData.favIcon.url = file.url
        metaData.favIcon.publicId = file.publicId
    }

    await metaData.save()


    res.status(200).json({
        success: true,
        message: "Meta data updated successfully",
        metaData
    })
})

export { createMetaData, updateMetaData }
