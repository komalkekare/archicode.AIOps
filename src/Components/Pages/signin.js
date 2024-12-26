import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../store/thunks/auth';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, userDetails } = useSelector(state => state.auth);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newErrors = {};
  
    if (!data.get('email').includes('@')) {
      newErrors.email = 'Invalid email format';
    }

    if (data.get('password').length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

   
    const email = data.get('email');
    const password = data.get('password');

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(signin({email, password}));
    }
  };

  
  const handleOnClickRouteSignUp = async() => {
    navigate("/signup")
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if(userDetails){
      console.log("TOKEN PRESENT")
      navigate('/');
    }
  }, [userDetails])

  return (
    <ThemeProvider theme={defaultTheme}>
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
      
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {authError && <p style={{color:"red"}}>Wrong Credentials</p>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              <div onClick={handleOnClickRouteSignUp}>
                  <Link className="navLink" to="/signup" variant="body2"> Don't have an account? Sign Up
                  </Link></div>
   
          
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}