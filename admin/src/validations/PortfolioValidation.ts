import { z } from 'zod'

export const addProfileDetailSchema = z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    phoneNumber: z.number().min(1, 'Phone Number is required'),
    email: z.string().email('Invalid email'),
    userName: z.string().min(1, 'Username is required'),
    tagline: z.string().min(1, 'Tagline is required'),
    isPaid: z.boolean().default(false),
    isActive: z.boolean().default(false),
    image: z.object({
        publicId: z.string().optional(),
        url: z.string().min(1, 'Image is required')
    }),
    backgroundImage: z.object({
        publicId: z.string().optional(),
        url: z.string().optional()
    }).optional(),
    logo: z.object({
        publicId: z.string().optional(),
        url: z.string().min(1, 'Logo is required')
    }),
    about: z.object({
        head: z.string().min(1, 'About head is required'),
        body: z.string()
            .refine((val) => val.replace(/<[^>]*>/g, "").trim().length > 0, {
                message: "Body content cannot be empty",
            }),
    })
})

export const addOthersDetailSchema = z.object({
    brandTagline: z.string(),
    brands: z.array(
        z.object({
            uniqueId: z.string(),
            brandName: z.string(),
            image: z.object({
                publicId: z.string().optional(),
                url: z.string()
            })
        })
    ),
    bulkLinkTagline: z.string(),
    bulkLink: z.array(
        z.object({
            linkName: z.string(),
            link: z.string()
        })
    ),
    serviceTagline: z.string(),
    services: z.array(
        z.object({
            uniqueId: z.string(),
            title: z.string(),
            detail: z.string(),
            image: z.object({
                publicId: z.string().optional(),
                url: z.string()
            })
        })
    ),
    productTagline: z.string(),
    products: z.array(
        z.object({
            uniqueId: z.string(),
            title: z.string(),
            detail: z.string(),
            image: z.object({
                publicId: z.string().optional(),
                url: z.string()
            })
        })
    )
})

export const addContactDetailSchema = z.object({
    testimonialTagline: z.string().optional(),
    testimonialList: z.array(
        z.object({
            uniqueId: z.string(),
            name: z.string(),
            detail: z.string(),
            star: z.number(),
        })
    ),
    mapLink: z.string().optional(),
    emailList: z.array(z.object({
        email: z.string().optional()
    })).optional(),
    phoneList: z.array(z.object({
        phone: z.number().optional()
    })).optional(),
    whatsappNo: z.number().optional(),
    brochureLink: z.object({
        tagline: z.string().optional(),
        link: z.string().optional()
    }).optional(),
    address: z.array(
        z.object({
            title: z.string().optional(),
            detail: z.string().optional()
        })
    ).optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    googleLink: z.string().optional(),
    otherSocialList: z.array(
        z.object({
            uniqueId: z.string().optional(),
            img: z.object({
                publicId: z.string().optional(),
                url: z.string()
            }),
            link: z.string().optional()
        })
    ).optional()
})

export const addMetaDetailsSchema = z.object({
    favIcon: z.object({
        url: z.string().min(1, 'Image is required'),
        publicId: z.string().optional()
    }),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(50, 'Description is required(MIN 50 Characters)'),
    keywords: z.string().min(1, 'Keywords is required'),
    canonical: z.string().min(3, 'Canonical is required')
})

export type profileDetail = z.infer<typeof addProfileDetailSchema>
export type metaDetails = z.infer<typeof addMetaDetailsSchema>
export type contactDetails = z.infer<typeof addContactDetailSchema>
export type otherDetails = z.infer<typeof addOthersDetailSchema>

export interface portfolioResponse extends profileDetail {
    _id: string,
    createdAt: string,
    updatedAt: string,
    metaDetails: metaDetails,
    contactData: contactDetails,
    otherDetails: otherDetails
}