import { TextField } from "@mui/material";
import { Field } from "../../types/formTypes";

type Props = { field: Field };

export function TextArea({ field }: Props) {
    return (
        <TextField
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
        />
    );
}