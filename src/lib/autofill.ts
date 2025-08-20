import { FormSchema, Group, AutoFillConfig } from "../types/formTypes";

export type AutoFillTarget = {
    path: string[];
    level: "group" | "field";
    autoFill: AutoFillConfig;
};

export function collectAutoFills(schema: FormSchema): AutoFillTarget[] {
    const acc: AutoFillTarget[] = [];
    function walk(group: Group, path: string[]) {
        if (group.autoFill) {
            acc.push({ path, level: "group", autoFill: group.autoFill });
        }
        group.fields?.forEach((f) => {
            if (f.autoFill)
                acc.push({ path, level: "field", autoFill: f.autoFill });
        });
        group.groups?.forEach((g) => walk(g, [...path, g.id]));
    }
    schema.groups.forEach((g) => walk(g, [g.id]));
    return acc;
}

export function hasAllInputs(
    autoFill: AutoFillConfig,
    values: Record<string, any>
) {
    return autoFill.inputFields.every((id) => {
        const v = values[id];
        return v !== undefined && v !== null && `${v}`.trim() !== "";
    });
}

export function makeAutoFillKey(
    autoFill: AutoFillConfig,
    values: Record<string, any>
) {
    const payload = autoFill.inputFields.reduce((o, id) => {
        o[id] = values[id];
        return o;
    }, {} as Record<string, any>);
    return `${autoFill.api}:${JSON.stringify(payload)}`;
}

export function buildPayload(
    autoFill: AutoFillConfig,
    values: Record<string, any>
) {
    return autoFill.inputFields.reduce((o, id) => {
        o[id] = values[id];
        return o;
    }, {} as Record<string, any>);
}
