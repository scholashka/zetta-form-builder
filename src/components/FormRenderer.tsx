import { Box, Button, Typography } from "@mui/material";
import { GroupWrapper } from "./GroupWrapper";
import { FormSchema, Field } from "../types/formTypes";
import { TextInput } from "./inputs/TextInput";
import { TextArea } from "./inputs/TextArea";
import { Dropdown } from "./inputs/Dropdown";
import { CheckboxInput } from "./inputs/CheckboxInput";
import { RadioGroupInput } from "./inputs/RadioGroupInput";
import { ValidatedInput } from "./inputs/ValidatedInput";

type Props = { schema: FormSchema };

export function FormRenderer({ schema }: Props) {
    const renderField = (field: Field) => {
        switch (field.type) {
            case "text":
                return <TextInput key={field.id} field={field} />;
            case "textarea":
                return <TextArea key={field.id} field={field} />;
            case "dropdown":
                return <Dropdown key={field.id} field={field} />;
            case "checkbox":
                return <CheckboxInput key={field.id} field={field} />;
            case "radio":
                return <RadioGroupInput key={field.id} field={field} />;
            case "validatedInput":
                return <ValidatedInput key={field.id} field={field} />;
            // Add more cases for other field types as needed
            default:
                return null;
        }
    };

    return (
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography variant="h5" gutterBottom>
                {schema.title}
            </Typography>
            {schema.groups.map((group) => (
                <GroupWrapper key={group.id} label={group.label}>
                    {group.fields.map(renderField)}
                </GroupWrapper>
            ))}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}