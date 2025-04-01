

import { z } from 'zod'

export const loginValidationSchema = z.object({
    email: z.string().email('Please enter a valid email!'),
    password: z.string().min(8, 'Password must be at least 8 characters long!')
})

export const addCatalogueOwnerSchema = z.object({
    _id: z.string().optional(),
    catalogue: z.string().optional(),
    fullName: z.string().min(3, 'Full Name is required'),
    role: z.string().default('CATALOGUE OWNER').optional(),
    password: z.string().min(8, 'Password must be at least 8 characters long!'),
    email: z.string().email('Please enter a valid email!'),
    mapLink: z.string().optional(),
    emailList: z.array(z.object({
        email: z.string()
    })).min(1, 'Email is required'),
    phoneList: z.array(z.object({
        phone: z.number().min(1, 'Phone Number is required')
    })),
    whatsappNo: z.number().min(1, "WhatsApp Number is required"),
    address: z.array(
        z.object({
            title: z.string().optional(),
            detail: z.string().optional()
        })
    ).optional(),
})


export const categorySchema = z.array(
    z.object({
        id: z.string().optional(),
        text: z.string().optional()
    }))

export const addCatalogueSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(2, 'Full Name is required'),
    tagline: z.string().min(6, 'Tagline is required'),
    userName: z.string().min(2, 'User name is required'),
    backgroundColor: z.string().min(3, 'Background Color is required').default("FA00FF"),
    textColor: z.string().min(3, 'Text Color is required').default("#2BFF00"),
    paidDate: z.string(),
    category: categorySchema,
    isPaid: z.boolean().default(false).optional(),
    isActive: z.boolean().default(false),
    description: z.string().min(250, 'Description is required (MIN 250 Characters)').max(350, 'Short Description must be less than 350 characters'),
    heroImage: z.object({
        publicId: z.string().optional(),
        url: z.string().optional()
    }).optional(),
    logo: z.object({
        publicId: z.string().optional(),
        url: z.string().min(1, 'Logo is required')
    }),
    catalogueOwner: z.string().optional(),
})

export const addProductSchema = z.object({
    id: z.string().optional(),
    ownerId: z.string().min(1, 'Catalogue Owner is required'),
    name: z.string().min(2, 'Product Name is required'),
    HSNCode: z.string().min(2, 'HSN Code is required'),
    category: z.array(z.object({
        id: z.string().optional(),
        text: z.string().optional()
    })),
    price: z.number(),
    image: z.array(z.object({
        uniqueId: z.string(),
        publicId: z.string().optional(),
        url: z.string().min(1, 'Image is required')
    })),
    stock: z.boolean().default(false),
    moq: z.string().min(2, 'MOQ is required'),
    description: z.string().min(400, 'Description is required (MIN 200 Characters)').max(450, 'Short Description must be less than 400 characters'),
})

export const productResponseSchema = z.object({
    text: z.string(),
    _id: z.string(),
    products: z.array(addProductSchema),

})

export const uncategorisedProduct = z.object({
    text: z.string(),
    products: z.array(addProductSchema),
    product: z.object({
        productDetails: z.array(addProductSchema)
    }).optional(),
    id: z.string()
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

export const quoteFormSchema = z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Please enter a valid email!'),
    phone: z.number().min(1, 'Phone Number is required'),
    message: z.string().min(10, 'Message is required (MIN 10 Characters)').max(250, 'Message must be less than 250 characters'),
})



export type metaDetails = z.infer<typeof addMetaDetailsSchema>
export type catalogueDetail = z.infer<typeof addCatalogueSchema>
export type productDetail = z.infer<typeof addProductSchema>
export type productResponse = z.infer<typeof productResponseSchema>
export type uncategorisedProductResponse = z.infer<typeof uncategorisedProduct>
export type quoteFormResponse = z.infer<typeof quoteFormSchema>

export interface catalogueResponse {
    _id: string,
    createdAt: string,
    updatedAt: string,
    metaDetails: metaDetails,
}

export interface apiRes {
    success: boolean
    message?: string,
    data: catalogueResponse
}


