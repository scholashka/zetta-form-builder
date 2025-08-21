import { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

import { GroupWrapper } from "./GroupWrapper";
import { FormSchema, Field, Group } from "../types/formTypes";

import { TextInput } from "./inputs/TextInput";
import { TextArea } from "./inputs/TextArea";
import { Dropdown } from "./inputs/Dropdown";
import { CheckboxInput } from "./inputs/CheckboxInput";
import { RadioGroupInput } from "./inputs/RadioGroupInput";
import { ValidatedInput } from "./inputs/ValidatedInput";

import { validateField } from "../lib/validators";
import { callMockApi } from "../lib/apiMock";
import {
    collectAutoFills,
    hasAllInputs,
    makeAutoFillKey,
    buildPayload,
} from "../lib/autofill";
import { buildSubmission } from "../lib/submission";
import { JsonPreview } from "./JsonPreview";

type Props = { schema: FormSchema };

export function FormRenderer({ schema }: Props) {
    // form values and UX state
    const [values, setValues] = useState<Record<string, any>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [submitOutput, setSubmitOutput] = useState<any | null>(null);

    // auto-fill state
    const [loadingKeys, setLoadingKeys] = useState<Record<string, boolean>>({});
    const [doneKeys, setDoneKeys] = useState<Record<string, boolean>>({});

    // change / blur handlers
    const handleChange = (fieldId: string, value: any) => {
        setValues((prev) => ({ ...prev, [fieldId]: value }));
    };
    const handleBlur = (fieldId: string) => {
        setTouched((prev) => ({ ...prev, [fieldId]: true }));
    };

    // visibility check for groups/fields
    const isVisible = (item: Group | Field) => {
        if (!("visibleWhen" in item) || !item.visibleWhen) return true;
        return Object.entries(item.visibleWhen).every(
            ([depId, expected]) => values[depId] === expected
        );
    };

    // compute validation state for a single field
    const fieldValidation = (field: Field) => {
        const res = validateField(field, values[field.id], values);
        const showError = (touched[field.id] || submitAttempted) && !res.valid;
        return { error: showError, helperText: showError ? res.error : " " };
    };

    // render a single field (delegating to input components)
    const renderField = (field: Field) => {
        if (!isVisible(field)) return null;

        const { error, helperText } = fieldValidation(field);

        switch (field.type) {
            case "text":
                return (
                    <TextInput
                        key={field.id}
                        field={field}
                        value={values[field.id] ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error}
                        helperText={helperText}
                    />
                );
            case "textarea":
                return (
                    <TextArea
                        key={field.id}
                        field={field}
                        value={values[field.id] ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error}
                        helperText={helperText}
                    />
                );
            case "dropdown":
                return (
                    <Dropdown
                        key={field.id}
                        field={field}
                        value={values[field.id] ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error}
                        helperText={helperText}
                    />
                );
            case "checkbox":
                return (
                    <CheckboxInput
                        key={field.id}
                        field={field}
                        value={Boolean(values[field.id])}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error}
                        helperText={helperText}
                    />
                );
            case "radio":
                return (
                    <RadioGroupInput
                        key={field.id}
                        field={field}
                        value={values[field.id] ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error}
                        helperText={helperText}
                    />
                );
            case "validatedInput":
                return (
                    <ValidatedInput
                        key={field.id}
                        field={field}
                        value={values[field.id] ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error}
                        helperText={helperText}
                    />
                );
            default:
                return null;
        }
    };

    const renderGroup = (group: Group, depth = 0) => {
        if (!isVisible(group)) return null;

        return (
            <GroupWrapper key={group.id} label={group.label} depth={depth}>
                {group.fields?.map(renderField)}
                {group.groups?.map((child) => renderGroup(child, depth + 1))}
            </GroupWrapper>
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);

        let invalid = false;
        const walk = (g: Group) => {
            g.fields?.forEach((f) => {
                if (!isVisible(f)) return;
                const res = validateField(f, values[f.id], values);
                if (!res.valid) invalid = true;
            });
            g.groups?.forEach(walk);
        };
        schema.groups.forEach(walk);

        if (invalid) return;

        const output = buildSubmission(schema, values, isVisible);
        setSubmitOutput(output);
    };

    // auto-fill effect
    useEffect(() => {
        const autoFills = collectAutoFills(schema);

        autoFills.forEach(async ({ autoFill }) => {
            if (!hasAllInputs(autoFill, values)) return;

            const key = makeAutoFillKey(autoFill, values);
            if (doneKeys[key] || loadingKeys[key]) return;

            setLoadingKeys((m) => ({ ...m, [key]: true }));
            try {
                const payload = buildPayload(autoFill, values);
                const resp = await callMockApi(autoFill.api, payload);

                setValues((prev) => {
                    const next = { ...prev };
                    Object.entries(autoFill.map).forEach(([apiKey, fieldId]) => {
                        if (resp[apiKey] !== undefined) next[fieldId] = resp[apiKey];
                    });
                    return next;
                });
            } finally {
                setLoadingKeys((m) => ({ ...m, [key]: false }));
                setDoneKeys((m) => ({ ...m, [key]: true }));
            }
        });
    }, [schema, values, loadingKeys, doneKeys]);

    const anyLoading = Object.values(loadingKeys).some(Boolean);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
            <Typography variant="h5" gutterBottom>
                {schema.title}
            </Typography>

            {anyLoading && (
                <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={16} />
                    <Typography variant="body2">Auto-filling…</Typography>
                </Box>
            )}

            {schema.groups.map((g) => renderGroup(g))}

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
            {submitOutput && (
                <JsonPreview data={submitOutput} onClose={() => setSubmitOutput(null)} />
            )}
        </Box>
    );
}