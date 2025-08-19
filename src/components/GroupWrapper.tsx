import { Box, Typography, Paper } from "@mui/material";

type Props = {
    label: string;
    children: React.ReactNode;
    depth?: number;
};

export function GroupWrapper({ label, children, depth = 0 }: Props) {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                mb: 3,
                ml: depth === 0 ? 0 : 2,
                borderLeft: depth ? 4 : 0,
                borderColor: "divider",
            }}
        >
            <Typography variant="h6" gutterBottom>
                {label}
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {children}
            </Box>
        </Paper>
    );
}