import { Router } from "express"
import upload from "../middleware/multer.middleware.js"
import { addProduct, createCatalogue, createCatalogueOwner, deleteProduct, editCatalogue, editCatalogueOwner, editProduct, getAllCatalogues, getAllCategories, getCategorisedProducts, getSingleCatalogue } from "../controller/catalogue.controller.js"
import { createMetaData, updatedCatalogueMetaData, updateMetaData } from "../controller/metaData.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const catalogueRouter = Router()

catalogueRouter.route('/owner')
    .post(createCatalogueOwner)
    .get(getAllCatalogues)

catalogueRouter.route('/owner/:id')
    .put(verifyJWT, editCatalogueOwner)

catalogueRouter.route("/category/:id")
    .get(getAllCategories)

catalogueRouter.route('/create-catalogue')
    .post(upload.array("files", 2),
        createCatalogue)

catalogueRouter.route('/edit-catalogue/:id')
    .put(upload.array("files", 2),
        editCatalogue)

catalogueRouter.route('/add-product')
    .post(upload.array("image", 30),
        addProduct)

catalogueRouter.route('/delete-product/:id')
    .delete(deleteProduct)

catalogueRouter.route('/edit-product/:id')
    .put(upload.array("image", 30), editProduct)

catalogueRouter.route('/all-products/:userName')
    .get(getCategorisedProducts)

// catalogueRouter.route('/recycle/:id', verifyJWT)
//     .put(recyclePortfolio)

// catalogueRouter.route('/restore/:id', verifyJWT)
//     .put(restorePortfolio)

// catalogueRouter.route('/update-active-status/:id')
//     .put(verifyJWT, updateStatusActive)

// catalogueRouter.route('/update-paid-status/:id', verifyJWT)
//     .put(updateStatusPaid)

catalogueRouter.route('/single/:userName')
    .get(getSingleCatalogue)

catalogueRouter.route('/contact/:id', verifyJWT)
    .get(getAllCatalogues)

catalogueRouter.route('/meta/:id', verifyJWT)
    .post(upload.single("favIcon"), createMetaData)
    .put(upload.single("favIcon"), updatedCatalogueMetaData)

export default catalogueRouter