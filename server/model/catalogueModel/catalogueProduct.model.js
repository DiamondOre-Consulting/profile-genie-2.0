import { Schema, model } from "mongoose"

const catalogueProductSchema = new Schema({
    HSNCode: {
        type: String,
        required: true,
    },
    category: [{
        id: {
            type: String
        },
        text: {
            type: String
        }
    }],
    owner: {
        type: String,
        ref: 'CatalogueOwner'
    },
    name: {
        type: String,
        required: true
    },
    moq: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    image: [{
        uniqueId: {
            type: String
        },
        publicId: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    }],
})

const CatalogueProduct = model('CatalogueProduct', catalogueProductSchema)

export default CatalogueProduct