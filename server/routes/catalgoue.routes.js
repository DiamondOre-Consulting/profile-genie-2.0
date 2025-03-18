import { Router } from "express"
import upload from "../middleware/multer.middleware.js"
import { createCatalogue, createCatalogueOwner } from "../controller/catalogue.controller.js"



const catalogueRouter = Router()

catalogueRouter.route('/')
    .post(createCatalogueOwner)

catalogueRouter.route('/create-catalogue')
    .post(upload.array("files", 2),
        createCatalogue)


export default catalogueRouter