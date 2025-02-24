import MetaData from "../model/portfolioModel/metaData.model.js";
import Portfolio from "../model/portfolioModel/portfolio.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/error.utils.js";
import { fileUpload } from "../utils/fileUpload.utils.js";


const createMetaData = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id)
    console.log(req.body)
    const metaDetail = JSON.parse(req.body.formData)
    console.log(metaDetail)
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

    portfolio.metaDetails = metaData._id

    await portfolio.save()

    res.status(200).json({
        success: true,
        message: "Meta data created successfully",
        metaData
    })
})

const updateMetaData = asyncHandler(async (req, res) => {
    const { id } = req.params

    const { title, description, keywords, canonical } = req.body

    const metaData = await MetaData.findOneAndUpdate(
        { portfolio: id },
        {
            $set: {
                title,
                description,
                keywords: JSON.parse(keywords),
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
