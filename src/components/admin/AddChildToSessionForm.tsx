import { FormSelect } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { addChildToSession } from "@/lib/actions/attendance";

type ChildOption = {
  childId: number;
  childName: string;
  parentName: string;
};

export function AddChildToSessionForm({
  communitySessionId,
  availableChildren,
}: {
  communitySessionId: number;
  availableChildren: ChildOption[];
}) {
  if (availableChildren.length === 0) {
    return null;
  }

  return (
    <form
      action={async (formData) => {
        "use server";
        await addChildToSession(communitySessionId, Number(formData.get("childId")));
      }}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-end sm:gap-4"
    >
      <div className="flex-1">
        <FormSelect label="Add a child not registered for this session" name="childId" required>
          {availableChildren.map((child) => (
            <option key={child.childId} value={child.childId}>
              {child.childName} (Parent: {child.parentName})
            </option>
          ))}
        </FormSelect>
      </div>
      <SubmitButton pendingText="Adding...">Add to session</SubmitButton>
    </form>
  );
}
