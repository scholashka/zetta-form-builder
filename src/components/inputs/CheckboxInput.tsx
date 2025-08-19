import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import { FieldBooleanProps } from "../../types/formTypes";

export function CheckboxInput({ field, value, onChange, error, helperText, onBlur }: FieldBooleanProps) {
    return (
        <FormControl error={Boolean(error)}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={(e) => onChange(field.id, e.target.checked)}
                        onBlur={() => onBlur?.(field.id)}
                    />
                }
                label={field.label}
            />
            <FormHelperText>{helperText ?? " "}</FormHelperText>
        </FormControl>
    );
}