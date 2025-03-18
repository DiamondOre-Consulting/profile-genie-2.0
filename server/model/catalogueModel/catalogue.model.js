import { Schema, model } from "mongoose";

const catalogueSchema = new Schema({
    logo: {
        url: {
            type: String,
            default: ""
        },
        publicId: {
            type: String,
            default: ""
        }
    },
    name: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String
    },
    textColor: {
        type: String
    },
    paidDate: {
        type: Date
    },
    isPaid: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    },
    tagline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    heroImage: {
        url: {
            type: String,
            default: ""
        },
        publicId: {
            type: String,
            default: ""
        }
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: "CatalogueProduct"
    }],
    contact: {
        type: Schema.Types.ObjectId,
        ref: "CatalogueContact"
    },
    metaDetails: {
        type: Schema.Types.ObjectId,
        ref: "MetaData"
    },
    catalogueOwner: {
        type: Schema.Types.ObjectId,
        ref: "PersonalDetail"
    }
}, {
    timestamps: true
})

const Catalogue = model("Catalogue", catalogueSchema)

export default Catalogue