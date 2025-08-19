import { useMemo, useState } from "react";
import { TextField } from "@mui/material";
import { Field, FieldStringProps } from "../../types/formTypes";
import { validateField } from "../../lib/validators";

type Props = FieldStringProps & {
    allValues: Record<string, any>;
};

export function ValidatedInput({ field, value, onChange, allValues }: Props) {
    const [touched, setTouched] = useState(false);

    const { error, valid } = useMemo(() => {
        const res = validateField(field as Field, value, allValues);
        return { error: res.error, valid: res.valid };
    }, [field, value, allValues]);

    return (
        <TextField
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            onBlur={() => setTouched(true)}
            error={touched && !valid}
            helperText={touched && !valid ? error : " "}
        />
    );
}