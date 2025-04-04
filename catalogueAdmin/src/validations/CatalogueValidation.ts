

import { z } from 'zod'

export const loginValidationSchema = z.object({
    email: z.string().email('Please enter a valid email!'),
    password: z.string().min(8, 'Password must be at least 8 characters long!')
})

export const addCatalogueOwnerSchema = z.object({
    catalogue: z.string().optional(),
    fullName: z.string().min(3, 'Full Name is required'),
    role: z.string().default('CATALOGUE OWNER').optional(),
    password: z.string().min(8, 'Password must be at least 8 characters long!'),
    email: z.string().email('Please enter a valid email!'),
    mapLink: z.string().optional(),
    emailList: z.array(z.object({
        email: z.string().min(1, 'Email is required')
    })).optional(),
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
    catalogueOwner: z.string().min(1, 'Catalogue Owner is required'),
})

export const addProductSchema = z.object({
    id: z.string().optional(),
    _id: z.string().optional(),
    ownerId: z.string().min(1, 'Catalogue Owner is required'),
    name: z.string().min(2, 'Product Name is required'),
    HSNCode: z.string().min(2, 'HSN Code is required'),
    category: categorySchema,
    price: z.number(),
    image: z.array(z.object({
        uniqueId: z.string(),
        publicId: z.string().optional(),
        url: z.string().min(1, 'Image is required')
    })),
    stock: z.boolean().default(false),
    moq: z.string().min(2, 'MOQ is required'),
    description: z.string().min(150, 'Description is required (MIN 200 Characters)').max(200, 'Short Description must be less than 400 characters'),
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

export type metaDetails = z.infer<typeof addMetaDetailsSchema>
export type catalogueDetail = z.infer<typeof addCatalogueSchema>
export type productDetail = z.infer<typeof addProductSchema>
export type categoryDetail = z.infer<typeof categorySchema>



export interface uncategrisedProduct {
    id: string,
    productDetails: productDetail,
}

export interface uncategorisedProductResponse {
    id: string,
    text: string,
    products: [uncategrisedProduct]
}


export interface categorisedProductResponse {
    id: string,
    text: string,
    products: [productDetail]
}

export interface catalogueResponse {
    categorisedProducts: categorisedProductResponse[],
    uncategorisedProducts: uncategorisedProductResponse[],
    data: {
        _id: string,
        name: string,
        tagline: string,
        userName: string,
        backgroundColor: string,
        textColor: string,
        paidDate: string,
        category: categoryDetail,
        isPaid?: boolean,
        isActive: boolean,
        description: string,
        heroImage?: {
            publicId?: string,
            url?: string
        },
        logo: {
            publicId?: string,
            url: string
        },
        catalogueOwner?: {
            _id: string;
            catalogue: string;
            fullName: string;
            role: string;
            mapLink: string;
            emailList?: { email: string; _id: string }[];
            phoneList: { phone: number; _id: string }[];
            address?: { title: string; detail: string; _id: string }[];
            whatsappNo: number;
            createdAt: string;
            updatedAt: string;
            __v: number;
            authAccount: {
                avatar: {
                    publicId: string;
                    url: string;
                };
                _id: string;
                fullName: string;
                email: string;
                googleId: string;
                loginType: string;
                isVerified: boolean;
                role: string;
                createdAt: string;
                updatedAt: string;
                __v: number;
                refreshToken: string;
            };
        },
        metaDetails: metaDetails,
        product: string[]
    }
}

export interface catalogueApiRes {
    success: boolean
    message?: string,
    data: catalogueResponse
}


