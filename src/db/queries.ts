import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { admins, children, communitySessions, parents, registrations } from "@/db/schema";

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
