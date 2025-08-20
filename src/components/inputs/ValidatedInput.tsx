import { TextField } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";

export function ValidatedInput({ field, value, onChange, error, helperText, onBlur }: FieldStringProps) {
    return (
        <TextField
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            onBlur={() => onBlur?.(field.id)}
            error={Boolean(error)}
            helperText={helperText ?? " "}
        />
    );
}