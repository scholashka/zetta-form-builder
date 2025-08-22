import { alpha, Theme } from "@mui/material/styles";

export const panelColors = (level: number, theme: Theme) => {
    const bases = [
        theme.palette.primary.main,
        theme.palette.secondary?.main || theme.palette.primary.main,
        theme.palette.info?.main || theme.palette.primary.main,
        theme.palette.success?.main || theme.palette.primary.main,
        theme.palette.warning?.main || theme.palette.primary.main,
    ];
    const base = bases[level % bases.length];
    return {
        border: base,
        bg: alpha(base, 0.045),
        bgHover: alpha(base, 0.065),
        headerBg: alpha(base, 0.09),
    };
};
