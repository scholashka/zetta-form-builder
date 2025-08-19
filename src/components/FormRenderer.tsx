import { Box, Button, Typography } from "@mui/material";
import { GroupWrapper } from "./GroupWrapper";
import { FormSchema, Field, Group } from "../types/formTypes";
import { TextInput } from "./inputs/TextInput";
import { TextArea } from "./inputs/TextArea";
import { Dropdown } from "./inputs/Dropdown";
import { CheckboxInput } from "./inputs/CheckboxInput";
import { RadioGroupInput } from "./inputs/RadioGroupInput";
import { ValidatedInput } from "./inputs/ValidatedInput";
import { useState } from "react";

type Props = { schema: FormSchema };

export function FormRenderer({ schema }: Props) {
    const [values, setValues] = useState<Record<string, any>>({});
    const handleChange = (fieldId: string, value: any) => {
        setValues((prev) => ({ ...prev, [fieldId]: value }));
    };
    const isVisible = (
        item: Group | Field,
        currentValues: Record<string, any>
    ) => {
        if (!item.visibleWhen) return true;
        return Object.entries(item.visibleWhen).every(
            ([fieldId, expectedValue]) => currentValues[fieldId] === expectedValue
        );
    };
    const renderField = (field: Field) => {
        if (!isVisible(field, values)) return null;

        switch (field.type) {
            case "text":
                return <TextInput key={field.id} field={field} value={values[field.id] || ""} onChange={handleChange} />;
            case "textarea":
                return <TextArea key={field.id} field={field} value={values[field.id] || ""} onChange={handleChange} />;
            case "dropdown":
                return <Dropdown key={field.id} field={field} value={values[field.id] || ""} onChange={handleChange} />;
            case "checkbox":
                return <CheckboxInput key={field.id} field={field} value={values[field.id] || ""} onChange={handleChange} />;
            case "radio":
                return <RadioGroupInput key={field.id} field={field} value={values[field.id] || ""} onChange={handleChange} />;
            case "validatedInput":
                return <ValidatedInput key={field.id} field={field} value={values[field.id] || ""} onChange={handleChange} />;
            // Add more cases for other field types as needed
            default:
                return null;
        }
    };
    const renderGroup = (group: Group, depth = 0) => {
        if (!isVisible(group, values)) return null;

        return (
            <GroupWrapper key={group.id} label={group.label} depth={depth}>
                {group.fields?.map(renderField)}
                {group.groups?.map((child) => renderGroup(child, depth + 1))}
            </GroupWrapper>
        );
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted values:", values);
    };

    return (
        <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" gutterBottom>
                {schema.title}
            </Typography>

            {schema.groups.map((group) => renderGroup(group))}

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}