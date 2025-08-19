import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";

export function Dropdown({ field, value, onChange }: FieldStringProps) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
                labelId={`${field.id}-label`}
                id={field.id}
                defaultValue=""
                value={value}
                label={field.label}
                onChange={(e) => onChange(field.id, e.target.value)}
            >
                {field.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}