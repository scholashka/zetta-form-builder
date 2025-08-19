import { useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import { FormRenderer } from "../../components/FormRenderer";
import { FormSchema } from "../../types/formTypes";

export default function FormBuilder() {
    const [jsonInput, setJsonInput] = useState<string>("");
    const [schema, setSchema] = useState<FormSchema | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleJsonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setJsonInput(value);

        try {
            const parsed = JSON.parse(value) as FormSchema;
            setSchema(parsed);
            setError(null);
        } catch {
            setError("Invalid JSON");
            setSchema(null);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h5" gutterBottom>
                Paste JSON Form Schema
            </Typography>

            <TextField
                value={jsonInput}
                onChange={handleJsonChange}
                placeholder="Paste JSON schema here"
                multiline
                minRows={8}
                fullWidth
                variant="outlined"
                sx={{ mb: 4 }}
            />

            {error && <Typography color="error">{error}</Typography>}

            {schema && <FormRenderer schema={schema} />}
        </Container>
    );
}