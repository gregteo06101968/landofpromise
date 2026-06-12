import { z } from "zod";

export const adminFormSchema = z.object({
  name: z.string().trim().max(255).optional(),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type AdminFormValues = z.infer<typeof adminFormSchema>;
