import { z } from "zod";

const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const objectiveFormSchema = z.object({
  weekNumber: z.coerce.number().int().positive(),
  title: z.string().trim().min(1, "Title is required").max(255),
  description: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(2000).optional(),
  ),
});

export type ObjectiveFormValues = z.infer<typeof objectiveFormSchema>;

export const attendanceFormSchema = z.object({
  attendanceDate: z.string().min(1, "Date is required"),
  registrationIds: z.array(z.coerce.number().int().positive()),
});

export type AttendanceFormValues = z.infer<typeof attendanceFormSchema>;

export const observationFormSchema = z.object({
  registrationId: z.coerce.number().int().positive(),
  note: z.string().trim().min(1, "Observation is required").max(2000),
});

export type ObservationFormValues = z.infer<typeof observationFormSchema>;

export const progressRatingValues = [
  "needs_improvement",
  "developing",
  "meets_expectations",
  "exceeds_expectations",
] as const;

export const progressAssessmentFormSchema = z.object({
  registrationId: z.coerce.number().int().positive(),
  rating: z.enum(progressRatingValues),
  notes: z.preprocess(emptyToUndefined, z.string().trim().max(2000).optional()),
});

export type ProgressAssessmentFormValues = z.infer<typeof progressAssessmentFormSchema>;

export const mediaCaptionSchema = z.preprocess(
  emptyToUndefined,
  z.string().trim().max(255).optional(),
);

export const sessionRunFormSchema = z.object({
  startedAt: z.string().min(1, "Start time is required"),
  registrationIds: z.array(z.coerce.number().int().positive()),
  presentIds: z.array(z.coerce.number().int().positive()),
});

export type SessionRunFormValues = z.infer<typeof sessionRunFormSchema>;

export const sessionRunNoteSchema = z.preprocess(
  emptyToUndefined,
  z.string().trim().max(2000).optional(),
);
