import { and, desc, eq, inArray, notInArray } from "drizzle-orm";
import { db } from "@/db";
import {
  admins,
  attendanceRecords,
  children,
  communitySessions,
  objectiveSessionRuns,
  observations,
  parents,
  progressAssessments,
  registrations,
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
  return db
    .select({
      id: registrations.id,
      status: registrations.status,
      registeredAt: registrations.registeredAt,
      sessionId: communitySessions.id,
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
    .orderBy(desc(registrations.registeredAt));
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

export async function getSessionObjectives(communitySessionId: number) {
  return db
    .select()
    .from(sessionObjectives)
    .where(eq(sessionObjectives.communitySessionId, communitySessionId))
    .orderBy(sessionObjectives.weekNumber);
}

export async function getSessionObjectiveById(id: number) {
  const [objective] = await db
    .select()
    .from(sessionObjectives)
    .where(eq(sessionObjectives.id, id));

  return objective;
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

  return { ...run, rows };
}
