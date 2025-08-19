import { TextField } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";


export function TextInput({ field, value, onChange }: FieldStringProps) {
    return (
        <TextField
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            value={value}
            onChange={(e) => onChange?.(field.id, e.target.value)}
        />
    );
}