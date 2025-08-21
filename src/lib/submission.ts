import { FormSchema, Group, Field, SubmittedGroup } from "../types/formTypes";

// Build a hierarchical JSON object that mirrors the schema’s group structure,
// including ONLY groups/fields that are currently visible and have values.
export function buildSubmission(
    schema: FormSchema,
    values: Record<string, any>,
    isVisible: (item: Group | Field) => boolean
): { title: string; groups: SubmittedGroup[] } {
    return {
        title: schema.title,
        groups: schema.groups
            .map((g) => buildGroup(g, values, isVisible))
            .filter((g): g is SubmittedGroup => g !== null),
    };
}

function buildGroup(
    group: Group,
    values: Record<string, any>,
    isVisible: (item: Group | Field) => boolean
): SubmittedGroup | null {
    if (!isVisible(group)) return null;

    const fields = (group.fields ?? [])
        .filter((f) => isVisible(f))
        .map((f) => {
            const val = values[f.id];
            if (val === undefined || val === null || val === "") return null;
            return { id: f.id, label: f.label, value: val };
        })
        .filter(Boolean) as { id: string; label: string; value: any }[];

    const children = (group.groups ?? [])
        .map((child) => buildGroup(child, values, isVisible))
        .filter((g): g is SubmittedGroup => g !== null);

    if (fields.length === 0 && children.length === 0) return null;

    return {
        id: group.id,
        label: group.label,
        fields,
        groups: children,
    };
}
