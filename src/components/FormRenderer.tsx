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

    return (
        <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
            <Typography variant="h5" gutterBottom>
                {schema.title}
            </Typography>

            {schema.groups.map(
                (group) =>
                    isVisible(group, values) && (
                        <GroupWrapper key={group.id} label={group.label}>
                            {group.fields.map(renderField)}
                        </GroupWrapper>
                    )
            )}

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}