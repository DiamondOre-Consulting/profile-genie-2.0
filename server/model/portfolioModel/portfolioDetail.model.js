import { model, Schema } from "mongoose"

const portfolioDetailSchema = new Schema({
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: "PersonalDetail"
    },
    brands: {
        tagline: {
            type: String,
            default: ""
        },
        brandList: {
            type: [{
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
            }],
            default: []
        }
    },
    bulkLink: {
        tagline: {
            type: String,
            default: ""
        },
        bulkLinkList: {
            type: [{
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
            }],
            default: []
        }
    },
    services: {
        tagline: {
            type: String,
            default: ""
        },
        serviceList: {
            type: [{
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
            }],
            default: []
        }
    },
    products: {
        tagline: {
            type: String,
            default: ""
        },
        productList: {
            type: [{
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
            }],
            default: []
        }
    }
}, {
    timestamps: true
})


const PortfolioDetail = model("PortfolioDetail", portfolioDetailSchema)

export default PortfolioDetail