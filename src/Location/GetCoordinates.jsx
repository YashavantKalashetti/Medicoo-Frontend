import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const GetCoordinates = () => {
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(null);
  const [displayAddress, setDisplayAddress] = useState('');
  const [manualPosition, setManualPosition] = useState(null);
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
      } else {
        setLocationFound(false);
        alert('Address not found.');
      }
    } catch (error) {
      setLocationFound(false);
      console.error('Error fetching coordinates:', error);
      alert('Error fetching coordinates');  
    }finally{
      setLoading(false);
    }
  };

  const handleGeocode = () => {
    if (address) {
      fetchCoordinates(address);
    } else {
      alert('Please enter an address.');
    }
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

  return (
    <div>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>        
        <TextField
          style={{margin:"10px"}}
          id="filled-multiline-flexible"
          label="Address"
          multiline
          maxRows={4}
          value={address} onChange={(e) => setAddress(e.target.value)}
          variant="filled"
        />
        <Button variant="contained" onClick={handleGeocode} endIcon={<LocationOnIcon />} disabled={loading}>
          Locate
        </Button>
      </div>

      {
        locationFound && (
          <div style={{ height: '500px' }}>
            {displayAddress && <p>Address: {displayAddress}</p>}
            {position && <p>Coordinates: {position[0]}, {position[1]}</p>}
            <MapContainer center={[12.972229, 77.594029]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
        </div>
        )
      }
      
    </div>
  );
};

export default GetCoordinates;
