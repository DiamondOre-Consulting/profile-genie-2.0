import { Router } from "express"
import upload from "../middleware/multer.middleware.js"
import { addProduct, createCatalogue, createCatalogueOwner, deleteProduct, editProduct, getAllCategories, getCategorisedProducts } from "../controller/catalogue.controller.js"



const catalogueRouter = Router()

catalogueRouter.route('/')
    .post(createCatalogueOwner)

catalogueRouter.route("/category/:id")
    .get(getAllCategories)

catalogueRouter.route('/create-catalogue')
    .post(upload.array("files", 2),
        createCatalogue)

catalogueRouter.route('/add-product')
    .post(upload.array("image", 30),
        addProduct)

catalogueRouter.route('/delete-product/:id')
    .delete(deleteProduct)

catalogueRouter.route('/edit-product/:id')
    .delete(editProduct)

catalogueRouter.route('/all-products/:userName')
    .get(getCategorisedProducts)




export default catalogueRouter