import React, { useState, useEffect, createContext } from 'react';
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
import { teacherListItems } from './listItems';
import logo from '../images/Kicker_logo.jpg'
import Moment from 'moment';
import { Copyright } from './copyright';
import { mdTheme } from './theme.js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Current from './Current';
import Previous from './Previous';
import Title from './Title';

const date = Moment().format("dddd, Do MMM, YYYY");

//Logout button clears current user and redirects to signin page
const logOut = () => {
    localStorage.clear();
};

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

export const IdContext = createContext();   //Creating a context to pass student_id and instrument_id to other components.

function DashboardContent() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => { setOpen(!open); };
    const [students, setStudents] = useState([]);
    const [anchorEl_student, setAnchorEl_student] = useState(null);
    const [studentIndex, setStudentIndex] = useState(0);
    const open_student = Boolean(anchorEl_student);
    const [anchorEl_instrument, setAnchorEl_instrument] = useState(null);
    const [instrumentIndex, setInstrumentIndex] = useState(0);
    const [instruments, setInstruments] = useState([]);
    const open_instrument = Boolean(anchorEl_instrument);
    const [goals, setGoals] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [studentIds, setStudentIds] = useState();

    const handleClick_instrument = (event) => {
        setAnchorEl_instrument(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl_student(null);
        setAnchorEl_instrument(null);
    }

    const handleClick_student = (event) => {
        setAnchorEl_student(event.currentTarget);
    };

    const handleClickInstrument = (event, index) => {
        setInstrumentIndex(index);
        setAnchorEl_instrument(null);
        setIsClicked(true);
        //Getting student_id and instrument_id for a specific teacher_id, student_name, instrument_name.
        axios.get('http://localhost:4000/api/users/studentids?student_name=' + nameArray[studentIndex] + '&teacher_id=' + localStorage.getItem("userId") + '&instrument_name=' + instruments[index].instrument_name)
            .then(response => {
                setStudentIds(response.data[0]);
            })
            .catch((e) => {
                console.log(e);
            });
        //Getting the current goals for a specific student/instrument/teacher combo.
        axios.get('http://localhost:4000/api/goals?student_name=' + nameArray[studentIndex] + '&teacher_id=' + localStorage.getItem("userId") + '&instrument_name=' + instruments[index].instrument_name)
            .then(response => {
                let goalList = response.data[0];
                setGoals(goalList);
            })
            .catch((e) => {
                console.log(e);
            });        
    };

    let names = [""];
    for (let i = 0; i < students.length; i++) {
        names.push(students[i].student_name);
    }
    let nameArray = [...new Set(names)];    //removing duplicates

    useEffect(() => {
        //Getting list of students for a specific teacher.
        axios.get('http://localhost:4000/api/users/studentlist?user_id=' + localStorage.getItem("userId"))
            .then(response => {
                let studentList = response.data;
                setStudents(studentList[0]);
            });
    }, []);

    const handleClickStudent = (event, index) => {
        setStudentIndex(index);
        setAnchorEl_student(null);
        //Getting the instrument(s) for a specific student/teacher combination.
        axios.get('http://localhost:4000/api/users/studentinst?student_name=' + nameArray[index] + '&teacher_id=' + localStorage.getItem("userId"))
            .then(response => {
                let instList = response.data;
                setInstruments(instList[0]);
            });
        setIsClicked(false);
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
                                Teacher
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                                ID: {localStorage.getItem("userId")}
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                                {localStorage.getItem("username")}
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                                <Link to="/" onClick={logOut} style={{ textDecoration: 'none' }}>Log Out</Link>
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
                            {teacherListItems}
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

                                        <Grid container spacing={2} align="center" alignItems="center">

                                            <Grid item xs={3}>
                                                <Button
                                                    id="student-button"
                                                    aria-controls={open_student ? 'student-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open_student ? 'true' : undefined}
                                                    onClick={handleClick_student}
                                                >
                                                    Select Student
                                                </Button>
                                                <Menu
                                                    id="student-menu"
                                                    aria-labelledby="student-button"
                                                    anchorEl={anchorEl_student}
                                                    open={open_student}
                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    {nameArray.map((name, index) => (
                                                        <MenuItem
                                                            key={name}
                                                            disabled={index === 0}
                                                            selected={index === studentIndex}
                                                            onClick={(event) => handleClickStudent(event, index)}>
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </Grid>
                                            <Grid item xs={3}>
                                                {nameArray[studentIndex]}
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    id="instrument-button"
                                                    aria-controls={open_instrument ? 'instrument-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open_instrument ? 'true' : undefined}
                                                    onClick={handleClick_instrument}
                                                >
                                                    Select Instrument
                                                </Button>
                                                <Menu
                                                    id="instrument-menu"
                                                    aria-labelledby="instrument-button"
                                                    anchorEl={anchorEl_instrument}
                                                    open={open_instrument}
                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    {instruments.map((instrument, index) => (
                                                        <MenuItem
                                                            key={instrument.instrument_name}
                                                            selected={index === instrumentIndex}
                                                            onClick={(event) => handleClickInstrument(event, index)}>
                                                            {instrument.instrument_name}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </Grid>
                                            <Grid item xs={3}>
                                                {isClicked ? instruments[instrumentIndex].instrument_name : null}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    ><IdContext.Provider value={studentIds}>
                                            <Title>Current Goals</Title>
                                            {isClicked ? <Current sendGoals={goals} /> : null}
                                        </IdContext.Provider>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <IdContext.Provider value={studentIds}>
                                            <Title>Completed Goals</Title>
                                            {isClicked ? <Previous /> : null}
                                        </IdContext.Provider>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default function TeacherGoals() { return <DashboardContent />; }