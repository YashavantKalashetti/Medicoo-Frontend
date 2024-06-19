import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';

const LocateOnMapUsingCoordinates = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      setAddress(data.display_name || 'Address not found');
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };

  const handleGeocode = () => {
    if (lat && lon) {
      const parsedLat = parseFloat(lat);
      const parsedLon = parseFloat(lon);

      if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
        setPosition([parsedLat, parsedLon]);
        fetchAddress(parsedLat, parsedLon);
      } else {
        alert('Please enter valid coordinates.');
      }
    } else {
      alert('Please enter both latitude and longitude.');
    }
  };

  const LocationMarker = () => {
    const map = useMap();

    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        fetchAddress(e.latlng.lat, e.latlng.lng);
        map.setView([e.latlng.lat, e.latlng.lng], map.getZoom());
      },
    });

    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />
        <button onClick={handleGeocode}>Get Address</button>
      </div>
      <div style={{ height: '500px' }}>
        <MapContainer center={[12.972229, 77.594029]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div>
        {address && <p>Address: {address}</p>}
      </div>
    </div>
  );
};

export default LocateOnMapUsingCoordinates;
