import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

export const productListSchema = z.object({
  tagline: z.string().optional(),
  productList: z
    .array(
      z.object({
        uniqueId: z.string().optional(),
        title: z.string().optional(),
        detail: z.string().optional(),
        image: z
          .object({
            publicId: z.string().optional(),
            url: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),
});

export const addProfileDetailSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phoneNumber: z.number().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email"),
  userName: z.string().min(1, "Username is required"),
  tagline: z.string().min(1, "Tagline is required"),
  paidDate: z.string(),
  views: z.number().optional(),
  isPaid: z.boolean().default(false).optional(),
  isActive: z.boolean().default(false),
  SOS: z.array(
    z.object({
      fullName: z.string().min(1, "Full name is required"),
      phoneNumber: z.number().min(1, "Phone Number is required"),
    })
  ),
  shortDescription: z.string().optional(),
  image: z.object({
    publicId: z.string().optional(),
    url: z.string().min(1, "Image is required"),
  }),
  backgroundImage: z
    .object({
      publicId: z.string().optional(),
      url: z.string().optional(),
    })
    .optional(),
  logo: z
    .object({
      publicId: z.string().optional(),
      url: z.string().optional(),
    })
    .optional(),
  about: z.object({
    head: z.string().min(1, "About head is required"),
    body: z
      .string()
      .refine((val) => val.replace(/<[^>]*>/g, "").trim().length > 0, {
        message: "Body content cannot be empty",
      }),
  }),
});

export const addOthersDetailSchema = z.object({
  brands: z.object({
    tagline: z.string().optional(),
    brandList: z
      .array(
        z.object({
          uniqueId: z.string().optional(),
          brandName: z.string().optional(),
          image: z
            .object({
              publicId: z.string().optional(),
              url: z.string().optional(),
            })
            .optional(),
        })
      )
      .optional(),
  }),
  bulkLink: z.object({
    tagline: z.string().optional(),
    bulkLinkList: z
      .array(
        z.object({
          linkName: z.string().optional(),
          link: z.string().optional(),
          uniqueId: z.string().optional(),
          image: z
            .object({
              publicId: z.string().optional(),
              url: z.string().optional(),
            })
            .optional(),
        })
      )
      .optional(),
  }),
  services: z.object({
    tagline: z.string().optional(),
    serviceList: z
      .array(
        z.object({
          uniqueId: z.string().optional(),
          title: z.string().optional(),
          detail: z.string().optional(),
          image: z
            .object({
              publicId: z.string().optional(),
              url: z.string().optional(),
            })
            .optional(),
        })
      )
      .optional(),
  }),
  products: productListSchema,
});

export const addContactDetailSchema = z.object({
  testimonial: z.object({
    tagline: z.string().optional(),
    testimonialList: z.array(
      z.object({
        uniqueId: z.string(),
        name: z.string(),
        detail: z.string(),
        star: z.number(),
      })
    ),
  }),
  mapLink: z.string().optional(),
  contactCSV: z.string().optional(),
  emailList: z
    .array(
      z.object({
        email: z.string().min(1, "Email is required"),
      })
    )
    .optional(),
  phoneList: z.array(
    z.object({
      phone: z.number().min(1, "Phone Number is required"),
    })
  ),
  whatsappNo: z.number().min(1, "WhatsApp Number is required"),
  brochureLink: z
    .object({
      tagline: z.string().optional(),
      link: z.string().optional(),
    })
    .optional(),
  address: z
    .array(
      z.object({
        title: z.string().optional(),
        detail: z.string().optional(),
      })
    )
    .optional(),
  social: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    googleLink: z.string().optional(),
    otherSocialList: z
      .array(
        z.object({
          uniqueId: z.string().optional(),
          img: z.object({
            publicId: z.string().optional(),
            url: z.string(),
          }),
          link: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const addMetaDetailsSchema = z.object({
  favIcon: z.object({
    url: z.string().min(1, "Image is required"),
    publicId: z.string().optional(),
  }),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(50, "Description is required(MIN 50 Characters)"),
  keywords: z.string().min(1, "Keywords is required"),
  canonical: z.string().min(3, "Canonical is required"),
});

export const addPreviewSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  tagline: z.string().min(5, "Tagline is required"),
  shortDescription: z
    .string()
    .min(150, "Short Description is required (MIN 150 Characters)")
    .max(200, "Short Description must be less than 200 characters"),
});

export type loginValidation = z.infer<typeof loginValidationSchema>;
export type profileDetail = z.infer<typeof addProfileDetailSchema>;
export type metaDetails = z.infer<typeof addMetaDetailsSchema>;
export type contactDetails = z.infer<typeof addContactDetailSchema>;
export type otherDetails = z.infer<typeof addOthersDetailSchema>;
export type productLists = z.infer<typeof productListSchema>;
export type previewData = z.infer<typeof addPreviewSchema>;

export interface portfolioResponse extends profileDetail {
  _id: string;
  createdAt: string;
  updatedAt: string;
  metaDetails: metaDetails;
  contactData: contactDetails;
  otherDetails: otherDetails;
}

export interface apiRes {
  success: boolean;
  message?: string;
  data: portfolioResponse;
}
