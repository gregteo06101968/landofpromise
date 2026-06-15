import { z } from "zod";

const emptyToNull = (val: unknown) => (val === "" ? null : val);

export const sessionFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  description: z.preprocess(
    emptyToNull,
    z.string().trim().max(2000).nullable(),
  ),
  schedule: z.preprocess(
    emptyToNull,
    z.string().trim().max(255).nullable(),
  ),
  startDate: z.preprocess(emptyToNull, z.string().nullable()),
  endDate: z.preprocess(emptyToNull, z.string().nullable()),
  capacity: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? null : Number(val)),
    z.number().int().positive().nullable(),
  ),
  isActive: z.preprocess(
    (val) => val === "on" || val === "true" || val === true,
    z.boolean(),
  ),
});

export type SessionFormValues = z.infer<typeof sessionFormSchema>;
