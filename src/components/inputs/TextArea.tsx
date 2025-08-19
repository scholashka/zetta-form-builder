import { TextField } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";

export function TextArea({ field, value, onChange }: FieldStringProps) {
    return (
        <TextField
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
        />
    );
}