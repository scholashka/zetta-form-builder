import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

const theme = createTheme({
  shape: { borderRadius: 12 },
  palette: {
    background: { default: "#fafafa" },
  },
});

export const panelColors = (level: number, t = theme) => {
  const bases = [
    t.palette.primary.main,
    t.palette.secondary.main,
    t.palette.info.main,
    t.palette.success.main,
    t.palette.warning.main,
  ];
  const base = bases[level % bases.length];
  return {
    border: base,
    bg: alpha(base, 0.045),
    bgHover: alpha(base, 0.065),
    headerBg: alpha(base, 0.09),
  };
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);