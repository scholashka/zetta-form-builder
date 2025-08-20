import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, FormHelperText } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";

export function RadioGroupInput({ field, value, onChange, error, helperText, onBlur }: FieldStringProps) {
    return (
        <FormControl error={Boolean(error)}>
            <FormLabel id={`${field.id}-label`}>{field.label}</FormLabel>
            <RadioGroup
                aria-labelledby={`${field.id}-label`}
                name={field.id}
                value={value}
                onChange={(e) => onChange(field.id, (e.target as HTMLInputElement).value)}
                onBlur={() => onBlur?.(field.id)}
            >
                {(field.options ?? []).map((opt) => (
                    <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                ))}
            </RadioGroup>
            <FormHelperText>{helperText ?? " "}</FormHelperText>
        </FormControl>
    );
}