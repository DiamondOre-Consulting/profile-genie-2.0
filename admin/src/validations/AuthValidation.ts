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

export type HealthData = {
  apiUptime: boolean;
  responseTime: number;
  seoScore: {
    seoScore: number;
    performance: number;
    accessibility: number;
    bestPractices: number;
    fullMetrics: {
      title: string;
      fetchedAt: string;
      auditsSummary: {
        titlePresent: boolean;
        metaDescPresent: boolean;
        h1Present: boolean;
        robotsTxt: boolean;
        fontSizesOk: boolean;
      };
    };
  };
  systemStats: {
    memoryUsagePercent: string;
    cpuLoad: string;
  };
  processStats: {
    nodeHeapUsedMB: string;
    nodeRSSMB: string;
    uptimeSeconds: string;
  };
  errorRate: string;
  timestamp: string;
};
