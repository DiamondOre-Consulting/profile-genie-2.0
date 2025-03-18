import { Router } from "express"
import upload from "../middleware/multer.middleware.js"
import { createCatalogue, createCatalogueOwner, getAllCategories } from "../controller/catalogue.controller.js"



const catalogueRouter = Router()

catalogueRouter.route('/')
    .post(createCatalogueOwner)

catalogueRouter.route("/category/:id")
    .get(getAllCategories)

catalogueRouter.route('/create-catalogue')
    .post(upload.array("files", 2),
        createCatalogue)


export default catalogueRouter