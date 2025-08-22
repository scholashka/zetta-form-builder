import { Paper, Typography, TextField, Box } from "@mui/material";

type Props = {
    value: string;
    onChange: (v: string) => void;
    error?: string | null;
};

export function SchemaEditor({ value, onChange, error }: Props) {
    return (
        <Paper elevation={2} sx={{ p: 2, position: "sticky", top: 16 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h6">Form Schema (JSON)</Typography>
            </Box>
            <TextField
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Paste JSON schema here…"
                multiline
                minRows={14}
                fullWidth
                variant="outlined"
            />
            {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
        </Paper>
    );
}