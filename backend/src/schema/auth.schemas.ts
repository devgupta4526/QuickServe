import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);

const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

// export const registerSchema = loginSchema
//   .extend({
//     confirmPassword: passwordSchema,
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

export const registerSchema = z
  .object({
    username: z.string().min(3).max(20),
    fullName: z.string().min(2).max(50),
    email: emailSchema,
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
    bio: z.string().max(250).optional().or(z.literal("")),
    role: z.enum(["SUPER_ADMIN",
        "BUSINESS_OWNER",
        "EMPLOYEE"]),
    avatar: z.any().optional(), // Expect `File` or URL from frontend
    coverImage: z.any().optional(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verificationCodeSchema = z.string().min(1).max(24);

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});
