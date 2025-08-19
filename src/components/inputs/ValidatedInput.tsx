import { TextField } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";

export function ValidatedInput({ field, value, onChange }: FieldStringProps) {
    return (
        <TextField
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            helperText="To Do: Add validation logic"
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
        />
    );
}