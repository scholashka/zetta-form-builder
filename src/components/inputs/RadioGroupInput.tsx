import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { FieldStringProps } from "../../types/formTypes";

export function RadioGroupInput({ field, value, onChange }: FieldStringProps) {
    return (
        <FormControl>
            <Typography variant="subtitle1">{field.label}</Typography>
            <RadioGroup name={field.id}>
                {field.options?.map((opt) => (
                    <FormControlLabel
                        key={opt}
                        value={opt}
                        control={<Radio value={value}
                            onChange={(e) => onChange(field.id, e.target.value)} />}
                        label={opt}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}