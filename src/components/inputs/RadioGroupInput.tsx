import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Field } from "../../types/formTypes";

type Props = { field: Field };

export function RadioGroupInput({ field }: Props) {
    return (
        <FormControl>
            <Typography variant="subtitle1">{field.label}</Typography>
            <RadioGroup name={field.id}>
                {field.options?.map((opt) => (
                    <FormControlLabel
                        key={opt}
                        value={opt}
                        control={<Radio />}
                        label={opt}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}