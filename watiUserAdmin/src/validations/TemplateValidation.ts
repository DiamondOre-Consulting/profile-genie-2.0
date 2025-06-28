import { z } from "zod";

const headerComponent = z.object({
  type: z.literal("HEADER"),
  format: z
    .enum(["NONE", "TEXT", "IMAGE", "VIDEO", "DOCUMENT"])
    .default("NONE"),
  text: z.string().optional(),
  media_url: z.string().optional(),
  media_id: z.string().optional(),
  example: z.object({
    header_text: z.array(z.string()).optional(),
    header_handle: z.array(z.string()).optional(),
    header_text_named_params: z
      .array(
        z.object({
          param_name: z.string(),
          example: z.string(),
        })
      )
      .optional(),
  }),
});

const bodyComponent = z.object({
  type: z.string().default("BODY"),
  text: z.string().optional(),
  add_security_recommendation: z.boolean().optional(),
  example: z.object({
    body_text: z.array(z.string()).optional(), // ✅ stricter
    body_handle: z.array(z.string()).optional(),
    body_text_named_params: z
      .array(
        z.object({
          param_name: z.string(),
          example: z.string(),
        })
      )
      .optional(),
  }),
});

const footerComponent = z.object({
  type: z.string().default("FOOTER"),
  text: z.string().optional(),
});

const buttonComponent = z.object({
  type: z.string().default("BUTTONS"),
  code_expiration_minutes: z.number().optional(),
  buttons: z
    .array(
      z.object({
        otp_type: z.enum(["ONE_TAP", "COPY_CODE"]).optional(),
        autofill_text: z.string().optional(),
        text: z.string().optional(),
        url: z.string().optional(),
        type: z
          .enum(["QUICK_REPLY", "URL", "PHONE_NUMBER", "COPY_CODE"])
          .optional(),
        phone_number: z.string().optional(),
        example: z.string().optional(),
        package_name: z.string().optional(),
        signature_hash: z.string().optional(),
      })
    )
    .optional(),
});

export const addTemplateSchema = z.object({
  name: z.string().min(3, "Template name is required"),
  category: z.string().min(1, "Category is required"),
  language: z.string().min(1, "Language is required"),
  validity_period: z.number().min(60).max(86400).optional(),
  component: z.object({
    header: headerComponent,
    body: bodyComponent,
    footer: footerComponent,
    button: buttonComponent,
  }),
});

export type templateSchema = z.infer<typeof addTemplateSchema>;

export interface apiRes {
  success: boolean;
  message?: string;
  data: templateSchema;
}
