import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { admins, children, classSessions, parents, registrations } from "@/db/schema";

export async function getActiveClassSessions() {
  return db
    .select()
    .from(classSessions)
    .where(eq(classSessions.isActive, true))
    .orderBy(desc(classSessions.createdAt));
}

export async function getAllClassSessions() {
  return db
    .select()
    .from(classSessions)
    .orderBy(desc(classSessions.createdAt));
}

export async function getClassSessionById(id: number) {
  const [session] = await db
    .select()
    .from(classSessions)
    .where(eq(classSessions.id, id));

  return session;
}

export async function getRegistrationsForSession(classSessionId: number) {
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
    .where(eq(registrations.classSessionId, classSessionId))
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
