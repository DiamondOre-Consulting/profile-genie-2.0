import { Schema, model } from "mongoose";

const portfolioSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: [true, "Username already exists!"]
    },
    tagline: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    image: {
        publicId: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    backgroundImage: {
        publicId: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    logo: {
        publicId: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    about: {
        head: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    paidDate: {
        type: Date
    },
    otherDetails: {
        type: Schema.Types.ObjectId,
        ref: "PortfolioDetail"
    },
    contactData: {
        type: Schema.Types.ObjectId,
        ref: "PortfolioContact"
    },
    metaDetails: {
        type: Schema.Types.ObjectId,
        ref: "MetaData"
    }
}, {
    timestamps: true
})


const Portfolio = model("Portfolio", portfolioSchema)

export default Portfolio