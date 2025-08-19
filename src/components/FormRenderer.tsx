import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GroupWrapper } from "./GroupWrapper";
import { FormSchema, Field, Group } from "../types/formTypes";
import { TextInput } from "./inputs/TextInput";
import { TextArea } from "./inputs/TextArea";
import { Dropdown } from "./inputs/Dropdown";
import { CheckboxInput } from "./inputs/CheckboxInput";
import { RadioGroupInput } from "./inputs/RadioGroupInput";
import { ValidatedInput } from "./inputs/ValidatedInput";
import { validateField } from "../lib/validators";

type Props = { schema: FormSchema };

export function FormRenderer({ schema }: Props) {
    const [values, setValues] = useState<Record<string, any>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleChange = (fieldId: string, value: any) => {
        setValues((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleBlur = (fieldId: string) => {
        setTouched((prev) => ({ ...prev, [fieldId]: true }));
    };

    const isVisible = (item: Group | Field) => {
        if (!item.visibleWhen) return true;
        return Object.entries(item.visibleWhen).every(
            ([depId, expected]) => values[depId] === expected
        );
    };

    const fieldValidation = (field: Field) => {
        const res = validateField(field, values[field.id], values);
        const showError = (touched[field.id] || submitAttempted) && !res.valid;
        return { error: showError, helperText: showError ? res.error : " " };
    };

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
                {group.groups?.map((g) => renderGroup(g, depth + 1))}
            </GroupWrapper>
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);

        // block submit if any visible field invalid
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
        console.log("✅ Submit values:", values);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography variant="h5" gutterBottom>{schema.title}</Typography>
            {schema.groups.map((g) => renderGroup(g))}
            <Button type="submit" variant="contained">Submit</Button>
        </Box>
    );
}