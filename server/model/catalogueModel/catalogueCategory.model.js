import { Schema, model } from "mongoose";

const catalogueCategorySchema = new Schema({
    catalogue: {
        type: Schema.Types.ObjectId,
        ref: "Catalogue"
    },
    categoryName: {
        type: String,
        required: true
    }
})

const CatalogueCategory = model("CatalogueCategory", catalogueCategorySchema)

export default CatalogueCategory