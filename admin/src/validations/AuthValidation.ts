import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long!"),
});

export const sendMail = z.object({
  email: z.string().email().optional(),
  mailSubject: z.string().min(1, "Message body is required!"),
  mailBody: z.string().min(1, "Message body is required!"),
});

export type loginValidation = z.infer<typeof loginValidationSchema>;
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
export type sendMailType = z.infer<typeof sendMail>;
