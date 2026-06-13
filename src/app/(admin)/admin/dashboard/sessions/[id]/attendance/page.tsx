import { notFound } from "next/navigation";
import { AddChildToSessionForm } from "@/components/admin/AddChildToSessionForm";
import { AttendanceDatePicker } from "@/components/admin/AttendanceDatePicker";
import { AttendanceForm } from "@/components/admin/AttendanceForm";
import { SessionTabs } from "@/components/admin/SessionTabs";
import { getAttendanceForDate, getChildrenNotInSession, getCommunitySessionById } from "@/db/queries";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default async function SessionAttendancePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string }>;
}) {
  const { id } = await params;
  const { date } = await searchParams;
  const sessionId = Number(id);
  const attendanceDate = date || todayIso();

  const [session, rows, availableChildren] = await Promise.all([
    getCommunitySessionById(sessionId),
    getAttendanceForDate(sessionId, attendanceDate),
    getChildrenNotInSession(sessionId),
  ]);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-navy-deep">{session.title}</h1>
      <SessionTabs sessionId={sessionId} active="attendance" />

      <AttendanceDatePicker sessionId={sessionId} date={attendanceDate} />

      <AttendanceForm communitySessionId={sessionId} attendanceDate={attendanceDate} rows={rows} />

      <AddChildToSessionForm communitySessionId={sessionId} availableChildren={availableChildren} />
    </div>
  );
}
