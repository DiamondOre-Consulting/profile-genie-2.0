import { Schema, model } from "mongoose"

const metaDataSchema = new Schema({
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: "PersonalDetail"
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
    keywords: [{
        type: String
    }],
    canonical: {
        type: String
    }
}, {
    timestamps: true
})


const MetaData = model("MetaData", metaDataSchema)

export default MetaData 