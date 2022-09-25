import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { studentListItems } from './listItems';
import Current from './Current';
import Previous from './Previous';
import Count from './Count';
import StudentSelect from './Select_Student';
import logo from '../images/Kicker_logo.jpg'
import Moment from 'moment';
import { mdTheme } from './theme.js';
import { Copyright } from './copyright';

const date = Moment().format("dddd, Do MMM, YYYY");
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function DashboardContent() {
    const [open, setOpen] = React.useState(false);
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");   
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px',
                                backgroundColor: mdTheme.palette.primary.main
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                {date}
                            </Typography>
                            <Typography sx={{ flexGrow: 1 }}>
                                Student
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                                ID:{userId}
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                                {username}
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                                <Link to="/">Log Out</Link>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <br />
                        <img src={logo} alt="logo" />
                        <br />
                        <Divider />
                        <List component="nav">
                            {studentListItems}
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <StudentSelect />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {/*<Current />*/}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Count />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Previous />
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}