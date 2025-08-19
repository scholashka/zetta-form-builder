import { Checkbox, FormControlLabel } from "@mui/material";
import { FieldBooleanProps } from "../../types/formTypes";

export function CheckboxInput({ field, value, onChange }: FieldBooleanProps) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={value}
                    onChange={(e) => onChange(field.id, e.target.checked)}
                />
            }
            label={field.label}
        />
    );
}