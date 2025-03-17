import { Schema, model } from "mongoose"

const catalogueCatalogueMetaDataSchema = new Schema({
    catalogue: {
        type: Schema.Types.ObjectId,
        ref: "Catalogue"
    },
    favIcon: {
        url: {
            type: String,
            default: ""
        },
        publicId: {
            type: String,
            default: ""
        }
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    keywords: {
        type: String
    },
    canonical: {
        type: String
    }
}, {
    timestamps: true
})


const CatalogueMetaData = model("CatalogueMetaData", catalogueCatalogueMetaDataSchema)

export default CatalogueMetaData 