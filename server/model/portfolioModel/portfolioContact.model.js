import { model, Schema } from "mongoose"

const portfolioContactSchema = new Schema({
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: "PersonalDetail"
    },
    testimonial: {
        tagline: {
            type: String
        },
        // googleLink: {
        //     type: String
        // },
        testimonialList: [{
            uniqueId: {
                type: String
            },
            name: {
                type: String
            },
            detail: {
                type: String
            },
            star: {
                type: Number
            }
        }]
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
    brochureLink: {
        tagline: {
            type: String
        },
        link: {
            type: String
        }
    },
    contactCSV: {
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        youtube: {
            type: String
        },
        googleLink: {
            type: String
        },
        otherSocialList: [{
            img: {
                publicId: {
                    type: String
                },
                url: {
                    type: String
                }
            },
            uniqueId: {
                type: String
            },
            link: {
                type: String
            }
        }]
    }
}, {
    timestamps: true
})


const PortfolioContact = model("PortfolioContact", portfolioContactSchema)

export default PortfolioContact