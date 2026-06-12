import { z } from "zod";

const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const childSchema = z.object({
  fullName: z.string().trim().min(1, "Child's name is required").max(255),
  birthdate: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const registrationFormSchema = z.object({
  classSessionId: z.coerce.number().int().positive(),
  parentName: z.string().trim().min(1, "Your name is required").max(255),
  parentEmail: z.string().trim().toLowerCase().email("Enter a valid email"),
  parentPhone: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(50).optional(),
  ),
  children: z
    .array(childSchema)
    .min(1, "Add at least one child to register"),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
