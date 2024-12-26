import React, {useState, useEffect} from 'react';
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
import { signup } from '../../store/thunks/auth';
import { useNavigate } from 'react-router-dom';

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


const defaultTheme = createTheme();

export default function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, userDetails } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


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

    if (data.get('password') !== data.get('confirmPassword')) {
      newErrors.password = 'Passwords do not match';
    }
    const email = data.get('email');
    const name = data.get('name');
    const password = data.get('password');

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(signup({name, email, password}));
    
    }
  };

  const handleOnClickRouteSignIn = async() => {
    navigate("/signin")
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if(token){
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
            Sign Up
          </Typography>
          {authError && <p style={{color:"red"}}>This email already exists.</p>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              // value={formData.email}
              // onChange={handleChange}
              autoFocus
            />
            {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
             
                
                  <div onClick={handleOnClickRouteSignIn}>
                  <Link className="navLink" to="/signup" variant="body2">Already have an account? Sign In
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