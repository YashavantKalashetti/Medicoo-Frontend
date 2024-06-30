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
  Box,
  Avatar,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/system';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

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
  width: 180, // Adjusted size to be a bit bigger
  height: 180, // Adjusted size to be a bit bigger
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

const HospitalSpecialities = [
    { value: 'SUPER_SPECIALTY', label: 'Super Specialty' },
    { value: 'MULTI_SPECIALTY', label: 'Multi Specialty' },
    { value: 'FERTILITY', label: 'Fertility' },
    { value: 'EYE_CARE', label: 'Eye Care' },
    { value: 'CARDIAC', label: 'Cardiac' },
    { value: 'NEPHROLOGY', label: 'Nephrology' },
    { value: 'ONCOLOGY', label: 'Oncology' },
    { value: 'GENERAL', label: 'General' },
    { value: 'MATERNITY', label: 'Maternity' },
    { value: 'ORTHOPEDIC', label: 'Orthopedic' },
    { value: 'NEUROLOGY', label: 'Neurology' },
    { value: 'PSYCHIATRY', label: 'Psychiatry' },
    { value: 'PEDIATRIC', label: 'Pediatric' },
    { value: 'GERIATRIC', label: 'Geriatric' },
    { value: 'DERMATOLOGY', label: 'Dermatology' },
    { value: 'GASTROENTEROLOGY', label: 'Gastroenterology' },
    { value: 'PULMONOLOGY', label: 'Pulmonology' },
    { value: 'RHEUMATOLOGY', label: 'Rheumatology' },
    { value: 'UROLOGY', label: 'Urology' },
    { value: 'ENT', label: 'ENT' },
    { value: 'DENTAL', label: 'Dental' },
    { value: 'ALLERGY', label: 'Allergy' },
    { value: 'ENDOCRINOLOGY', label: 'Endocrinology' },
    { value: 'PLASTIC_SURGERY', label: 'Plastic Surgery' },
    { value: 'REHABILITATION_CENTER', label: 'Rehabilitation Center' },
];

const HospitalSignupForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    speciality: '',
    description: '', // Added description field
    avatar: null,
    lat: null,
    lon: null,
  });
  const [position, setPosition] = useState([12.972229, 77.594029]);
  const [displayAddress, setDisplayAddress] = useState('');
  const [locationFound, setLocationFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCoordinates = async (address) => {
    try {
      setLoading(true);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setDisplayAddress(display_name);
        setLocationFound(true);
        // Set lat and lon in formData
        setFormData((prevData) => ({
          ...prevData,
          lat: parseFloat(lat),
          lon: parseFloat(lon),
        }));
      } else {
        setLocationFound(false);
        alert('Address not found.');
      }
    } catch (error) {
      setLocationFound(false);
      console.error('Error fetching coordinates:', error);
      alert('Error fetching coordinates');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear lat and lon if address changes
    if (name === 'address') {
      setFormData((prevData) => ({
        ...prevData,
        lat: null,
        lon: null,
      }));
    }
    // Email validation
    if (name === 'email') {
      if (validateEmail(value)) {
        // Enable next button conditionally
        // Example: Assuming you have a state for form validity
        // setFormValid(true);
      } else {
        // setFormValid(false);
      }
    }
  };

  const validateEmail = (email) => {
    // Email validation regex
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
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
    if (isStepComplete(activeStep)) {
      console.log(formData);
    } else {
      alert('Please complete all required fields before proceeding.');
    }
  };

  const handleLocate = () => {
    const { address } = formData;
    if (address.trim() !== '') {
      fetchCoordinates(address);
    } else {
      alert('Please enter an address to locate.');
    }
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 0:
        return (
          formData.name &&
          formData.email &&
          formData.password &&
          formData.contactNumber
        );
      case 1:
        return (
          formData.address &&
          formData.speciality &&
          locationFound &&
          formData.lat !== null &&
          formData.lon !== null
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepComplete(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      alert('Please complete all required fields before proceeding.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const LocationMarker = () => {
    const map = useMapEvents({});
  
    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);
  
    return (
      <>
        {position && (
          <Marker position={position}>
            <Popup>{displayAddress}</Popup>
          </Marker>
        )}
      </>
    );
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid item xs={12}>
              <Box sx={{ position: 'relative', width: 'fit-content', margin: 'auto' }}>
                <StyledAvatar src={formData.avatar} alt="Hospital Avatar" />
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
                label="Hospital Name"
                name="name"
                type='text'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
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
                type='number'
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
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Speciality</InputLabel>
                <Select
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                >
                  {HospitalSpecialities.map((speciality) => (
                    <MenuItem key={speciality.value} value={speciality.value}>
                      {speciality.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder='Enter your address and locate on map'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleLocate}
                        aria-label="locate address"
                        color={locationFound ? 'primary' : 'default'}
                      >
                        <LocationOnIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {locationFound && (
              <>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Validated Address: {displayAddress}
                  </Typography> 
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Latitude: {formData.lat}, Longitude: {formData.lon}
                  </Typography>
                  <div style={{ height: '300px', width: '100%' }}>
                    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <LocationMarker />
                    </MapContainer>
                  </div>
                </Grid>
              </>
            )}

          </>
        );
      default:
        return null;
    }
  };

  const steps = ['Basic Information', 'Location and Details']; // Define steps
  const progress = Math.round(((activeStep + 1) / steps.length) * 100); // Calculate progress

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', marginBottom: 4 }}>
            Hospital Signup
          </Typography>
          
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
                marginBottom: 3,
                height: 10,
                borderRadius: 5,
                transition: 'width 0.3s ease-in-out', // Example transition effect
            }}
            />


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
                type="submit"
                variant="contained"
                color="primary"
                onClick={activeStep === 1 ? handleSubmit : handleNext}
                disabled={!isStepComplete(activeStep)}
              >
                {activeStep === 1 ? 'Submit' : 'Next'}
              </StyledButton>
            </Box>
          </form>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default HospitalSignupForm;