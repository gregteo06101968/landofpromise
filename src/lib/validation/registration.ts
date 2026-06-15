import { z } from "zod";

const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val);
const emptyToNull = (val: unknown) => (val === "" ? null : val);

export const childSchema = z.object({
  fullName: z.string().trim().min(1, "Child's name is required").max(255),
  birthdate: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const registrationFormSchema = z.object({
  communitySessionId: z.coerce.number().int().positive(),
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

export const registrationEditFormSchema = z.object({
  parentName: z.string().trim().min(1, "Parent's name is required").max(255),
  parentEmail: z.string().trim().toLowerCase().email("Enter a valid email"),
  parentPhone: z.preprocess(emptyToNull, z.string().trim().max(50).nullable()),
  childFullName: z.string().trim().min(1, "Child's name is required").max(255),
  childBirthdate: z.preprocess(emptyToNull, z.string().nullable()),
});

export type RegistrationEditFormValues = z.infer<typeof registrationEditFormSchema>;
