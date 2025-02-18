import { Router } from "express"
import upload from "../middleware/multer.middleware.js"
import { createPortfolio, createPortfolioContact, createPortfolioDetail, deletePortfolio, getAllPortfolio, getSinglePortfolio, updatePortfolio, updatePortfolioContact, updatePortfolioDetail } from "../controller/portfolio.controller.js"
import { createMetaData, updateMetaData } from "../controller/metaData.controller.js"
const portfolioRouter = Router()

portfolioRouter.route('/')
    .post(upload.array("files", 2), createPortfolio)
    .get(getAllPortfolio)

portfolioRouter.route('/:id')
    .put(upload.array("files", 2), updatePortfolio)
    .delete(deletePortfolio)
    .get(getSinglePortfolio)

portfolioRouter.route('/others/:id')
    .post(upload.fields([{ name: "brands", maxCount: 30 },
    { name: "services", maxCount: 30 },
    { name: "products", maxCount: 30 }]),
        createPortfolioDetail)
    .put(upload.fields([{ name: "brands", maxCount: 30 },
    { name: "services", maxCount: 30 },
    { name: "products", maxCount: 30 }]),
        updatePortfolioDetail)

portfolioRouter.route('/contact/:id')
    .post(upload.fields([{ name: "otherSocial", maxCount: 15 }]), createPortfolioContact)
    .put(upload.fields([{ name: "otherSocial", maxCount: 15 }]), updatePortfolioContact)

portfolioRouter.route('/meta/:id')
    .post(upload.single("favIcon"), createMetaData)
    .put(upload.single("favIcon"), updateMetaData)


export default portfolioRouter