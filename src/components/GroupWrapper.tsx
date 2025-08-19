import { Box, Typography, Paper } from "@mui/material";

type Props = {
    label: string;
    children: React.ReactNode;
};

export function GroupWrapper({ label, children }: Props) {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                {label}
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {children}
            </Box>
        </Paper>
    );
}