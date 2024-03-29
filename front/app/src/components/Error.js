import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { mdTheme } from './theme.js';
import { Copyright } from './copyright';
import logo from '../images/Kicker_logo.jpg'

//TODO: This is a work in progress and not linked yet

export default function Error() {
    return (
        <ThemeProvider theme={mdTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={logo} alt="logo" />
                    <Typography component="h1" variant="h5">
                        Uh oh
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography component="h1" variant="h5">
                                    404! No such page dude.
                                </Typography>
                            </Grid>                                                  
                        </Grid>                                         
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}