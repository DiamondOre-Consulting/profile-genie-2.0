import { Router } from "express"
import upload from "../middleware/multer.middleware.js"
import { createCatalogueOwner } from "../controller/catalogue.controller.js"



const catalogueRouter = Router()

catalogueRouter.route('/').post(createCatalogueOwner)


export default catalogueRouter