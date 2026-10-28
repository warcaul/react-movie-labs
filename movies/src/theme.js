import { createTheme } from "@mui/material/styles";

// One place to control the app's colours and fonts.
// Components use "primary" / "secondary" and pick these up automatically.
const theme = createTheme({
  palette: {
    primary: {
      main: "#c62828", // cinema red - icons, buttons, chips
    },
    secondary: {
      main: "#1f2933", // dark charcoal - header bar, filter card
    },
    background: {
      default: "#f4f5f7", // light grey page so white cards stand out
    },
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

export default theme;