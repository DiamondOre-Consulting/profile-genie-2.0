import { model, Schema } from "mongoose"

const catalogueOwnerSchema = new Schema({
    catalogue: {
        type: Schema.Types.ObjectId,
        ref: "Catalogue"
    },
    authAccount: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    mapLink: {
        type: String
    },
    emailList: [{
        email: {
            type: String
        }
    }],
    phoneList: [{
        phone: {
            type: Number
        }
    }],
    address: [{
        title: {
            type: String
        },
        detail: {
            type: String
        }
    }],
    whatsappNo: {
        type: Number
    },
}, {
    timestamps: true
})


const CatalogueOwner = model("CatalogueOwner", catalogueOwnerSchema)

export default CatalogueOwner