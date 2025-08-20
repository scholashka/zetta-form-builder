import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";

export function Dropdown({ field, value, onChange, error, helperText, onBlur }: FieldStringProps) {
    return (
        <FormControl fullWidth error={Boolean(error)}>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
                labelId={`${field.id}-label`}
                id={field.id}
                value={value}
                label={field.label}
                onChange={(e) => onChange(field.id, e.target.value as string)}
                onBlur={() => onBlur?.(field.id)}
            >
                {(field.options ?? []).map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{helperText ?? " "}</FormHelperText>
        </FormControl>
    );
}