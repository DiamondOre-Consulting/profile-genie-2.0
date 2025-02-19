import { z } from 'zod'

export const addProfileDetailSchema = z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    phoneNumber: z.number().min(1, 'Phone Number is required'),
    email: z.string().email('Invalid email'),
    userName: z.string().min(1, 'Username is required'),
    tagline: z.string().min(1, 'Tagline is required').optional(),
    image: z.object({
        publicId: z.string().optional(),
        url: z.string().min(1, 'Image is required')
    }),
    backgroundImage: z.object({
        publicId: z.string().optional(),
        url: z.string().optional()
    }),
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