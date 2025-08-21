import { Paper, Typography, Box, Button } from "@mui/material";

type Props = {
    data: unknown;
    onClose?: () => void;
};

export function JsonPreview({ data, onClose }: Props) {
    const json = JSON.stringify(data, null, 2);

    return (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Submission JSON
            </Typography>
            <Box
                component="pre"
                sx={{
                    m: 0,
                    p: 2,
                    bgcolor: "grey.100",
                    borderRadius: 1,
                    overflowX: "auto",
                    whiteSpace: "pre",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 13,
                    maxHeight: 400,
                }}
            >
                {json}
            </Box>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                {onClose && (
                    <Button variant="text" onClick={onClose}>Close</Button>
                )}
            </Box>
        </Paper>
    );
}