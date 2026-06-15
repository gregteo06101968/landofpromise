import { and, desc, eq, inArray, notInArray } from "drizzle-orm";
import { db } from "@/db";
import {
  admins,
  attendanceRecords,
  children,
  communitySessions,
  objectiveReviewQuestions,
  objectiveSessionRuns,
  observations,
  parents,
  progressAssessments,
  registrations,
  reviewQuestionResponses,
  sessionMedia,
  sessionObjectives,
} from "@/db/schema";

export async function getActiveCommunitySessions() {
  return db
    .select()
    .from(communitySessions)
    .where(eq(communitySessions.isActive, true))
    .orderBy(desc(communitySessions.createdAt));
}

export async function getAllCommunitySessions() {
  return db
    .select()
    .from(communitySessions)
    .orderBy(desc(communitySessions.createdAt));
}

export async function getCommunitySessionById(id: number) {
  const [session] = await db
    .select()
    .from(communitySessions)
    .where(eq(communitySessions.id, id));

  return session;
}

export async function getRegistrationsForSession(communitySessionId: number) {
  return db
    .select({
      id: registrations.id,
      status: registrations.status,
      registeredAt: registrations.registeredAt,
      childName: children.fullName,
      childBirthdate: children.birthdate,
      parentName: parents.name,
      parentEmail: parents.email,
      parentPhone: parents.phone,
    })
    .from(registrations)
    .innerJoin(children, eq(registrations.childId, children.id))
    .innerJoin(parents, eq(registrations.parentId, parents.id))
    .where(eq(registrations.communitySessionId, communitySessionId))
    .orderBy(desc(registrations.registeredAt));
}

export async function getAllRegistrations() {
  const rows = await db
    .select({
      id: registrations.id,
      registeredAt: registrations.registeredAt,
      childName: children.fullName,
      parentName: parents.name,
      parentEmail: parents.email,
    })
    .from(registrations)
    .innerJoin(children, eq(registrations.childId, children.id))
    .innerJoin(parents, eq(registrations.parentId, parents.id))
    .orderBy(desc(registrations.registeredAt));

  // Collapse multiple session registrations for the same child/parent
  // down to a single row, keeping the most recent one.
  const seen = new Set<string>();
  const deduped: typeof rows = [];
  for (const row of rows) {
    const key = `${row.parentEmail}|${row.childName.trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
  }
  return deduped;
}

export async function listAdmins() {
  return db
    .select({
      id: admins.id,
      email: admins.email,
      name: admins.name,
      createdAt: admins.createdAt,
    })
    .from(admins)
    .orderBy(desc(admins.createdAt));
}

export async function getReviewQuestionsForObjectives(sessionObjectiveIds: number[]) {
  if (sessionObjectiveIds.length === 0) {
    return new Map<number, { id: number; question: string }[]>();
  }

  const questions = await db
    .select({
      id: objectiveReviewQuestions.id,
      sessionObjectiveId: objectiveReviewQuestions.sessionObjectiveId,
      question: objectiveReviewQuestions.question,
    })
    .from(objectiveReviewQuestions)
    .where(inArray(objectiveReviewQuestions.sessionObjectiveId, sessionObjectiveIds))
    .orderBy(objectiveReviewQuestions.position);

  const byObjective = new Map<number, { id: number; question: string }[]>();
  for (const { sessionObjectiveId, ...question } of questions) {
    const list = byObjective.get(sessionObjectiveId) ?? [];
    list.push(question);
    byObjective.set(sessionObjectiveId, list);
  }
  return byObjective;
}

export async function getSessionObjectives(communitySessionId: number) {
  const objectives = await db
    .select()
    .from(sessionObjectives)
    .where(eq(sessionObjectives.communitySessionId, communitySessionId))
    .orderBy(sessionObjectives.weekNumber);

  const reviewQuestionsByObjective = await getReviewQuestionsForObjectives(
    objectives.map((objective) => objective.id),
  );

  return objectives.map((objective) => ({
    ...objective,
    reviewQuestions: reviewQuestionsByObjective.get(objective.id) ?? [],
  }));
}

export async function getSessionObjectiveById(id: number) {
  const [objective] = await db
    .select()
    .from(sessionObjectives)
    .where(eq(sessionObjectives.id, id));

  if (!objective) {
    return undefined;
  }

  const reviewQuestionsByObjective = await getReviewQuestionsForObjectives([objective.id]);

  return {
    ...objective,
    reviewQuestions: reviewQuestionsByObjective.get(objective.id) ?? [],
  };
}

export async function getChildrenNotInSession(communitySessionId: number) {
  const registeredChildIds = db
    .select({ childId: registrations.childId })
    .from(registrations)
    .where(eq(registrations.communitySessionId, communitySessionId));

  return db
    .select({
      childId: children.id,
      childName: children.fullName,
      parentName: parents.name,
    })
    .from(children)
    .innerJoin(parents, eq(children.parentId, parents.id))
    .where(notInArray(children.id, registeredChildIds))
    .orderBy(children.fullName);
}

export async function getAttendanceForDate(
  communitySessionId: number,
  attendanceDate: string,
) {
  return db
    .select({
      registrationId: registrations.id,
      childName: children.fullName,
      present: attendanceRecords.present,
    })
    .from(registrations)
    .innerJoin(children, eq(registrations.childId, children.id))
    .leftJoin(
      attendanceRecords,
      and(
        eq(attendanceRecords.registrationId, registrations.id),
        eq(attendanceRecords.attendanceDate, attendanceDate),
      ),
    )
    .where(eq(registrations.communitySessionId, communitySessionId))
    .orderBy(children.fullName);
}

export async function getRegistrationDetail(registrationId: number) {
  const [row] = await db
    .select({
      id: registrations.id,
      communitySessionId: registrations.communitySessionId,
      sessionTitle: communitySessions.title,
      childName: children.fullName,
      childBirthdate: children.birthdate,
      parentName: parents.name,
      parentEmail: parents.email,
      parentPhone: parents.phone,
    })
    .from(registrations)
    .innerJoin(children, eq(registrations.childId, children.id))
    .innerJoin(parents, eq(registrations.parentId, parents.id))
    .innerJoin(
      communitySessions,
      eq(registrations.communitySessionId, communitySessions.id),
    )
    .where(eq(registrations.id, registrationId));

  return row;
}

export async function getRegistrationForEdit(registrationId: number) {
  const [row] = await db
    .select({
      id: registrations.id,
      childId: registrations.childId,
      parentId: registrations.parentId,
      childName: children.fullName,
      childBirthdate: children.birthdate,
      parentName: parents.name,
      parentEmail: parents.email,
      parentPhone: parents.phone,
    })
    .from(registrations)
    .innerJoin(children, eq(registrations.childId, children.id))
    .innerJoin(parents, eq(registrations.parentId, parents.id))
    .where(eq(registrations.id, registrationId));

  return row;
}

export async function getObservationsForRegistration(registrationId: number) {
  return db
    .select({
      id: observations.id,
      note: observations.note,
      createdAt: observations.createdAt,
      createdByName: admins.name,
      createdByEmail: admins.email,
    })
    .from(observations)
    .leftJoin(admins, eq(observations.createdByAdminId, admins.id))
    .where(eq(observations.registrationId, registrationId))
    .orderBy(desc(observations.createdAt));
}

export async function getProgressAssessmentsForRegistration(registrationId: number) {
  return db
    .select({
      id: progressAssessments.id,
      rating: progressAssessments.rating,
      notes: progressAssessments.notes,
      createdAt: progressAssessments.createdAt,
      createdByName: admins.name,
      createdByEmail: admins.email,
    })
    .from(progressAssessments)
    .leftJoin(admins, eq(progressAssessments.createdByAdminId, admins.id))
    .where(eq(progressAssessments.registrationId, registrationId))
    .orderBy(desc(progressAssessments.createdAt));
}

export async function getSessionMedia(communitySessionId: number) {
  return db
    .select()
    .from(sessionMedia)
    .where(eq(sessionMedia.communitySessionId, communitySessionId))
    .orderBy(desc(sessionMedia.createdAt));
}

export async function getSessionRunsForObjective(sessionObjectiveId: number) {
  const runs = await db
    .select({
      id: objectiveSessionRuns.id,
      startedAt: objectiveSessionRuns.startedAt,
      endedAt: objectiveSessionRuns.endedAt,
      durationSeconds: objectiveSessionRuns.durationSeconds,
    })
    .from(objectiveSessionRuns)
    .where(eq(objectiveSessionRuns.sessionObjectiveId, sessionObjectiveId))
    .orderBy(desc(objectiveSessionRuns.startedAt));

  if (runs.length === 0) {
    return [];
  }

  const runIds = runs.map((run) => run.id);

  const attendance = await db
    .select({
      sessionRunId: attendanceRecords.sessionRunId,
      present: attendanceRecords.present,
    })
    .from(attendanceRecords)
    .where(inArray(attendanceRecords.sessionRunId, runIds));

  const counts = new Map<number, { present: number; total: number }>();
  for (const row of attendance) {
    if (row.sessionRunId === null) continue;
    const entry = counts.get(row.sessionRunId) ?? { present: 0, total: 0 };
    entry.total += 1;
    if (row.present) entry.present += 1;
    counts.set(row.sessionRunId, entry);
  }

  return runs.map((run) => ({
    ...run,
    presentCount: counts.get(run.id)?.present ?? 0,
    totalCount: counts.get(run.id)?.total ?? 0,
  }));
}

export async function getSessionRunDetail(runId: number) {
  const [run] = await db
    .select({
      id: objectiveSessionRuns.id,
      sessionObjectiveId: objectiveSessionRuns.sessionObjectiveId,
      communitySessionId: objectiveSessionRuns.communitySessionId,
      startedAt: objectiveSessionRuns.startedAt,
      endedAt: objectiveSessionRuns.endedAt,
      durationSeconds: objectiveSessionRuns.durationSeconds,
    })
    .from(objectiveSessionRuns)
    .where(eq(objectiveSessionRuns.id, runId));

  if (!run) {
    return undefined;
  }

  const rows = await db
    .select({
      registrationId: registrations.id,
      childName: children.fullName,
      present: attendanceRecords.present,
      note: observations.note,
    })
    .from(registrations)
    .innerJoin(children, eq(registrations.childId, children.id))
    .leftJoin(
      attendanceRecords,
      and(
        eq(attendanceRecords.registrationId, registrations.id),
        eq(attendanceRecords.sessionRunId, runId),
      ),
    )
    .leftJoin(
      observations,
      and(
        eq(observations.registrationId, registrations.id),
        eq(observations.sessionRunId, runId),
      ),
    )
    .where(eq(registrations.communitySessionId, run.communitySessionId))
    .orderBy(children.fullName);

  const reviewQuestionsByObjective = await getReviewQuestionsForObjectives([
    run.sessionObjectiveId,
  ]);
  const reviewQuestions = reviewQuestionsByObjective.get(run.sessionObjectiveId) ?? [];

  const responses = await db
    .select({
      registrationId: reviewQuestionResponses.registrationId,
      reviewQuestionId: reviewQuestionResponses.reviewQuestionId,
      checked: reviewQuestionResponses.checked,
    })
    .from(reviewQuestionResponses)
    .where(eq(reviewQuestionResponses.sessionRunId, runId));

  const checkedByRegistration = new Map<number, Set<number>>();
  for (const response of responses) {
    if (!response.checked) continue;
    const set = checkedByRegistration.get(response.registrationId) ?? new Set<number>();
    set.add(response.reviewQuestionId);
    checkedByRegistration.set(response.registrationId, set);
  }

  return {
    ...run,
    reviewQuestions,
    rows: rows.map((row) => ({
      ...row,
      checkedReviewQuestionIds: Array.from(
        checkedByRegistration.get(row.registrationId) ?? [],
      ),
    })),
  };
}
