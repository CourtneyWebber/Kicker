import { createTheme } from '@mui/material/styles';

//Theme created to complement the logo colours. Shared with multiple components.
export const mdTheme = createTheme({
    palette: {
        primary: {
            light: "#fcd653",
            main: "#fccb00",
            dark: "#74ac44",
            contrastText: "#388e3c"
        },
        secondary: {
            light: "#fcd653",
            main: "#8bc34a",
            dark: "#74ac44",
            contrastText: "#000000"
        }
    }
});