import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Background = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(0.7)',
  zIndex: -1,
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  borderRadius: '25px',
  boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)',
  },
}));

const PatientSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    aadharNumber: '',
    contactNumber: '',
    gender: '',
    email: '',
    dob: null,
    password: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:3030/api/v1/auth/patient/signup', formData);
      if (response.status === 200) {
        setSuccess('Registration successful!');
        setTimeout(() => {
          window.location.href = 'http://localhost:5173/';
        }, 2000);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Container maxWidth="md">
        <StyledPaper elevation={6}>
          <FormTitle variant="h3" align="center">
            Patient Registration
          </FormTitle>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Aadhar Number"
                  name="aadharNumber"
                  type="number"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth required variant="outlined" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={4}
                  value={formData.address}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  inputProps={{ minLength: 20 }}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
              {loading ? (
                <CircularProgress />
              ) : (
                <SubmitButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  Register
                </SubmitButton>
              )}
            </Box>
          </Box>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default PatientSignupForm;
