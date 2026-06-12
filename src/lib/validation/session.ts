import { z } from "zod";

const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const sessionFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  description: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(2000).optional(),
  ),
  schedule: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(255).optional(),
  ),
  startDate: z.preprocess(emptyToUndefined, z.string().optional()),
  endDate: z.preprocess(emptyToUndefined, z.string().optional()),
  capacity: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().int().positive().optional(),
  ),
  isActive: z.preprocess(
    (val) => val === "on" || val === "true" || val === true,
    z.boolean(),
  ),
});

export type SessionFormValues = z.infer<typeof sessionFormSchema>;
