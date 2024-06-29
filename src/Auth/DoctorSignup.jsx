import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Avatar,
  IconButton,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/system';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(8, 0),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  margin: 'auto',
  marginBottom: theme.spacing(3),
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: '0 0 20px rgba(33, 150, 243, 0.3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: 600,
}));

const languagesOptions = [
  'Arabic', 'Chinese', 'English', 'French', 'German', 'Hindi', 'Italian',
  'Japanese', 'Kannada', 'Korean', 'Marathi', 'Portuguese', 'Spanish',
  // Add more languages as needed
];

const specializations = [
  { value: 'GENERAL_PRACTITIONER', label: 'General Practitioner' },
  { value: 'ANESTHESIOLOGIST', label: 'Anesthesiologist' },
  { value: 'CARDIOLOGIST', label: 'Cardiologist' },
  { value: 'DERMATOLOGIST', label: 'Dermatologist' },
  { value: 'EMERGENCY_MEDICINE_PHYSICIAN', label: 'Emergency Medicine Physician' },
  { value: 'ENDOCRINOLOGIST', label: 'Endocrinologist' },
  { value: 'FAMILY_MEDICINE_PHYSICIAN', label: 'Family Medicine Physician' },
  { value: 'GASTROENTEROLOGIST', label: 'Gastroenterologist' },
  { value: 'GERIATRICIAN', label: 'Geriatrician' },
  { value: 'GYNECOLOGIST', label: 'Gynecologist' },
  { value: 'HEMATOLOGIST', label: 'Hematologist' },
  { value: 'INFECTIOUS_DISEASE_SPECIALIST', label: 'Infectious Disease Specialist' },
  { value: 'INTERNIST', label: 'Internist' },
  { value: 'NEONATOLOGIST', label: 'Neonatologist' },
  { value: 'NEPHROLOGIST', label: 'Nephrologist' },
  { value: 'NEUROLOGIST', label: 'Neurologist' },
  { value: 'OBSTETRICIAN_GYNECOLOGIST', label: 'Obstetrician Gynecologist' },
  { value: 'ONCOLOGIST', label: 'Oncologist' },
  { value: 'OPHTHALMOLOGIST', label: 'Ophthalmologist' },
  { value: 'ORTHOPEDIC_SURGEON', label: 'Orthopedic Surgeon' },
  { value: 'OTOLARYNGOLOGIST', label: 'Otolaryngologist' },
  { value: 'PEDIATRICIAN', label: 'Pediatrician' },
  { value: 'PHYSICAL_MEDICINE_REHABILITATION_PHYSICIAN', label: 'Physical Medicine Rehabilitation Physician' },
  { value: 'PLASTIC_SURGEON', label: 'Plastic Surgeon' },
  { value: 'PSYCHIATRIST', label: 'Psychiatrist' },
  { value: 'PULMONOLOGIST', label: 'Pulmonologist' },
  { value: 'RADIOLOGIST', label: 'Radiologist' },
  { value: 'RHEUMATOLOGIST', label: 'Rheumatologist' },
  { value: 'SURGEON', label: 'Surgeon' },
  { value: 'UROLOGIST', label: 'Urologist' },
  { value: 'ALLERGIST_IMMUNOLOGIST', label: 'Allergist Immunologist' },
  { value: 'INFECTIOUS_DISEASE_PHYSICIAN', label: 'Infectious Disease Physician' }
];

const steps = ['Personal Info', 'Professional Details', 'Additional Info'];

const DoctorSignupForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    specialization: '',
    address: '',
    gender: '',
    dob: null,
    practicingSince: null,
    education: '',
    avatar: null,
    consultingFees: '',
    languages: [],
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({ ...prevData, [name]: date }));
  };

  const handleLanguageChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      languages: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      console.log(formData);
      // Add your form submission logic here
    } else {
      alert('Please complete all required fields before submitting.');
    }
  };

  const validateForm = () => {
    switch (activeStep) {
      case 0:
        return (
          formData.name &&
          formData.email &&
          formData.password &&
          formData.contactNumber
        );
      case 1:
        return (
          formData.specialization &&
          formData.education &&
          formData.practicingSince &&
          formData.languages.length > 0
        );
      case 2:
        return (
          formData.address &&
          formData.gender &&
          formData.dob &&
          formData.consultingFees
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      alert('Please complete all required fields before proceeding.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid item xs={12}>
              <Box sx={{ position: 'relative', width: 'fit-content', margin: 'auto' }}>
                <StyledAvatar src={formData.avatar} alt="Doctor Avatar" />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'background.paper' }}
                  >
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </label>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                type="number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Specialization</InputLabel>
                <Select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  {specializations.map((specialization) => (
                    <MenuItem key={specialization.value} value={specialization.value}>
                      {specialization.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Practicing Since"
                  value={formData.practicingSince}
                  onChange={(date) => handleDateChange('practicingSince', date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Languages</InputLabel>
                <Select
                  name="languages"
                  multiple
                  value={formData.languages}
                  onChange={handleLanguageChange}
                  input={<OutlinedInput label="Languages" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {languagesOptions.map((language) => (
                    <MenuItem key={language} value={language}>
                      <Checkbox checked={formData.languages.indexOf(language) > -1} />
                      <ListItemText primary={language} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(date) => handleDateChange('dob', date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Consulting Fees"
                name="consultingFees"
                type="number"
                value={formData.consultingFees}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', marginBottom: 4 }}>
            Doctor Signup
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
            <Card variant="outlined" sx={{ marginBottom: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  {renderStepContent(activeStep)}
                </Grid>
              </CardContent>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                disabled={!isFormValid}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </StyledButton>
            </Box>
          </form>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default DoctorSignupForm;