import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { mdTheme } from './theme.js';
import { Copyright } from './copyright';
import axios from 'axios';

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();    
    
    const navigate = useNavigate();
    const nav = () => {
        if (localStorage.getItem("userType") === "s" && localStorage.getItem("isLoggedIn") === "true") {
            console.log("Hey");
            navigate('/student'); //why won't this go unless refreshing the page? Something to do with the local storage?
        }
        else if (localStorage.getItem("userType") === "t" && localStorage.getItem("isLoggedIn") === "true") {
            console.log("Yo");
            navigate('/teacher'); //why won't this go unless refreshing the page? Something to do with the local storage?
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            user_username: username,
            user_password: password
        };
        console.log(userData);

        //validating username and password
        await axios.post(`http://localhost:4000/api/users/login`, userData)
            .then((response) => {
                let loggedInUser = response.data;
                localStorage.setItem("userId", loggedInUser.user_id);
                localStorage.setItem("username", loggedInUser.user_username);
                localStorage.setItem("userType", loggedInUser.user_type);
                localStorage.setItem("firstName", loggedInUser.user_firstname);
                localStorage.setItem("surname", loggedInUser.user_surname);
                localStorage.setItem("phone", loggedInUser.user_phone);
                localStorage.setItem("email", loggedInUser.user_email);
                localStorage.setItem("isLoggedIn", true);     
                nav();
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            });        
    };

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                               
                            </Grid>
                            <Grid item>
                                {/*<Link href="#" variant="body2">*/}
                                {/*    {"Don't have an account? Sign Up"}*/}
                                {/*</Link>*/}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}