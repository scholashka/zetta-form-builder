import { Checkbox, FormControlLabel } from "@mui/material";
import { Field } from "../../types/formTypes";

type Props = { field: Field };

export function CheckboxInput({ field }: Props) {
    return (
        <FormControlLabel
            control={<Checkbox />}
            label={field.label}
        />
    );
}