import { model, Schema } from "mongoose"

const portfolioDetailSchema = new Schema({
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: "PersonalDetail"
    },
    brands: {
        tagline: {
            type: String
        },
        brandList: [{
            uniqueId: {
                type: String
            },
            brandName: {
                type: String
            },
            image: {
                publicId: {
                    type: String
                },
                url: {
                    type: String
                }
            }
        }]
    },
    bulkLink: {
        tagline: {
            type: String
        },
        bulkLinkList: [{
            linkName: {
                type: String
            },
            link: {
                type: String
            },
             uniqueId: {
                type: String
            },
           
            image: {
                publicId: {
                    type: String
                },
                url: {
                    type: String
                }
            }
        }]
    },
    services: {
        tagline: {
            type: String
        },
        serviceList: [{
            uniqueId: {
                type: String
            },
            image: {
                publicId: {
                    type: String
                },
                url: {
                    type: String
                }
            },
            title: {
                type: String
            },
            detail: {
                type: String
            }
        }]
    },
    products: {
        tagline: {
            type: String
        },
        productList: [{
            uniqueId: {
                type: String
            },
            image: {
                publicId: {
                    type: String
                },
                url: {
                    type: String
                }
            },
            title: {
                type: String
            },
            detail: {
                type: String
            }
        }]
    }
}, {
    timestamps: true
})


const PortfolioDetail = model("PortfolioDetail", portfolioDetailSchema)

export default PortfolioDetail