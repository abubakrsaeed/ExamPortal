import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import logo from '../img/logo.png'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import {toast} from "react-toastify";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
    paperStyle: {
        padding: 30,
        height: '70vh',
        width: '35%',
        margin: "30px auto"


    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        maxWidth: '20%',
    },
    form: {
        maxWidth: '320px',
        align: 'center',
    },

    signin: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        fontSize: 17
    },
    title: {
        flexGrow: 1,
    },

    container: {
        display: "flex",
        alignItems: "center"
    },
    border: {
        borderBottom: "2px solid lightgray",
        width: "100%"
    },
}));

const theme2 = createTheme({
    typography: {
        h3: {
            fontSize: 32,
            marginTop: -40,
            color: '#161b22'
        },
    },
    palette: {
        primary: {
            main: 'rgb(0,0,0)',
        },
        secondary: {
            main: 'rgb(255,208,94)',
        }
    }
})


function Signup() {
    const classes = useStyles();
    const [type, setType] = React.useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const submit = (e) => {
        if (username != '' && password != '') {

            e.preventDefault()
            axios.post('http://localhost:8080/add', {
                username,
                password,
                emailId: email,
                roleId: type
            }).then((res) => {
                console.log(res.data)
            }).catch((error) => {
                if (error.response.status == 409)
                    toast.warn("username already taken")
                else
                    toast.error('error happened!')
            })
        }else{
            toast.warn('you cannot leave username or password field empty!')
        }

    }
    return (
        <div>

            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar style={{ marginLeft: '12%', marginRight: '12%', }}>

                    <img src={logo} className={classes.logo} alt="Exam Portal" />

                    <Typography variant="body2" className={classes.title} style={{ color: '#666666' }} align="right">
                        Already have an account? <Link href="/">Login</Link>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid item md={12} sm={12} style={{ backgroundColor: '#161b22', padding: '7%' }}>
                <Paper elevation={10} className={classes.paperStyle}>
                    <div className={classes.paper}>
                        <ThemeProvider theme={theme2}>
                            <Typography variant="h3">
                                <b>Sign up</b>
                            </Typography>
                        </ThemeProvider>
                    </div>
                    <Divider style={{ margin: '30px 0px 0px' }} />
                    <div className={classes.paper}>
                        <Grid item md={12} sm={12} xs={6}>
                            <ThemeProvider theme={theme2}>
                                <form className={classes.form} noValidate>
                                    <TextField
                                        onChange={e => (setUsername(e.target.value))}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Username"
                                        label="Username"
                                        name="Username"
                                        autoComplete="email"
                                        autoFocus
                                        align="center"
                                    />
                                    <TextField
                                        onChange={e => (setEmail(e.target.value))}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        align="center"
                                    />
                                    <TextField
                                        onChange={e => (setPassword(e.target.value))}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="User type"
                                            onChange={(e)=>(setType(e.target.value))}
                                        >
                                            <MenuItem value={1}>instructor</MenuItem>
                                            <MenuItem value={2}>undergraduate</MenuItem>
                                            <MenuItem value={3}>graduate</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </ThemeProvider>
                        </Grid>
                        <ThemeProvider theme={theme2}>
                            <Button onClick={submit} variant="contained" color="secondary" type="submit" fullWidth className={classes.signin} size="large"
                                    style={{ maxWidth: '40%', maxHeight: '50px', margin: '40px 0px 40px', padding: '16px' }}><b>sign up</b>
                            </Button>
                        </ThemeProvider>
                    </div>
                </Paper>
            </Grid>
        </div>
    );
}

export default Signup;