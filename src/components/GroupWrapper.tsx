import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { panelColors } from "../main";

type Props = {
    label: string;
    children: React.ReactNode;
    depth?: number;
};

export function GroupWrapper({ label, children, depth = 0 }: Props) {
    const theme = useTheme();
    const colors = panelColors(depth, theme);

    return (
        <Paper
            sx={{
                p: 2,
                pb: 2.5,
                mb: 2,
                ml: depth === 0 ? 0 : 2,
                borderLeft: `4px solid ${colors.border}`,
                bgcolor: colors.bg,
                transition: "background-color 120ms ease, box-shadow 120ms ease",
                "&:hover": {
                    bgcolor: colors.bgHover
                },
            }}
        >
            <Box
                sx={{
                    bgcolor: colors.headerBg,
                    px: 1.25,
                    py: 0.75,
                    borderRadius: 1,
                    mb: 1.5,
                }}
            >
                <Typography variant={depth === 0 ? "h6" : "subtitle1"} sx={{ fontWeight: 600 }}>
                    {label}
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
                {children}
            </Box>
        </Paper>
    );
}