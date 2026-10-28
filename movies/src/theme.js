import { createTheme } from "@mui/material/styles";

// One place to control the app's colours and fonts.
// Components use "primary" / "secondary" and pick these up automatically.
// mode is "light" or "dark" - MUI switches text and paper colours for us.
export const getTheme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      // cinema red - a lighter red in dark mode so it stands out on black
      main: mode === "dark" ? "#ef5350" : "#c62828"
    },
    secondary: {
      main: "#1f2933", // dark charcoal - header bar, filter card
    },
    background:
      mode === "dark"
        ? { default: "#121212", paper: "#1e1e1e" }
        : { default: "#f4f5f7" }, // light grey page so white cards stand out
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
});

