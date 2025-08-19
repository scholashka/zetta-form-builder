import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Field } from "../../types/formTypes";

type Props = { field: Field };

export function Dropdown({ field }: Props) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select labelId={`${field.id}-label`} id={field.id} defaultValue="">
                {field.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}